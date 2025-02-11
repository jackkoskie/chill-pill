<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';

	let { data }: { data: PageData } = $props();
</script>

<div class="relative -z-10 flex min-h-[80vh] items-center justify-center">
	<div class="rounded-xl bg-base-200 p-10">
		<ul class="text-pretty text-left text-5xl font-bold">
			<li>{m.home_page_1()}</li>
			<li>{m.home_page_2()}</li>
			<li>{m.home_page_3()}</li>
			<li>{m.home_page_4()}</li>
			<li>{m.brand_name()}</li>
		</ul>
	</div>
</div>

<style>
	ul {
		list-style-type: none;
		margin: 0px;
		padding: 20px;
	}
</style>
