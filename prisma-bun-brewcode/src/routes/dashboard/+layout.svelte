<script>
	import { page } from '$app/stores';
	import SettingsDashboard from '$lib/components/dashboard/SettingsDashboard.svelte';
	import DashboardNavbar from '$lib/components/dashboard/DashboardNavbar.svelte';
	import HorizontalNavbar from '$lib/components/dashboard/HorizontalNavbar.svelte';
	
	let { children } = $props();
</script>

<main class="bg-coffee flex h-auto text-white">
	<DashboardNavbar />
	<div class="w-full px-5 py-11">
		{#if $page.url.pathname === '/dashboard/settings'}
			<SettingsDashboard />
		{:else}
			<HorizontalNavbar />
		{/if}

		{@render children()}
	</div>
</main>
