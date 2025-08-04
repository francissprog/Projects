<script lang="ts">
	import logo from '$lib/assets/nav.gif';
	import { iconSize, darkMode } from '$lib';
	import { Sun, Moon } from 'lucide-svelte';
</script>

<!-- Top Bar -->
<nav class="mb-4 flex h-20 items-center justify-between transition-colors duration-300">
	<a href="/">
		<img src={logo} alt="logo" loading="lazy" class="h-12" />
	</a>
	<button
		class={iconSize($darkMode)}
		on:click={() => darkMode.update((value) => !value)}
		aria-label={$darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
	>
		{#if $darkMode}
			<Sun class="h-full w-full" />
		{:else}
			<Moon class="h-full w-full" />
		{/if}
	</button>
</nav>
