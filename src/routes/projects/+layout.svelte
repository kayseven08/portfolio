<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.url.pathname.split('/')[2] || 'all';
</script>

<div class="min-h-[calc(100vh-73px)] bg-[#0b1020]">
	<div
		class="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-5 px-5 pb-8 pt-10 sm:px-8"
	>
		<div>
			<p class="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">The archive</p>
			<h1 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Projects</h1>
			<p class="mt-3 max-w-xl text-slate-400">
				A selection of software, research, and robotics systems I’ve built or contributed
				to.
			</p>
		</div>
		<div class="flex rounded-full border border-white/10 bg-white/[0.03] p-1">
			<a class:active={current === 'all'} class="tab" href="/projects">All work</a>
			<a class:active={current === 'programming'} class="tab" href="/projects/programming"
				>Software</a
			>
			<a class:active={current === 'engineering'} class="tab" href="/projects/engineering"
				>Robotics</a
			>
		</div>
	</div>
	<slot />
</div>

<style>
	:global(.tab) {
		@apply rounded-full px-4 py-2 text-sm text-slate-400 transition hover:text-white;
	}
	:global(.tab.active) {
		@apply bg-cyan-300 text-slate-950;
	}
</style>
