import Swal from 'sweetalert2';

const message = (message: string, style: 'success') => {
	Swal.fire({
		title: message,
		timer: 1200,
		icon: style,
		customClass: {
			popup: 'bg-white text-coffee rounded-2xl',
		},
		allowOutsideClick: false,
		showConfirmButton: false,
		showCancelButton: false
	});
};

export default message;
