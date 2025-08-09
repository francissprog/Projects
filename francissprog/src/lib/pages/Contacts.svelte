<script lang="ts">
	import { page } from '$app/state';
	import { loop } from 'svelte-typewriter';
	console.log(page.data.contacts);
</script>

<section class="flex h-full flex-col gap-10 text-2xl">
	<div class="flex items-center gap-2">
		<span> [francissprog@contacts ~]$ </span>
		<span use:loop={{ interval: 130 }}> cat contacts.txtt</span>
	</div>
	<div class="flex flex-col items-start gap-3">
		{#each page.data.contacts as { name, link } (name)}
			<a href={link}>{name}</a>
		{/each}
	</div>
</section>
