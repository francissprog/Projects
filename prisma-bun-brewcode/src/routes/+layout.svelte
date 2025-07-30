<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="h-auto text-white">
	{@render children()}
</main>

