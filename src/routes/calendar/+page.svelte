<script>
	// Example data for display
	const today = new Date().toISOString().split('T')[0];
	const medications = [
		{ date: '2025-03-07', name: 'Aspirin', time: '8:00 AM', dosage: '100mg', taken: true },
		{ date: '2025-03-07', name: 'Vitamin D', time: '9:00 AM', dosage: '1000 IU', taken: false },
		{ date: '2025-03-07', name: 'Lisinopril', time: '10:00 PM', dosage: '10mg', taken: false },
		{ date: '2025-03-08', name: 'Metformin', time: '8:00 AM', dosage: '500mg', taken: false }
	];
</script>

a<!-- Main Container -->
<div class="flex flex-col gap-4 p-4 lg:flex-row">
	<!-- Calendar Section -->
	<div class="flex-1">
		<h2 class="mb-4 text-xl font-bold">Medication Schedule</h2>

		<!-- Calendar Days -->
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

	<!-- Today's Medications Section -->
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
</div>
