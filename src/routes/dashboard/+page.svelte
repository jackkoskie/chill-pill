<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import Icon from '@iconify/svelte';

	let { data }: { data: PageData } = $props();
	let date = new Date();
	const month = date.toLocaleString('default', { month: 'long' });
	const weekday = date.toLocaleString('default', { weekday: 'long' });
	const day = date.toLocaleString('defauly', { day: 'numeric' });
	function ordinal(date: number) {
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
<div>
	<div class="flex w-full flex-row justify-between px-12 py-6" id="dashboard">
		<div>
			<h1 class="left-4 top-20 text-4xl font-bold">Dashboard</h1>
		</div>
	</div>

	<div class="fixed right-4 top-20 z-[50] flex flex-col items-end gap-1">
		<label for="my-drawer" class="btn drawer-button text-2xl">
			<Icon icon="charm:menu-hamburger" style="font-size: 30px" />
		</label>
		<a href="/settings" class="text-m btn w-fit">+ Add Medication</a>
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
					<li><a href="#dashboard">Dashboard</a></li>
					<li><a href="#today">Today's Medication</a></li>
				</div>
			</ul>
		</div>
	</div>
	<div class="flex flex-col items-center gap-4 px-4">
		<div class="grid w-full max-w-4xl grid-cols-2 gap-4">
			<!-- Added grid container -->
			<div class="stats h-32 w-full bg-neutral text-neutral-content">
				<!-- Added h-32 -->
				<div class="stat flex flex-col justify-center">
					<!-- Added flex and centering -->
					<div class="stat-title text-neutral-content">Active Medications</div>
					<div class="stat-value">100</div>
				</div>
			</div>
			<div class="stats h-32 w-full bg-neutral text-neutral-content">
				<!-- Added h-32 -->
				<div class="stat flex flex-col justify-center">
					<!-- Added flex and centering -->
					<div class="stat-title text-neutral-content">Doses Today</div>
					<div class="stat-value">10</div>
				</div>
			</div>
			<div class="stats h-32 w-full bg-neutral text-neutral-content">
				<!-- Added h-32 -->
				<div class="stat flex flex-col justify-center">
					<!-- Added flex and centering -->
					<div class="stat-title text-neutral-content">Upcoming Refills</div>
					<div class="stat-value">2</div>
				</div>
			</div>
			<div class="stats h-32 w-full bg-neutral text-neutral-content">
				<!-- Added h-32 -->
				<div class="stat flex flex-col justify-center">
					<!-- Added flex and centering -->
					<div class="stat-title text-neutral-content">Prescription Renewals</div>
					<div class="stat-value">1</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-row px-12 py-4" id="today">
		<h1 class="text-4xl font-bold">Today's Medication</h1>
	</div>

	<div
		class="mx-auto max-w-4xl justify-center overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
	>
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Medication</th>
					<th>Quantity</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				<tr class="h-28 hover:bg-base-300">
					<th>1</th>
					<td>Advil</td>
					<td>2 tablets</td>
					<td>Taken</td>
				</tr>
				<!-- row 2 -->
				<tr class="h-28 hover:bg-base-300">
					<th>2</th>
					<td>Tylenol</td>
					<td>1 pill</td>
					<td>Not Taken</td>
				</tr>
				<!-- row 3 -->
				<tr class=" h-28 hover:bg-base-300">
					<th>3</th>
					<td>Dushyant</td>
					<td>180 lbs</td>
					<td>Yummy</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
