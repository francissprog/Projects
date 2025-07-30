import { writable } from 'svelte/store';
import axios from 'axios';
import Swal from 'sweetalert2';
import message from '$lib/utils/message';
import errorMessage from '$lib/utils/errorMessage';

export interface Coffee {
	id: number;
	name: string;
	description: string;
	price: number;
	sizes: string[];
	image: string;
	quantity: number;
}
// Cart item type
export interface CartItem {
	_id?: string;
	name?: string;
	price: number;
	quantity: number;
	image: string;
	originalQuantity?: number;
}
export const cart = writable<CartItem[]>([]);

// Fetch and update the cart store
export const fetchCart = async () => {
	try {
		const response = await axios.get('/api/dashboard/cart/get');
		if (response.status === 200 && Array.isArray(response.data.message)) {
			cart.set(response.data.message || []);
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching cart:', error);
		}
	}
};

// Function to remove cart item
export const removeCart = async (
	cartSelected: CartItem,
	modifiedStates: Map<string, boolean>,
	originalQuantities: Map<string, number>
) => {
	const { name, quantity, price, _id, image } = cartSelected;
	const originalQuantity = originalQuantities.get(_id!) || quantity; // Get original quantity or fallback to current

	// Check if the quantity was modified
	const quantityDifference = quantity - originalQuantity;
	const quantityDisplay =
		quantityDifference !== 0
			? `<span>Quantity: <b>${originalQuantity}</b></span><br/>`
			: `<span>Quantity: <b>${quantity} ${quantity === 1 ? 'pc' : 'pcs'}</b></span>`;

	// SweetAlert popup
	const userConfirmation = Swal.fire({
		title: `Are you sure you want to delete ${name}?`,
		html: `<div class="flex flex-col text-lg">
				<span>Coffee: <b>${name}</b></span>
				${quantityDisplay}
				<span>Total: <b>₱${price}</b></span>
			</div>`,
		imageUrl: image,
		imageWidth: 200,
		imageHeight: 200,
		imageAlt: name,
		showCancelButton: true,
		confirmButtonText: 'Yes',
		customClass: {
			popup: 'bg-white text-coffee rounded-lg',
			confirmButton: 'bg-coffee text-white',
			cancelButton: 'text-white'
		}
	});

	// Handle deletion
	if ((await userConfirmation).isConfirmed) {
		try {
			const response = await axios.delete('/api/dashboard/cart/delete', {
				data: { item_id: _id },
				withCredentials: true
			});
			if (response.status === 200) {
				message(`Successfully Deleted ${name}`, 'success');
				await fetchCart();
				originalQuantities.delete(_id!); // Clean up tracking maps
				modifiedStates.delete(_id!);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				errorMessage({ message: error.response?.data.message, icon: 'error' });
			}
		}
	}
};

export const handleAddCart = async (coffee: Coffee, resetQuantityCallback: () => void) => {
	// Destructure the coffee object
	const { name, price, quantity, image } = coffee;

	// Validate quantity before making the request
	if (quantity === 0) {
		return errorMessage({
			message: 'Please select a quantity greater than zero.',
			icon: 'warning'
		});
	}

	// Prepare FormData for multipart/form-data request
	const formData = new FormData();
	formData.append('coffeeName', name);
	formData.append('coffeePrice', price.toString());
	formData.append('coffeeQuantity', quantity.toString());
	formData.append('coffeeImage', image); // Assuming `image` is a valid path or file.

	// Show confirmation dialog with SweetAlert
	const result = await Swal.fire({
		title: 'Add to Cart?',
		html: `<div class="flex flex-col text-lg">
				<span>Coffee: <b>${name}</b></span>
				<span>Quantity: <b>${quantity} ${quantity <= 1 ? 'pc' : 'pcs'}</b></span>
				<span>Total: <b>₱${price * quantity}</b></span>
			</div>`,
		imageUrl: image,
		imageWidth: 200,
		imageHeight: 200,
		imageAlt: name,
		showCancelButton: true,
		customClass: {
			popup: 'bg-white text-coffee rounded-lg',
			confirmButton: 'bg-coffee text-white',
			cancelButton: 'text-white'
		}
	});

	// If confirmed, send the request
	if (result.isConfirmed) {
		try {
			// Send FormData using Axios
			const response = await axios.post('/api/dashboard/cart/add', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});

			// Handle success
			if (response?.status === 200) {
				message(`${name} has been added to your cart!`, 'success');
				await fetchCart();
				resetQuantityCallback();
			}
		} catch (error) {
			// Handle errors
			if (axios.isAxiosError(error)) {
				errorMessage({ message: error.response?.data?.message || 'Failed to add to cart' });
			} else {
				console.error('Unexpected error:', error);
				errorMessage({ message: 'An unexpected error occurred' });
			}
		}
	}
};

// function to update cart
export const updateCart = async (cartSelected: CartItem) => {
	// call the fetchCart FUnction
	await fetchCart();
	// common sense that were going to update only quantity and price and _id
	const { price, quantity, _id, name, image } = cartSelected;

	// validation
	if (!price || !quantity) {
		return errorMessage({ message: "price and quantity didn't get", icon: 'error' });
	}
	// Show confirmation dialog with SweetAlert
	const result = await Swal.fire({
		title: 'Save to Cart?',
		html: `<div class="flex flex-col text-lg">
				<span>Coffee: <b>${name}</b></span>
				<span>Quantity: <b>${quantity} ${quantity <= 1 ? 'pc' : 'pcs'}</b></span>
				<span>Total: <b>₱${price * quantity}</b></span>
			</div>`,
		imageUrl: image,
		imageAlt: name,
		imageHeight: 200,
		imageWidth: 200,
		showCancelButton: true,
		customClass: {
			popup: 'bg-white text-coffee rounded-lg',
			confirmButton: 'bg-coffee text-white',
			cancelButton: 'text-white'
		}
	});

	if (result.isConfirmed) {
		try {
			const response = await axios.put(
				'/api/dashboard/cart/update',
				{
					price: price,
					updatedQuantity: quantity,
					item_id: _id
				},
				{ withCredentials: true }
			);

			if (response.status === 200) {
				message(response.data.message, 'success');
				setTimeout(async () => {
					await fetchCart();
					// reload the site
					window.location.reload();
				}, 1200);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error);
				errorMessage({
					message: error.response?.data?.message || 'An error occurred',
					icon: 'error'
				});
			}
		}
	}
};
