import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import User from '$lib/database/userSchema';
import { compare } from 'bcrypt-ts';
import { JWT_SECRET } from '$env/static/private';
import { connectDB } from '$lib/database/connectDB';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request, cookies }) => {
	// Get the data from the form submission
	const userData = await request.formData();

	// Connect to the database
	await connectDB();

	// Extracting email or username and password
	const id = userData.get('email') || (userData.get('username') as string | null);
	const password = userData.get('password') as string | null;

	// Form validation
	if (!id || !password) {
		return json({ success: false, message: 'Please input all fields' }, { status: 400 });
	}

	try {
		let user;
		// valdiate
		id === userData.get('email')
			? (user = await User.findOne({ email: id }))
			: (user = await User.findOne({ username: id }));

		// Check if user exists and validate password here (if applicable)
		if (!user) {
			return json({ success: false, message: 'User not found' }, { status: 404 });
		}

		if (!(await compare(password, user.password))) {
			return json({ message: 'Invalid Email and  password' }, { status: 406 });
		}
		// Generate JWT
		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

		// set the cookies
		cookies.set('token', token, {
			httpOnly: true,
			secure: false, // make this true in production
			maxAge: 60 * 60,
			path: '/',
			sameSite: 'strict'
		});
		cookies.set('username', user.username, {
			httpOnly: true,
			secure: false,
			maxAge: 60 * 60,
			path: '/'
		});
		// Return a successful response if everything is correct
		return json({ success: true, message: `Welcome Back ${user.username}` }, { status: 200 });
	} catch (error) {
		console.error('Database error: ', error);
		return json(
			{ success: false, message: 'Database error, please try again later' },
			{ status: 500 }
		);
	}
};
