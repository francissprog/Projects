// In your userSchema.ts (or wherever your User schema is defined)
import { Schema, model, Types } from 'mongoose';
import { CartItem } from '$lib/stores/cart';
// Define a schema for items in the cart
const cartItemSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	image: { type: String, required: true }
});

// Define the main user schema
const userSchema = new Schema({
	name: { type: String, required: false },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cart: {
		type: [cartItemSchema],
		default: [] as Types.DocumentArray<{ name: string; price: number; quantity: number }> // Explicit type
	}
});

const User = model('User', userSchema);

export default User;
