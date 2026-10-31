<script lang="ts">
	import { onMount } from 'svelte';
	import { getData, type Project as ProjectType } from '$lib';

	let projects: ProjectType[] = [];
	let loading = true;

	onMount(async () => {
		try {
			const data = await getData();
			projects = [
				...(data.projectsPage?.engineeringProjects ?? []),
				...(data.projectsPage?.programmingProjects ?? [])
			].sort((a, b) => Number(b.date ?? 0) - Number(a.date ?? 0));
		} finally {
			loading = false;
		}
	});
</script>

<main class="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
	{#if loading}
		<div class="grid min-h-96 place-items-center text-slate-500">Loading projects...</div>
	{:else}
		<div class="grid gap-5 md:grid-cols-2">
			{#each projects as project, i}
				<a
					href={`/projects/${project.name?.trim().replaceAll(' ', '-')}`}
					class="project-card group"
				>
					<div class="flex items-start justify-between">
						<span class="font-mono text-sm text-cyan-300">0{i + 1}</span>
						<span
							class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500"
							>{project.date}</span
						>
					</div>
					<div class="mt-12">
						<p class="text-sm font-medium text-violet-300">{project.category}</p>
						<h2
							class="mt-2 text-2xl font-bold text-white transition group-hover:text-cyan-300"
						>
							{project.name}
						</h2>
						<p class="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-400">
							{project.description?.overview || 'Project details coming soon.'}
						</p>
					</div>
					<div class="mt-7 flex flex-wrap gap-2">
						{#each project.technologies ?? [] as technology}
							<span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
								>{technology.name}</span
							>
						{/each}
					</div>
					<span
						class="absolute bottom-6 right-6 text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300"
						>↗</span
					>
				</a>
			{/each}
		</div>
	{/if}
</main>

<style>
	:global(.project-card) {
		@apply relative min-h-72 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-cyan-950/30;
	}
</style>
