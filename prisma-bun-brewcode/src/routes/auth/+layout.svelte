<script lang="ts">
	let { children } = $props();
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main class=" text-white">
	<Navbar />
	{@render children()}
	<Footer />
</main>
