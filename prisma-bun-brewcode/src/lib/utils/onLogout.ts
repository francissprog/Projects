import Swal from 'sweetalert2';
import { goto } from '$app/navigation';
import axios from 'axios';


export const onLogout = async (): Promise<void> => {
	Swal.fire({
		title: 'Are you sure you want to Logout?',
		icon: 'question',
		showCancelButton: true,
		customClass: {
			popup: 'bg-white text-coffee rounded-2xl',
			icon: 'text-coffee',
			confirmButton: 'bg-coffee text-white'
		}
	}).then(async (result) => {
		if (result.isConfirmed) {
			const response = await axios.post('/api/logout');
			if (response.status === 200) {
				goto('/auth');
			}
		}
	});
};
