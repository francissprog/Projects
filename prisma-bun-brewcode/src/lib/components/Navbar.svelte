<script>
    import AlignLeft from 'lucide-svelte/icons/align-left';
    import Coffee from 'lucide-svelte/icons/coffee';
	let toggleNav = false;
</script>

<nav class="bg-coffee flex max-w-full items-center justify-between px-20 py-10">
	<a href="/" class="text-6xl font-bold"><Coffee /></a>
	<div class="relative flex flex-col items-end gap-3">
		<button
			class=" w-fit rounded-md border border-white p-1 outline-none transition-all hover:bg-white hover:text-[#6F4E37]"
			on:click={() => (toggleNav = !toggleNav)}><AlignLeft /></button
		>
		<div
			class={`${toggleNav ? 'block' : 'hidden'} absolute top-12 flex flex-col gap-4 border border-white px-4 py-2`}
		>
			<a href="/auth">Login</a>
			<a href="/auth/register">Register</a>
		</div>
	</div>
</nav>
