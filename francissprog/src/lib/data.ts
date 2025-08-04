import { Home, About, Contacts, Portfolio } from '$lib';
import type { Component } from 'svelte';

interface Slide {
	content: Component;
	title: string;
	id: number;
}

// component array
export const slides: Slide[] = [
	{ content: Home, title: 'Home', id: 0 },
	{ content: About, title: 'About', id: 1 },
	{ content: Portfolio, title: 'Portfolio', id: 2 },
	{ content: Contacts, title: 'Contacts', id: 3 }
];
