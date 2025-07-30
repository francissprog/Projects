import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({ cookies }) => {
	const authToken = cookies.get('token');
	const username = cookies.get('username');
    // cookie validation
	if (authToken && username) {
		throw redirect(303, '/dashboard');
	}
};
