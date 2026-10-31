<script lang="ts">
	import { onMount } from 'svelte';
	import { getData, type Project as ProjectType } from '$lib';
	let projects: ProjectType[] = [];
	onMount(async () => {
		projects = (await getData()).projectsPage?.programmingProjects ?? [];
		projects = projects.sort((a, b) => Number(b.date ?? 0) - Number(a.date ?? 0));
	});
</script>

<main class="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
	<div class="grid gap-5 md:grid-cols-2">
		{#each projects as project, i}
			<a
				href={`/projects/${project.name?.trim().replaceAll(' ', '-')}`}
				class="project-card group"
			>
				<span class="font-mono text-sm text-cyan-300"
					>S / {String(i + 1).padStart(2, '0')}</span
				>
				<p class="mt-12 text-sm text-violet-300">{project.category}</p>
				<h2 class="mt-2 text-2xl font-bold text-white group-hover:text-cyan-300">
					{project.name}
				</h2>
				<p class="mt-3 text-sm leading-6 text-slate-400">{project.description?.overview}</p>
				<div class="mt-7 flex flex-wrap gap-2">
					{#each project.technologies ?? [] as technology}<span
							class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
							>{technology.name}</span
						>{/each}
				</div>
			</a>
		{/each}
	</div>
</main>

<style>
	:global(.project-card) {
		@apply relative min-h-72 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06];
	}
</style>
