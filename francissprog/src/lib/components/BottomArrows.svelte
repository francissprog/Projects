<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { iconSize } from '$lib';
	import { MoveLeft, MoveRight } from 'lucide-svelte';

	export let isDarkMode: boolean; // Explicitly declare props with export
	const dispatch = createEventDispatcher<{
		prev: void;
		next: void;
	}>();
</script>

<div class="mt-7 flex items-center justify-end gap-4">
	<div class="flex items-center gap-5">
		<button class="h-10 w-10" on:click={() => dispatch('prev')}>
			<MoveLeft class={iconSize(isDarkMode)} />
		</button>
		<button class="h-10 w-10" on:click={() => dispatch('next')}>
			<MoveRight class={iconSize(isDarkMode)} />
		</button>
	</div>
</div>
