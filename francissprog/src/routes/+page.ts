import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		about: [
			' build clean, scalable web apps with Svelte.',
			' focus on performance, simplicity, and reliability.',
			' learn by doing — especially with Linux and DevOps.',
			' enjoy building systems that are meant to last.'
		]
	};
};
