<script lang="ts">
	import { page } from '$app/stores';
	import { getData, type Project, type SubHeading } from '$lib';
	import Image from '$lib/Image.svelte';
	import { onMount } from 'svelte';
	let project: Project | undefined;
	onMount(async () => {
		// Scrollbar.init(document.querySelector('#scrollable')!, {
		// 	damping: 0.1,
		// 	thumbMinSize: 0,
		// 	renderByPixels: true,
		// 	alwaysShowTracks: false
		// });
		let data = await getData();
		project = [
			...data.projectsPage?.engineeringProjects!,
			...data.projectsPage?.programmingProjects!
		].find(
			(p) =>
				p.name?.trim().replaceAll(' ', '-') ===
				$page.params.projectName.trim().replaceAll(' ', '-')
		);
		project?.description?.subheadings?.forEach((s) => {
			s.showSubHeadings = true;
		});
	});
</script>

<div
	class="min-h-[calc(100vh-73px)] overflow-auto bg-[#0b1020] px-5 py-10 text-slate-300 sm:px-8"
	id="scrollable"
>
	{#if project}
		<div class="mx-auto max-w-4xl">
			<p class="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
				{project.category} · {project.date}
			</p>
			<h1 class="mt-4 text-5xl font-bold tracking-tight text-white">{project.name}</h1>
			<div class="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
				<h1 class="mb-3 text-2xl font-semibold text-cyan-300">Overview</h1>
				<p class="text-lg leading-8 text-slate-400">{project.description?.overview}</p>
			</div>
			{#each project.description?.subheadings || [] as subHeading}
				<div
					class="relative mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10 {subHeading.border
						? 'border-b'
						: ''} pb-[2%] border-slate-500"
				>
					{#if subHeading.title}
						<h1
							class="relative mb-2 mt-[2%] text-left text-2xl font-semibold text-cyan-300"
						>
							{subHeading.title || ''}
						</h1>
					{/if}
					{#if subHeading.html}
						{@html subHeading.content}
					{:else}
						<p class="relative text-left text-lg leading-8 text-slate-400">
							{subHeading.content}
						</p>
					{/if}
					{#if subHeading.images}
						{#each subHeading.images || [] as image}
							<Image {image}></Image>
						{/each}
					{/if}
					<button
						on:click={() => {
							subHeading.showSubHeadings = !subHeading.showSubHeadings;
						}}
						class="w-fit absolute right-[12.5%] top-[2%] text-slate-400 hover:text-sky-500 transition-all duration-200 {subHeading.subheadings
							? ''
							: 'hidden'}"
					>
						{#if subHeading.showSubHeadings}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m4.5 15.75 7.5-7.5 7.5 7.5"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						{/if}
					</button>
					{#each subHeading.subheadings || [] as subsubHeading}
						<div
							class="relative left-[12.5%] w-[75%] mt-[2%] mb-[2%] border-slate-500 pb-[2%] {subsubHeading.border
								? 'border-b'
								: ''} {subHeading.showSubHeadings ? '' : 'hidden'}"
						>
							{#if subsubHeading.title}
								<h1
									class="relative mb-2 mt-[2%] text-left text-xl font-semibold text-violet-300"
								>
									{subsubHeading.title || ''}
								</h1>
							{/if}
							{#if subsubHeading.html}
								{@html subsubHeading.content}
							{:else}
								<p class="relative text-left text-lg leading-8 text-slate-400">
									{subsubHeading.content}
								</p>
							{/if}
						</div>
						{#if subHeading.showSubHeadings}
							{#each subsubHeading.images || [] as image}
								<Image {image}></Image>
							{/each}
						{/if}
					{/each}
				</div>
				<div class="absolute right-0"></div>
			{/each}
		</div>
	{/if}
</div>
