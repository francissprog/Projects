<script lang="ts">
	export let isDarkMode: boolean;
	import logo from '$lib/assets/nav.gif';
	import { iconSize } from '$lib/utils/utils';
	import { Sun, Moon } from 'lucide-svelte';
</script>

<!-- Top Bar -->
<nav class="mb-4 flex h-20 items-center justify-between transition-colors duration-300">
	<a href="/">
		<img src={logo} alt="logo" loading="lazy" class="h-12" />
	</a>
	<button
		class={iconSize(isDarkMode)}
		on:click={() => (isDarkMode = !isDarkMode)}
		aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
	>
		{#if isDarkMode}
			<Sun class="h-full w-full" />
		{:else}
			<Moon class="h-full w-full" />
		{/if}
	</button>
</nav>
