import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import User from '$lib/database/userSchema';
import { connectDB } from '$lib/database/connectDB';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const cartData = await request.formData();

	await connectDB();
	// Get the formData values
	const coffeeName = cartData.get('coffeeName');
	const coffeePrice = parseInt(cartData.get('coffeePrice') as string);
	const coffeeQuantity = parseInt(cartData.get('coffeeQuantity') as string);
	const coffeeImage = cartData.get('coffeeImage') as string;


	console.log(coffeePrice);
	
	// validate the FormData
	if (!coffeeName || !coffeePrice || !coffeeQuantity || !coffeeImage) {
		return json({ message: "Data didn't get" }, { status: 400 });
	}
	// get the cookies
	const username = cookies.get('username');

	// find the user in database	
	const findUser = await User.findOne({ username });

	// if the user is find check the cart if its has a same data
	if (!findUser) {
		// error handling here
		return json({ message: 'User not Found' }, { status: 404 });
	}
	// find the value on the cart
	const findSameCart = findUser.cart.find((item: any) => item.name === coffeeName);

	if (findSameCart) {
		const { quantity, price } = findSameCart; // Destructure for clarityl object
		findSameCart.price =  coffeePrice 
		findSameCart.quantity = quantity + coffeeQuantity; // Directly modify the origina

		console.log(price);
		
	} else {
		findUser.cart.push({
			name: coffeeName,
			price: coffeePrice,
			quantity: coffeeQuantity,
			image: coffeeImage
		});
	}
	
	// save the user
	await findUser.save();
	return json({ message: 'Added To Cart SuccessFully' }, { status: 200 });
};
