<script lang="ts">
	import { page } from '$app/stores';
	import { CircleMinus, CirclePlus } from 'lucide-svelte';
	import { handleAddCart } from '$lib/stores/cart';
	const coffeeData = $page.data.coffeeData;
</script>

<main class="grid grid-cols-2 gap-7 text-coffee">
	{#each coffeeData as coffee (coffee.id)}
		<div class="mb-4 flex flex-col items-start rounded-lg bg-white p-5 shadow-md">
			<img src={coffee.image} alt={coffee.name} class="aspect-square h-32" />

			<div class="text-xl font-semibold">{coffee.name}</div>
			<div class="text-lg">₱{coffee.price}</div>

			<div class="mt-2 flex items-center gap-3">
				<button
					type="button"
					on:click={() => (coffee.quantity = Math.max(0, coffee.quantity - 1))}
					class="rounded-full p-1 hover:bg-coffee hover:text-white transition-all"
				>
					<CircleMinus />
				</button>

				<span class="text-xl">{coffee.quantity}</span>

				<button
					type="button"
					on:click={() => (coffee.quantity = coffee.quantity + 1)}
					class="rounded-full p-1 hover:bg-coffee hover:text-white transition-all"
				>
					<CirclePlus />
				</button>
			</div>

			<button
				type="button"
				class="mt-4 rounded-md bg-coffee px-4 py-2 text-white"
				on:click={() =>
					handleAddCart(coffee, () => {
						coffee.quantity = 0; 
					})
				}
			>
				Add to Cart
			</button>
		</div>
	{/each}
</main>
