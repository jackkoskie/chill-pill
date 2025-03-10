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

<!-- Top section -->
<div class="flex w-full flex-row justify-between px-4 py-2" id="home">
	<div>
		<h1>Home</h1>
	</div>
</div>

<div class="fixed right-4 top-20 z-[50]">
	<label for="my-drawer" class="btn drawer-button text-2xl">
		<Icon icon="charm:menu-hamburger" style="font-size: 30px" />
	</label>
</div>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content"></div>
	<div class="drawer-side z-[40]">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu min-h-screen w-80 bg-base-200 p-4 pb-20 pt-24 text-base-content">
			<div class="text-2xl">
				<li>
					<h1 class="pointer-events-none bg-base-300">
						<p>
							{weekday},
							{month}
							{day}{ordinal(day)}
						</p>
					</h1>
				</li>
				<li><a href="#home">Home</a></li>
				<li><a href="#dashboard">Dashboard</a></li>
			</div>
		</ul>
	</div>
</div>
<div>
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Shoes!</h2>
			<p>If a dog chews shoes whose shoes does he choose?</p>
		</div>
		<figure>
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Shoes"
			/>
		</figure>
	</div>
</div>
<div class="flex flex-row px-4" id="dashboard">
	<h1>Dashboard</h1>
</div>
