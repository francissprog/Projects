<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="flex h-full flex-col gap-10 text-3xl">
	<span>[francissprog@about ~]$ whoami</span>
	<div class="flex items-center">
		<span class="h-full text-[300px] leading-[320px]">I</span>
		<div class="flex flex-col items-start justify-center gap-2">
			{#each page.data.about as about (about)}
				<span> -->{about}</span>
			{/each}
		</div>
	</div>
</section>
