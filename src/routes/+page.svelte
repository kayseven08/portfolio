<script lang="ts">
	import { onMount } from 'svelte';
	import { getData, type Data, type ProjectPreview } from '$lib';

	let data: Data | undefined;
	let loading = true;

	onMount(async () => {
		try {
			data = await getData();
		} finally {
			loading = false;
		}
	});

	$: projects = [...(data?.homePage?.projects ?? [])]
		.sort((a, b) => Number(b.date ?? 0) - Number(a.date ?? 0))
		.slice(0, 4);

	const projectUrl = (project: ProjectPreview) =>
		`/projects/${project.name?.trim().replaceAll(' ', '-')}`;
</script>

<svelte:head>
	<title>Kesavan Rangarajan — Engineer & builder</title>
	<meta
		name="description"
		content="The portfolio of Kesavan Rangarajan: software, AI, research, and robotics."
	/>
</svelte:head>

<main class="h-[94vh] overflow-y-auto bg-[#0b1020] text-slate-200">
	{#if loading}
		<div class="grid h-full place-items-center text-slate-400">Loading portfolio...</div>
	{:else if data?.homePage?.headline}
		<section class="relative overflow-hidden px-6 pb-20 pt-16 sm:px-12 lg:px-24">
			<div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>
			<div class="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"></div>
			<div class="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.4fr_0.6fr]">
				<div>
					<p class="mb-5 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
						Portfolio / 2026
					</p>
					<h1 class="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
						{data.homePage.headline.content}
						<span class="text-cyan-300">{data.homePage.headline.name}</span>
					</h1>
					<p class="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
						I build useful systems across software, AI, environmental research, and competitive
						robotics.
					</p>
					<div class="mt-8 flex flex-wrap gap-3">
						<a class="rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200" href="/projects">
							Explore projects
						</a>
						<a class="rounded-full border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300" href="/about-me">
							About me
						</a>
					</div>
					<div class="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
						<span>⌖ {data.homePage.headline.location}</span>
						<span>Georgia Tech · Computer Engineering</span>
					</div>
				</div>
				<div class="relative mx-auto">
					<div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-300 to-violet-500 blur-2xl opacity-30"></div>
					<img
						src={data.homePage.headline.imgURL}
						alt="Kesavan Rangarajan"
						class="relative aspect-square w-64 rounded-[2rem] border border-white/20 object-cover shadow-2xl sm:w-80"
					/>
				</div>
			</div>
		</section>

		<section class="mx-auto max-w-6xl px-6 pb-20 sm:px-12 lg:px-24">
			<div class="mb-8 flex items-end justify-between border-b border-slate-800 pb-4">
				<div>
					<p class="font-mono text-sm text-cyan-300">Selected work</p>
					<h2 class="mt-2 text-3xl font-bold">Things I’m building</h2>
				</div>
				<a class="hidden text-sm text-slate-400 hover:text-cyan-300 sm:block" href="/projects">View all →</a>
			</div>
			<div class="grid gap-4 md:grid-cols-2">
				{#each projects as project, i}
					<a
						href={projectUrl(project)}
						class="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-900"
					>
						<div class="flex items-start justify-between gap-4">
							<span class="font-mono text-sm text-cyan-300">0{i + 1}</span>
							<span class="text-sm text-slate-500">{project.date}</span>
						</div>
						<h3 class="mt-8 text-2xl font-semibold group-hover:text-cyan-300">{project.name}</h3>
						<p class="mt-2 text-slate-400">{project.category}</p>
						<div class="mt-6 flex flex-wrap gap-2">
							{#each project.technologies ?? [] as technology}
								<span class="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{technology.name}</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</section>
	{:else}
		<div class="grid h-full place-items-center text-slate-400">Portfolio data unavailable.</div>
	{/if}
</main>
