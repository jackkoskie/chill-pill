<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Welcome to Jack's SvelteKit Template!</h1>
			<p class="py-6">
				This template is a starting point for building a SvelteKit app with Tailwind CSS, DaisyUI,
				Drizzle, Paraglide all intended to be deployed on Cloudflare Pages.
			</p>
			<a href="https://github.com/jackkoskie/sveltekit-template" class="btn btn-outline"
				>See on GitHub</a
			>
		</div>
	</div>
</div>
