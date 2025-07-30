import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	// delete the cookies
	cookies.delete('token', { path: '/' });
	cookies.delete('username', { path: '/dashboard' });

	// redirect the user to auth or

	// response a status
	return json({ success: true, message: 'Successfully Logout..' }, { status: 200 });
};
