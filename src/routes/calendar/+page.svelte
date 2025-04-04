<script>
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	export let medications = [];
	let daysInMonth = 31;
	let calendar = Array.from({ length: daysInMonth }, () => []);

	onMount(() => {
		medications.forEach((med) => {
			let day = parseInt(med.date.split('-')[2], 10) - 1;
			if (day >= 0 && day < daysInMonth) {
				calendar[day].push(med);
			}
		});
	});
</script>

<div class="calendar-container">
<div class="calendar-container">
	<div class="grid grid-cols-7 gap-2 text-center font-semibold">
		{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
			<div class="p-2 bg-gray-200 rounded">{day}</div>
		{/each}
	</div>

	<div class="grid grid-cols-7 gap-2 mt-2">
		{#each calendar as meds, i}
			<div class="h-[100px] rounded border p-2 bg-gray-100">
				<div class="text-sm font-semibold">{i + 1}</div>
				{#each meds as med}
					<div class="mt-1 p-1 rounded text-xs"
						class:bg-green-500={med.taken}
						class:bg-pink-500={!med.taken}>
						{med.name} @ {intToTime(med.time).join(", ")}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.calendar-container {
		max-width: 700px;
		margin: auto;
	}

	.grid-cols-7 {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
</style>






<!-- <div class="flex flex-col gap-4 p-4 lg:flex-row">
	<div class="flex-1">
		<h2 class="mb-4 text-xl font-bold">Medication Schedule</h2>

		<div class="grid grid-cols-7 gap-2">
			{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
				<div class="text-center font-semibold">{day}</div>
			{/each}

			{#each Array.from({ length: 31 }, (_, i) => i + 1) as day}
				<div class="min-h-[100px] rounded border bg-gray-100 p-2">
					<div class="text-sm font-semibold">{day}</div>
					{#each medications.filter((med) => med.date === `2025-03-${String(day).padStart(2, '0')}`) as med}
						<div
							class="mt-1 rounded p-1 text-xs {med.taken
								? 'bg-green-500'
								: 'bg-pink-500'} text-white"
						>
							{med.name} ({med.time})
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="w-full rounded border bg-white p-4 shadow-md lg:w-1/3">
		<h3 class="text-lg font-bold">Today's Medications</h3>

		{#each medications.filter((med) => med.date === today) as med}
			<div class="mt-2 flex items-center justify-between rounded bg-gray-100 p-2">
				<div>
					<p class="text-sm font-semibold">{med.name}</p>
					<p class="text-xs text-gray-600">{med.time} | {med.dosage}</p>
				</div>
				<span class={med.taken ? 'font-bold text-green-600' : 'font-bold text-pink-600'}>
					{med.taken ? '✔ Taken' : 'Pending'}
				</span>
			</div>
		{/each}
	</div>
</div> -->
