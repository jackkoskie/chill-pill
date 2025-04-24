<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: PageData } = $props();

	const getGreeting = (name: string) => {
		const date = new Date();
		const hours = date.getHours();
		if (hours < 12) {
			return m.greeting_morning({ name });
		} else if (hours < 18) {
			return m.greeting_afternoon({ name });
		} else {
			return m.greeting_evening({ name });
		}
	};
	// data.history[0].timestamp

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
</script>

<section class="">
	<div class="container mx-auto">
		<h1 class="pt-6 text-3xl font-semibold">{getGreeting(data.user!.name.split(' ')[0])}</h1>
		<p class="my-1 text-sm text-gray-500">m.greeting_history()</p>
		<div class="divider mt-0"></div>
		<h2 class="text-xl font-medium">History</h2>
		<div class="overflow-x-auto">
			<table class="table mb-12 w-[80vw]">
				<thead>
					<tr>
						<th>Name</th>
						<th>Dosage</th>
						<th>Status</th>
						<th>Scheduled Time</th>
						<th>Time Taken</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{#each data.history as h, i}
						<!-- Add divider if date changes -->
						{#if i > 0 && new Date(h.timestamp).getDate() !== new Date(data.history[i - 1].timestamp).getDate()}
							<tr class="w-full">
								<!-- <td colspan="6" class="bg-neutral p-1"></td> -->

								<td> </td>
								<td></td>
								<td colspan="2"><hr /></td>
							</tr>
						{/if}
						<tr class={h.skip ? 'bg-error text-error-content' : ''}>
							<td>{h.medication.name}</td>
							<td>{h.medication.dose} {h.medication.units}</td>
							<td>{h.skip ? 'Skipped' : 'Taken'}</td>
							<td>{h.hour}:00</td>
							<td
								>{h.timestamp.toLocaleString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false
								})}</td
							>
							<td
								>{h.timestamp.toLocaleString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								})}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>
