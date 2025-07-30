import type { LayoutServerLoad } from './$types';
import {  redirect } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({ cookies }) => {
	// cookies validation
	const token = cookies.get('token');
	const username = cookies.get('username');


	// cookie validation
	if (!token || !username) {
		redirect(302, '/auth')
	}	


    return {
        user: {
            username,
             token, 
        },
    }
};	
