<script lang="ts">
	import '../app.css';
	import { darkMode, Navbar } from '$lib';

	$: isDarkMode = $darkMode;
</script>

<main
	class="{isDarkMode
		? 'bg-dark text-light'
		: 'bg-light text-dark'} flex h-screen flex-col px-6 py-4 transition-colors duration-500"
>
	<Navbar />

	<slot />
</main>
