<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import { FakePrimitiveParam } from 'drizzle-orm';
	import { intToDay } from '$lib/utils/converter';
	import Icon from '@iconify/svelte';

	let { data }: { data: PageData } = $props();
	let date = new Date();
	const month = date.toLocaleString('default', { month: 'long' });
	const weekday = date.toLocaleString('default', { weekday: 'long' });
	const day = date.toLocaleString('defauly', { day: 'numeric' });
	function ordinal(date) {
		if (date > 20 || date < 10) {
			switch (date % 10) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
			}
		}
		return 'th';
	}
</script>

<div class="flex w-screen flex-row justify-between px-4 py-2">
	<div>
		<h1>Home</h1>
	</div>
	<label for="my-drawer" class="btn drawer-button text-2xl">
		<Icon icon="charm:menu-hamburger" />
	</label>
</div>
<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content"></div>
	<div class="drawer-side mb-16 mt-16">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu h-[calc(100vh-8rem)] w-80 bg-base-200 p-4 text-base-content">
			<div>
				<h1 class=" flex w-fit items-center rounded-xl bg-base-200 p-6">
					<p class="font-black">
						14:15:40
						<br />
						{weekday},
						<br />
						{month}
						{day}{ordinal(day)}
					</p>
				</h1>
				<li><a href="/dashboard">Home</a></li>
				<li><a>Sidebar Item 2</a></li>
			</div>
		</ul>
	</div>
</div>

<style>
	.box {
		font-size: 26px;
		border-radius: 10px;
	}
</style>
