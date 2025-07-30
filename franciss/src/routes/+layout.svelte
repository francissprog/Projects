<script lang="ts">
	import { Navbar, BottomArrows, Home, About, Contacts, Portfolio } from '$lib';
	import '../app.css';
	import { getUserTheme } from '$lib/utils/utils';
	import { Component } from 'lucide-svelte';

	let isDarkMode = $state(getUserTheme());

	// Slide data
	let slides = $state([
		{ content: Home, title: 'Home', id: 0 },
		{ content: About, title: 'About', id: 1 },
		{ content: Portfolio, title: 'Portfolio', id: 2 },
		{ content: Contacts, title: 'Contacts', id: 3 }
	]);

	// State for current slide
	let currentSlide = $state(0);

	// Derived state for total slides
	let totalSlides = $derived(slides.length);

	// Navigation handlers
	function goToPrevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
	}

	function goToNextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
	}
	const derivedComponent = $derived(slides[currentSlide].content);
</script>

<main
	class="{isDarkMode
		? 'bg-dark text-light'
		: 'bg-light text-dark'} flex h-screen flex-col px-6 py-4 transition-colors duration-500"
>
	<Navbar bind:isDarkMode />
	<!-- Render the current slide directly in layout -->
	<section class="h-screen {isDarkMode ? 'bg-subDark' : 'bg-subLight'}">
		{@const Component = derivedComponent}
		<Component />
	</section>
	<BottomArrows bind:isDarkMode on:prev={goToPrevSlide} on:next={goToNextSlide} />
</main>
