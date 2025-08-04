// imports
import { writable } from 'svelte/store';
// components
export { default as Navbar } from './components/Navbar.svelte';
export { default as BottomArrows } from './components/BottomArrows.svelte';
export { default as Home } from './pages/Home.svelte';
export { default as About } from './pages/About.svelte';
export { default as Portfolio } from './pages/Portfolio.svelte';
export { default as Contacts } from './pages/Contacts.svelte';

// interactive utils
export const getUserTheme = (): boolean =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const goToPrevSlide = (currentSlide: number, totalSlides: number) =>
	(currentSlide - 1 + totalSlides) % totalSlides;

export const goToNextSlide = (currentSlide: number, totalSlides: number) =>
	(currentSlide + 1) % totalSlides;

// style utils
export const iconSize = (isDarkMode: boolean): string => {
	return `h-10 w-10 ${
		isDarkMode
			? 'bg-subDark hover:bg-light hover:text-dark'
			: 'bg-subLight hover:bg-dark hover:text-light'
	} rounded-full p-3 transition-colors`;
};
export const containerStyle = (isDarkMode: boolean): string => {
	return `${isDarkMode ? 'bg-subDark' : 'bg-subLight'}`;
};

//stores
export const darkMode = writable(getUserTheme());
