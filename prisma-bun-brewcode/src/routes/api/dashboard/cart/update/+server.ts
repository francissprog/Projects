import { Types } from 'mongoose';
import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/database/connectDB.js';
import User from '$lib/database/userSchema.js';

export const PUT = async ({ request, cookies }) => {
	try {
		const { price, updatedQuantity, item_id } = await request.json();
		const username = cookies.get('username') as string;

		// Validate input fields
		if (price === undefined || updatedQuantity === undefined || !item_id) {
			return json({ message: 'Missing or invalid data fields' }, { status: 400 });
		}

		// Validate item_id format
		if (!Types.ObjectId.isValid(item_id)) {
			return json({ message: 'Invalid item_id format' }, { status: 400 });
		}
		
		// Connect to the database
		await connectDB();

		// Find the user by username
		const user = await User.findOne({ username });
		if (!user) {
			return json({ message: 'User not found' }, { status: 404 });
		}	

		// Find the specific cart item
		const cartItem = user.cart.find((item) => item._id.equals(item_id));
		if (!cartItem) {
			return json({ message: 'Cart item not found' }, { status: 404 });
		}

		// Update the cart item's fields
		cartItem.price = price;
		cartItem.quantity = updatedQuantity;

		// Save the user document
		await user.save();

		// Return success response
		return json(
			{
				data: { price, updatedQuantity, item_id, cart: user.cart },
				message: 'Cart item updated successfully',
			},
			{ status: 200 }
		);
	} catch (err) {
		console.error('Error processing request:', err);
		return json({ message: 'Server error' }, { status: 500 });
	}
};
