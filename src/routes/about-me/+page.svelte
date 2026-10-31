<script lang="ts">
	import portrait from '$lib/images/kesavan.jpeg';
	import { onMount } from 'svelte';
	import { getData, type Data } from '$lib';

	let data: Data | undefined;
	onMount(async () => {
		data = await getData();
	});

	$: about = data?.aboutPage;
</script>

<svelte:head>
	<title>About Kesavan — Portfolio</title>
</svelte:head>

<main class="min-h-[calc(100vh-73px)] bg-[#0b1020] px-5 py-12 sm:px-8 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
		<div class="lg:sticky lg:top-32">
			<p class="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
				{about?.eyebrow || 'A little context'}
			</p>
			<h1 class="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
				{about?.title || 'About me'}<span class="text-cyan-300">.</span>
			</h1>
			<div
				class="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2"
			>
				<img
					src={portrait}
					alt="Kesavan Rangarajan"
					class="aspect-square w-full rounded-2xl object-cover"
				/>
			</div>
		</div>
		<div class="space-y-10">
			<section class="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
				<p class="text-xl font-semibold leading-9 text-slate-200">{about?.intro}</p>
				<div class="mt-7 space-y-5 text-base leading-8 text-slate-400">
					{#each about?.paragraphs ?? [] as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</section>
			<section class="grid gap-4 sm:grid-cols-3">
				{#each about?.stats ?? [] as stat}
					<div class="stat"><strong>{stat.value}</strong><span>{stat.label}</span></div>
				{/each}
			</section>
			<section>
				<p class="font-mono text-xs uppercase tracking-[0.3em] text-violet-300">
					What I care about
				</p>
				<div class="mt-4 flex flex-wrap gap-3">
					{#each about?.focusAreas ?? [] as value}
						<span
							class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
							>{value}</span
						>
					{/each}
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	:global(.stat) {
		@apply flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5;
	}
	:global(.stat strong) {
		@apply text-3xl font-bold text-cyan-300;
	}
	:global(.stat span) {
		@apply mt-2 text-xs leading-5 text-slate-500;
	}
</style>
