<script lang="ts">
	import type { Medication, MedicationHistory } from '$lib/db/schema';
	import { intToDay, intToTime } from '$lib/utils/converter';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let medications = data.medications.filter(
		// Filter out medications that are not being taken today
		(med) => intToDay(med.days)[new Date().getDay() - 1]
	);

	let allMeds = $state(data.medications);

	type MedicationToTake = Medication & { history: MedicationHistory[]; timeToTake: number };

	type MedicationWithHistory = Medication & { history: MedicationHistory[] };

	let medicationsToTake: MedicationToTake[] = $state([]);

	let getMedsToTake = () => {
		let meds = medications.map((med) => med);

		// filter history so it only applies to today
		meds = meds.map((med) => {
			med.history = med.history.filter((hist) => {
				const histDate = new Date(hist.timestamp);
				const currentDate = new Date();
				return (
					histDate.getDate() === currentDate.getDate() &&
					histDate.getMonth() === currentDate.getMonth() &&
					histDate.getFullYear() === currentDate.getFullYear()
				);
			});

			return med;
		});

		let medsToTake: MedicationToTake[] = [];

		meds.forEach((med) => {
			let times = intToTime(med.time)
				.map((time, index) => {
					// if it's supposed to be taken at this time and it hasn't been taken yet and it +- 1 hour of now
					if (
						time &&
						!med.history.some((h) => h.hour === index) &&
						Math.abs(new Date().getHours() - index) <= 1
					) {
						return index;
					} else {
						return -1;
					}
				})
				.filter((t) => t !== -1);

			console.log(med.name, times, times.length);

			if (times.length > 0) {
				medsToTake.push({ ...med, timeToTake: times[0] });
			}
		});

		return medsToTake;
	};

	$effect(() => {
		medications.sort((a, b) => {
			const currentHour = new Date().getHours() - 1;
			const aTime = intToTime(a.time).slice(currentHour);
			const bTime = intToTime(b.time).slice(currentHour);

			for (let i = 0; i < aTime.length; i++) {
				if (aTime[i] && !bTime[i]) {
					return -1;
				} else if (!aTime[i] && bTime[i]) {
					return 1;
				} else if (aTime[i] && bTime[i]) {
					return 0;
				}
			}
			return 0;
		});

		medicationsToTake = getMedsToTake();
	});

	const takeMed = async (med: MedicationToTake) => {
		const newMed = (await (
			await fetch('/dashboard', {
				method: 'POST',
				body: JSON.stringify({
					medId: med.id,
					userId: med.userID,
					hour: med.timeToTake,
					skip: false
				})
			})
		).json()) as MedicationWithHistory;

		medications[medications.findIndex((m) => m.id === med.id)] = newMed;
		allMeds[allMeds.findIndex((m) => m.id === med.id)] = newMed;
		medicationsToTake = getMedsToTake();
	};

	const skipMed = async (med: MedicationToTake) => {
		const newMed = (await (
			await fetch('/dashboard', {
				method: 'POST',
				body: JSON.stringify({
					medId: med.id,
					userId: med.userID,
					hour: med.timeToTake,
					skip: true
				})
			})
		).json()) as MedicationWithHistory;

		medications[medications.findIndex((m) => m.id === med.id)] = newMed;
		allMeds[allMeds.findIndex((m) => m.id === med.id)] = newMed;
		medicationsToTake = getMedsToTake();
	};
</script>

<div class="mt-6">
	<!-- if there are no medications to take right now -->
	{#if medicationsToTake.length === 0}
		<p>You're all caught up on your medications!</p>
	{:else}
		<!-- if there are medications to take -->
		<div class="flex flex-col gap-3">
			{#each medicationsToTake as med}
				<div class="flex flex-row gap-3">
					<p>You need to take {med.dose} {med.units} of {med.name} at {med.timeToTake}:00</p>
					{#if med.quantity > 0}
						<button class="btn" onclick={() => takeMed(med)}>Take Med</button>
					{:else}
						<button class="btn" disabled>Out of Medication</button>
					{/if}
					<button class="btn" onclick={() => skipMed(med)}>Skip</button>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-3">
		<div class="flex flex-row gap-3">
			<p class="text-lg font-semibold">Medications To Refill</p>
			<a href="/settings" class="btn btn-sm">Refil at Dashboard</a>
		</div>
		<div class="flex flex-col gap-3">
			{#each data.medications.filter((m) => m.quantity <= m.warningLevel) as med}
				<p>{med.name} is at {med.quantity} {med.units}</p>
			{/each}
		</div>
	</div>
</div>
