import { connectDB } from '$lib/database/connectDB';
import User from '$lib/database/userSchema'; // Import the schema
import { json } from '@sveltejs/kit';

export const DELETE = async ({ cookies, request }) => {
    // Connect to the database
    await connectDB();

    // Retrieve username from cookies
    const username = cookies.get('username');
    if (!username) {
        return json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Extract itemId from request body
    const { item_id } = await request.json();
	
    if (!item_id) {
        return json({ message: 'Item ID is required' }, { status: 400 });
    }

    // Find the user by username
    const findUser = await User.findOne({ username });
    if (!findUser) {
        return json({ message: 'User not found' }, { status: 404 });
    }

    // Validate that the cart is an array
    if (!Array.isArray(findUser.cart)) {
        return json({ message: 'Cart is not properly initialized' }, { status: 500 });
    }

    // Remove the item from the cart
    const initialCartLength = findUser.cart.length;
	
    findUser.cart = findUser.cart.filter((item) => item._id.toString() !== item_id);

    // Check if the cart was updated
    if (findUser.cart.length === initialCartLength) {
        return json({ message: 'Item not found in cart' }, { status: 404 });
    }

    // Save the updated user document
    await findUser.save();

    return json({ message: 'Cart item removed successfully' }, { status: 200 });
};
