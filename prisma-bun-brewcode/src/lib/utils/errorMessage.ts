import Swal from 'sweetalert2';

interface errrorParams {
	message: string;
	icon?: 'warning' | 'error' | 'question' | 'warning';
}
const errorMessage = ({ message, icon = 'warning' }: errrorParams): void => {
	Swal.fire({
		title: message,

		timer: 1200,
		allowOutsideClick: false,
		customClass: {
			popup: 'bg-white text-coffee rounded-2xl',
			icon: 'text-coffee'
		},
		icon,
		showConfirmButton: false
	});
};

export default errorMessage;
