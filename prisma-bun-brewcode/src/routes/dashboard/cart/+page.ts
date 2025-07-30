import axios from 'axios';
import { cart } from '$lib/stores/cart';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    let error = null
	try {
		const response = await axios.get('/api/dashboard/cart/get');
		if (response.status === 200 && Array.isArray(response.data.message)) {
			cart.set(response.data.message || []);
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching cart:', error);
		}
        error = 'an error occured'
	}
    return {
        cart,
        error
    }
};
