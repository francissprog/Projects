<script lang="ts">
	import Dot from 'lucide-svelte/icons/dot';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<!-- root entry -->
<section class="h-[100vh] overflow-hidden bg-[#6F4E37] text-white">
	<!-- Enforce 100vh and prevent scrolling -->
	<Navbar />
	<div class="flex h-[85vh] items-center justify-center gap-20 px-32">
		<!-- Exact 92vh for content -->
		<div class="flex flex-col gap-5">
			<div class="flex cursor-default flex-col gap-0">
				<span class="text-[120px] font-bold">Brewcode</span>
				<span class="text-4xl font-bold">Code Better, Brew Stronger.</span>
	 		</div>
			<a
				href="/auth"
 				class="flex w-fit items-center rounded-3xl border border-white px-3 py-2 tracking-widest"
			>
				Let's Buy Some Coffee!
				<Dot />
			</a>
 
		<img
			src="https://static.vecteezy.com/system/resources/previews/029/283/233/non_2x/coffee-coffee-coffee-clipart-transparent-background-ai-generative-free-png.png"
			alt="coffee"
			class="h-[520px]"
		/>
	</div>  
</section>
