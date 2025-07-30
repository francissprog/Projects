import { json, type RequestHandler } from '@sveltejs/kit';
import { genSalt, hash } from 'bcrypt-ts';
import User from '$lib/database/userSchema';
import { connectDB } from '$lib/database/connectDB';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
export const POST: RequestHandler = async ({ request, cookies }) => {
	// get the data
	const userData = await request.formData();

	// initialize the data
	const username = userData.get('username') as string | null;
	const email = userData.get('email') as string | null;
	const password = userData.get('password') as string | null;
	// connect to database
	await connectDB();

	// validate the data
	if (!username || !email || !password) {
		return json({ message: 'Please Input all fields' }, { status: 400 });
	}
	// find the user
	const user = (await User.findOne({ email })) && (await User.findOne({ username }));

	// validate if the user exist
	if (user) {
		return json({ message: 'User already Exists..' }, { status: 406 });
	}
	// salt and hash the password of user
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	// if doesnt exist to database then create a new user

	const newUser = new User({
		username,
		email,
		password: hashedPassword
	});
	// save the user
	await newUser.save();
	// Generate JWT

	const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
		expiresIn: '1h'
	});
	// set the cookies
	cookies.set('token', token, {
		httpOnly: true,
		secure: false, // make this true in production
		maxAge: 60 * 60,
		path: '/',
		sameSite: 'strict'
	});

	// set the cookies
	cookies.set('username', newUser.username, {
		httpOnly: true,
		secure: false, // make this true in production
		maxAge: 60 * 60,
		path: '/',
		sameSite: 'strict'
	});
	// return a success response
	return json({ message: `Welcome to Brewcode! ${username}` }, { status: 200 });
};
