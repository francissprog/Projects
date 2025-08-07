import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		about: [
			' build clean, scalable web apps with Svelte.',
			' focus on performance, simplicity, and reliability.',
			' learn by doing — especially with Linux and DevOps.',
			' enjoy building systems that are meant to last.'
		],
		projects: [
			{
				name: 'Listify',
				description:
					'Listify is a secure web app to keep you organized. It uses login and registration to protect your tasks and saves them in a reliable database, so nothing is lost. Manage your to-do lists anytime, anywhere with ease!',
				sourceCode: 'https://github.com/Franciss-prog/web-app-projects/tree/main/Listify',
				livePreview: 'https://production-omega-rust.vercel.app/',
				image:
					'https://images.unsplash.com/photo-1644329843283-640d00509d43?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG8lMjBkbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D'
			},
			{
				name: 'Brewcode',
				description:
					'BrewCode is a coffee shop web app that offers various types of coffee. It’s designed to be user-friendly and ensures secure, private orders for a smooth experience.',
				sourceCode:
					'https://github.com/Franciss-prog/web-app-projects/tree/main/prisma-bun-brewcode',

				image: 'https://i.pinimg.com/736x/d9/ec/e7/d9ece738e31bf788ae82db250b2316bc.jpg'
			},
			{
				name: 'Portolio',
				description:
					'This is my portfolio website where I showcase my work as a frontend developer. It includes sections about me, my skills, my projects, and a contact form to reach out.',
				sourceCode: 'https://github.com/Franciss-prog/web-app-projects/tree/main/portfolio',
				livePreview: 'https://franciss-prog.vercel.app/',
				image:
					'https://imgs.search.brave.com/XZOHArSHhHMhOKE95mfQ-mBVu0c2BCa9YA9jEvMCV8s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/MDA5ZWM4Y2RhN2Yz/MDU2NDVjOWQ5MWIv/NjAxMDdmMWViNGJh/NDUxODk5ODQzMDQy/XzYwMDIwODZmNzJi/NzI3NjQ1ODAxZTQ2/MV9waG90b2dyYXBo/b3MuanBlZw'
			}
		]
	};
};
