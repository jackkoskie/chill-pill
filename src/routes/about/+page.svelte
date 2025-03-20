<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: PageData } = $props();

	import Icon from '@iconify/svelte';
</script>

<section class="py-12">
	<div class="mx-auto max-w-6xl px-6 text-center">
		<div class="my-6 flex items-center">
			<hr class="flex-grow border-gray-300" />
			<span class="mx-6 text-4xl font-bold">{m.about_us()}</span>
			<hr class="flex-grow border-gray-300" />
		</div>
		<p class="mt-4">{m.about_us_1()}</p>

		<div class="my-6 flex items-center">
			<hr class="flex-grow border-gray-300" />
			<span class="mx-6 text-4xl font-bold">{m.our_mission()}</span>
			<hr class="flex-grow border-gray-300" />
		</div>
		<p class="mt-4">
			{m.about_us_2()}
		</p>

		<div class="my-6 flex items-center">
			<hr class="flex-grow border-gray-300" />
			<span class="mx-6 text-4xl font-bold">{m.who_we_are()}</span>
			<hr class="flex-grow border-gray-300" />
		</div>
		<p class="mt-4">
			{m.about_us_3()}
		</p>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 text-center shadow-lg">
				<h3 class="mt-4 text-xl font-semibold text-blue-600">Jack Koskie</h3>
				<p class="text-gray-500">Roles</p>
			</div>
			<div class="rounded-lg bg-white p-6 text-center shadow-lg">
				<h3 class="mt-4 text-xl font-semibold text-blue-600">Dushyant Saini</h3>
				<p class="text-gray-500">Roles</p>
			</div>
			<div class="rounded-lg bg-white p-6 text-center shadow-lg">
				<h3 class="mt-4 text-xl font-semibold text-blue-600">Eric Du</h3>
				<p class="text-gray-500">Roles</p>
			</div>
		</div>
	</div>
</section>
