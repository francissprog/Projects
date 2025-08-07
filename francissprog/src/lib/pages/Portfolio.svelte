<script lang="ts">
	import { Folder, FolderOpen } from 'lucide-svelte';
	import { page } from '$app/state';
	import { darkMode } from '$lib';
	let showProject = false;

	interface Project {
		name: string;
		description: string;
		sourceCode: string;
		livePreview?: string;
		image: string;
	}
	let selectedProject: Project | null = null;

	const openModal = (projects: Project) => {
		selectedProject = projects;
		showProject = true;
	};

	const closeModal = () => {
		showProject = false;
		selectedProject = null;
	};
	$: isDarkMode = $darkMode;
</script>

<section class="flex h-full flex-col gap-10 text-2xl">
	<span>[francissprog@portfolio ~]$ ls Projects/</span>
	<div class="grid grid-cols-3 gap-4">
		{#each page.data.projects as project (project.name)}
			<button
				class="flex w-fit items-center gap-2 hover:text-orange-500"
				on:click={() => openModal(project)}
			>
				{#if showProject && selectedProject === project.name}
					<FolderOpen />
				{:else}
					<Folder />
				{/if}

				{project.name}
			</button>
		{/each}
	</div>
</section>

{#if showProject && selectedProject}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-dark/50"
		on:click|self={closeModal}
	>
		<div
			class="flex w-full max-w-md flex-col gap-4 rounded p-5 max-md:max-w-[90%] {isDarkMode
				? 'bg-subDark text-light'
				: 'bg-subLight text-dark'}"
		>
			<img
				src={selectedProject.image}
				alt={selectedProject.name}
				class="h-[180px] w-full rounded object-cover max-md:h-[150px]"
			/>
			<span class="font-bold">{selectedProject.name}</span>
			<span>{selectedProject.description}</span>
			<div class="flex gap-6">
				<a href={selectedProject.sourceCode} target="_blank" class="hover:text-orange-500">
					[Source Code]
				</a>
				{#if selectedProject.livePreview}
					<a href={selectedProject.livePreview} target="_blank" class="hover:text-orange-500">
						[Live Preview]
					</a>
				{:else}
					<span class="text-red-600 underline">Under Construction</span>
				{/if}
			</div>
		</div>
	</div>
{/if}
