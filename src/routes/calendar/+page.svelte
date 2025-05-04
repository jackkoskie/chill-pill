<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { intToDay, intToTime } from '$lib/utils/converter';

	let { data }: { data: PageData } = $props();

	let selectedDate: Writable<number | null> = writable(null); // Store for selectedDate

	const today = new Date();
	let year = today.getFullYear()
	const month = today.getMonth(); // 0-indexed

	const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

	const getFirstDayOffset = (year: number, month: number) => {
		const jsDay = new Date(year, month, 1).getDay();
		return (jsDay + 6) % 7;
	};

	const getDayOfWeek = (day: number) => {
		const jsDay = new Date(year, month, day).getDay();
		return (jsDay + 6) % 7;
	};

	// Derived store to get medications for the selected date
	const medicationsForSelectedDate = derived(selectedDate, ($selectedDate) => {
		if ($selectedDate === null) {
			return [];
		}
		const weekday = getDayOfWeek($selectedDate);
		return data.user.medications.filter((med) => {
			const daysArray = intToDay(med.days);
			return daysArray[weekday]; // Check if medication is scheduled for the selected day
		});
	});

	// Handle date selection and update the selectedDate store
	const selectDate = (day: number) => {
		selectedDate.set(day);
	};

	onMount(() => {
		// Select today's date if it's within the current month
		const today = new Date();
		if (today.getMonth() === month && today.getFullYear() === year) {
			selectDate(today.getDate());
		}
	});

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

<div class="flex min-h-screen flex-col gap-6 bg-[#151e46] p-4 text-white md:flex-row">
	<!-- Calendar section -->
	<div class="flex-1">
		<h2 class="mb-4 text-lg font-bold">Medication Schedule</h2>
		<div class="grid grid-cols-7 gap-2 text-center">
			{#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as day}
				<div class="font-semibold">{day}</div>
			{/each}

			<!-- Empty slots before the first day of the month -->
			{#each Array(getFirstDayOffset(year, month)).fill(null) as _}
				<div></div>
			{/each}

			<!-- Calendar days -->
			{#each Array(getDaysInMonth(year, month))
				.fill(0)
				.map((_, i) => i + 1) as day}
				<button
					class="flex cursor-pointer flex-col justify-start rounded bg-white p-3 text-[#151e46] shadow-md transition-all duration-200 hover:bg-blue-200"
					onclick={() => selectDate(day)}
				>
					<span class="text-sm font-bold">{day}</span>
					{#if data.user.medications.some((med) => {
						const weekday = getDayOfWeek(day);
						const daysArray = intToDay(med.days);
						return daysArray[weekday];
					})}
						<span class="mt-1 text-xs font-medium text-green-600">💊</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- Medication Details Section (Right Panel) -->
	<div class="flex-1 rounded-md bg-white p-4 text-[#151e46] shadow-lg">
		<h3 class="mb-3 text-lg font-bold">
			Medication for {selectedDate ? `${monthNames[month]} ${$selectedDate}` : ''}
		</h3>

		{#if $medicationsForSelectedDate.length > 0}
			<ul class="space-y-3">
				{#each $medicationsForSelectedDate as med}
					<li class="border-l-4 border-blue-600 pl-3">
						<div class="text-base font-semibold">{med.name}</div>
						<div class="text-sm text-gray-700">{med.description}</div>
						<div class="text-xs text-gray-500">
							Time(s): {intToTime(med.time)
								.map((t, i) => (t ? `${i.toString().padStart(2, '0')}:00` : null))
								.filter(Boolean)
								.join(', ')}
						</div>
						{#if med.dose}
							<div class="text-xs text-gray-500">Dose: {med.dose} {med.units}</div>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-gray-500">No medications for this day.</p>
		{/if}
	</div>
</div>
