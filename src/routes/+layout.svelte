<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';

	$: path = $page.url.pathname;
	$: isProjects = path.startsWith('/projects');
	$: isEdit = path.startsWith('/edit');
</script>

<div class="min-h-screen bg-[#0b1020] text-slate-200">
	<header class="sticky top-0 z-30 border-b border-white/10 bg-[#0b1020]/85 backdrop-blur-xl">
		<nav
			class="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
		>
			<a href="/" class="group flex items-center gap-3 text-left">
				<span
					class="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 font-black text-slate-950 shadow-lg shadow-cyan-300/10"
					>K</span
				>
				<span class="hidden sm:block">
					<span class="block text-sm font-bold tracking-wide text-white"
						>Kesavan Rangarajan</span
					>
					<span class="block text-xs text-slate-500">software · research · robotics</span>
				</span>
			</a>

			<div
				class="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
			>
				<a class:active={path === '/'} class="nav-link" href="/">Home</a>
				<a class:active={isProjects} class="nav-link" href="/projects">Projects</a>
				<a class:active={path === '/about-me'} class="nav-link" href="/about-me">About</a>
			</div>

			<div class="flex items-center gap-2">
				<a
					class="icon-link"
					href="https://github.com/kayseven08"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"
						><path
							d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.26c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
						/></svg
					>
				</a>
				{#if $page.data.loggedIn}
					<a class:active={isEdit} class="edit-link" href="/edit">Edit site</a>
				{/if}
			</div>
		</nav>
	</header>
	<slot />
</div>

<style>
	:global(.nav-link) {
		@apply rounded-full px-4 py-2 text-sm text-slate-400 transition hover:text-white;
	}
	:global(.nav-link.active) {
		@apply bg-white/10 text-cyan-300;
	}
	:global(.icon-link) {
		@apply rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-300;
	}
	:global(.edit-link) {
		@apply rounded-full border border-cyan-300/30 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-300 hover:text-slate-950;
	}
</style>
