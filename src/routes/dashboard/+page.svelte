<script lang="ts">
	import type { Medication, MedicationHistory } from '$lib/db/schema';
	import { intToDay, intToTime } from '$lib/utils/converter';
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import Icon from '@iconify/svelte';

	let { data }: { data: PageData } = $props();

	let date = new Date();
	const month = date.toLocaleString('default', { month: 'long' });
	const weekday = date.toLocaleString('default', { weekday: 'long' });
	const day = date.toLocaleString('defauly', { day: 'numeric' });

	const ordinal = (date: number) => {
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
	};

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
								{day}{ordinal(Number(day))}
							</p>
						</h1>
					</li>
					<li><a href="#dashboard">Dashboard</a></li>
					<li><a href="#today">Today's Medication</a></li>
					<li><a href="#actions">Actions</a></li>
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
					<div class="stat-value">{allMeds.length}</div>
				</div>
			</div>
			<div class="stats h-32 w-full bg-neutral text-neutral-content">
				<!-- Added h-32 -->
				<div class="stat flex flex-col justify-center">
					<!-- Added flex and centering -->
					<div class="stat-title text-neutral-content">Doses Today</div>
					<div class="stat-value">{medications.length}</div>
				</div>
			</div>
			<div class="stats h-32 w-full bg-neutral text-neutral-content">
				<!-- Added h-32 -->
				<div class="stat flex flex-col justify-center">
					<!-- Added flex and centering -->
					<div class="stat-title text-neutral-content">Upcoming Refills</div>
					<div class="stat-value">
						{data.medications.filter((m) => m.quantity <= m.warningLevel).length}
					</div>
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
		<h1 class="text-4xl font-bold">Today's Medications</h1>
	</div>

	{#if medicationsToTake.length === 0}
		<p class="text-center">You're all caught up on your medications!</p>
	{:else}
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
						<th>Time to Take</th>
					</tr>
				</thead>
				<tbody>
					{#each medicationsToTake as med}
						<tr class="h-28 hover:bg-base-300">
							<th>{medicationsToTake.indexOf(med) + 1}</th>
							<td>{med.name}</td>
							<td>{med.dose} {med.units}</td>
							<td>
								{#if med.quantity > 0}
									<button class="btn" onclick={() => takeMed(med)}>Take Med</button>
								{:else}
									<button class="btn" disabled>Out of Medication</button>
								{/if}
								<button class="btn" onclick={() => skipMed(med)}>Skip</button></td
							>
							<td>{med.timeToTake}:00</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	<div class="flex flex-row px-12 py-4" id="actions">
		<h1 class="text-4xl font-bold">Actions</h1>
	</div>
</div>

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
</div>

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
