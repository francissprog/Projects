<!-- src/lib/components/DashboardNavbar.svelte -->
<script lang="ts">
	import { flexColumn } from '$lib/utils/flexColumn';
	import { LogOut } from 'lucide-svelte';
	import { onLogout } from '$lib/utils/onLogout';
	import { page } from '$app/stores';
	import { dashboardHoverUtils, positionAndShape, styledActiveRoute } from '$lib/utils/hoverUtils';
	import navItems from './navItems';
</script>

<nav
	class={` flex h-auto w-[120px] flex-col justify-between rounded-r-2xl bg-white px-2 py-10 text-coffee`}
>
	<section class={`${flexColumn} gap-10`}>
		<a href="/dashboard" class="text-3xl" aria-label="Dashboard">B</a>

		{#each navItems as { href, label, Icon }}
			<a
				{href}
				class={`${flexColumn} ${$page.url.pathname === href ? styledActiveRoute : ''} ${dashboardHoverUtils} ${positionAndShape} rounded-xl p-2`}
			>
				<Icon />
				{label}
			</a>
		{/each}
	</section>

	<section>
		<button
			on:click={onLogout}
			class={`${flexColumn} ${styledActiveRoute} ${positionAndShape} w-full p-2`}
		>
			<LogOut />
			Logout
		</button>
	</section>
</nav>
