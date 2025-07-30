<script>
	import { page } from '$app/stores';
	import { Search, ShoppingBag } from 'lucide-svelte';
	import { cart, fetchCart } from '$lib/stores/cart';
	import { onMount } from 'svelte';

	$: cartData = $cart.length;

	onMount(async () => {
		await fetchCart();
	});
</script>

<nav class="flex items-center justify-between pb-5 text-coffee">
	<!-- Welcome Typography -->
	<span class="text-2xl text-white">Welcome to Brewcode, {$page.data.user.username}</span>

	<div class=" flex w-[60%] items-center">
		<input
			type="text"
			class="relative w-[70%] rounded-3xl border border-coffee bg-white p-3 outline-none"
			placeholder="Search"
		/>
		<button class="absolute right-[430px] text-coffee"><Search /></button>
	</div>

	<!-- and cart with count badge -->
	<div class="flex flex-row gap-4">
		<a href="/dashboard/cart" class="relative rounded-full bg-slate-50 p-2">
			<ShoppingBag />

			<!-- Cart count badge -->
			{#if cartData > 0}
				<span
					class="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-xs text-white"
				>
					{cartData}
				</span>
			{/if}
		</a>
	</div>
</nav>
