<script lang="ts">
	import { goToNextSlide, goToPrevSlide, BottomArrows, darkMode } from '$lib';
	import { slides } from '$lib/data';

	let currentSlide = 0;

	// Reactive state for total slides
	let totalSlides = slides.length;

	// Reactive state for dark mode
	$: isDarkMode = $darkMode;
	const greetings = () => {};
</script>

<section class="{isDarkMode ? 'bg-subDark' : 'bg-subLight'} h-full rounded-3xl p-6 transition-all">
	<svelte:component this={slides[currentSlide].content} />
</section>
<BottomArrows
	on:prev={() => {
		currentSlide = goToPrevSlide(currentSlide, totalSlides);
	}}
	on:next={() => {
		currentSlide = goToNextSlide(currentSlide, totalSlides);
	}}
	{isDarkMode}
/>
