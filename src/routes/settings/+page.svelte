<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import * as m from '$lib/paraglide/messages';
	import { users, type Medication } from '$lib/db/schema';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';

	import {
		dayToInt,
		dayToString,
		intToDay,
		intToTime,
		timeToInt,
		timeToString
	} from '$lib/utils/converter';

	let { data, form }: { data: PageData; form: ActionData } = $props();

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

	let editName = $state('');
	let editDays = $state(Array(7).fill(false));
	let editTime = $state(Array(24).fill(false));
	let editDescription = $state('');
	let selectTime: number = $state(-1);
	let medications = $state(data.user!.medications);
	let editDose = $state(0);
	let editUnits = $state('Units');
	let editQuantity = $state(0);
	let editWarningLevel = $state(0);

	const initEditModal = (med: Medication) => {
		editName = med.name;
		editDays = intToDay(med.days);
		editTime = intToTime(med.time);
		editDescription = med.description || '';
		selectTime = -1;
		editDose = med.dose;
		editUnits = med.units;
		editQuantity = med.quantity;
		editWarningLevel = med.warningLevel;
	};

	const initAddModal = () => {
		editName = '';
		editDays = Array(7).fill(false);
		editTime = Array(24).fill(false);
		editDescription = '';
		selectTime = -1;
		editDose = 0;
		editUnits = 'mg';
		editQuantity = 0;
		editWarningLevel = 0;
	};

	const saveMed = (medId: number | null = null) => {
		const days = dayToInt(editDays);
		const time = timeToInt(editTime);
		const name = editName;
		const description = editDescription;
		const dose = editDose;
		const units = editUnits;
		const quantity = editQuantity;
		const warningLevel = editWarningLevel;

		if (medId) {
			data.user?.medications.find((med) => {
				if (med.id === medId) {
					let index = medications.findIndex((med) => med.id === medId);

					medications[index] = {
						...medications[index],
						name,
						days,
						time,
						description,
						dose,
						units,
						quantity,
						warningLevel
					};

					return true;
				}
				return false;
			});

			fetch('/settings', {
				method: 'PATCH',
				body: JSON.stringify({
					id: medId,
					name,
					days,
					time,
					description,
					dose,
					units,
					quantity,
					warningLevel
				}),
				credentials: 'include'
			});
		} else {
			fetch('/settings', {
				method: 'POST',
				body: JSON.stringify({
					name,
					days,
					time,
					description,
					dose,
					units,
					quantity,
					warningLevel
				})
			}).then(async (res) => {
				const { med } = (await res.json()) as { med: Medication };

				medications = [...medications, med];
			});
		}
	};

	let modal = $state();

	const deleteMed = (medId: number) => {
		data.user?.medications.find((med) => {
			if (med.id === medId) {
				let index = medications.findIndex((med) => med.id === medId);
				medications.splice(index, 1);
				return true;
			}
			return false;
		});

		fetch('/settings', {
			method: 'DELETE',
			body: JSON.stringify({
				id: medId
			}),
			credentials: 'include'
		});
	};
</script>

<section class="">
	<div class="container mx-auto">
		<h1 class="pt-6 text-3xl font-semibold">{getGreeting(data.user!.name.split(' ')[0])}</h1>
		<p class="my-1 text-sm text-gray-500">
			{m.settings_description()}
		</p>
		<div class="divider mt-0"></div>

		<h2 class="text-xl font-medium">{m.medications()}</h2>
		<div class="overflow-x-auto">
			<table class="table w-[80vw]">
				<!-- head -->
				<thead>
					<tr>
						<th>{m.name()}</th>
						<th>{m.days_to_take()}</th>
						<th>{m.time_to_take()}</th>
						<th>{m.dose()}</th>
						<th>{m.quantity()}</th>
						<th>{m.refill_at()}</th>
					</tr>
				</thead>
				<tbody>
					{#each medications as med}
						<tr>
							<td>{med.name}</td>
							<td>{dayToString(intToDay(med.days))}</td>
							<td>{timeToString(intToTime(med.time))}</td>
							<td>{med.dose} {med.units}</td>
							<td>{med.quantity} {med.units}</td>
							<td>{med.warningLevel} {med.units}</td>
							<td>
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<div class="flex flex-row gap-3">
									<label for={med.id.toString()} onclick={() => initEditModal(med)}
										><Icon icon="lucide:edit" />
									</label>

									{#if med.quantity <= med.warningLevel}
										<Icon icon="lucide:alert-triangle" class="text-error" />
									{/if}
								</div>
								<!-- The button to open modal -->
								<input type="checkbox" id={med.id.toString()} class="modal-toggle" />
								<div class="modal modal-middle z-[9999]" role="dialog">
									<div class="modal-box">
										<h3 class="text-lg font-bold">{m.edit_medication({ 'med.name': med.name })}</h3>
										<div class="mt-1 flex flex-col gap-3">
											<label class="form-control w-full max-w-xs">
												<div class="label">
													<span class="label-text">{m.name()}</span>
												</div>
												<input
													type="text"
													class="input input-bordered w-full max-w-xs"
													bind:value={editName}
												/>
											</label>
											<label class="form-control w-full max-w-xs">
												<div class="label">
													<span class="label-text">{m.description()}</span>
												</div>
												<textarea
													class="textarea textarea-bordered h-24 resize-none"
													placeholder={m.description()}
													bind:value={editDescription}
												></textarea>
											</label>
											<div class="flex flex-row gap-16">
												<div class="form-control">
													<div class="label">
														<span class="label-text">{m.days_to_take()}</span>
													</div>
													<div class="flex flex-col gap-2">
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[0]} class="checkbox" />
															<span class="label-text">Monday</span>
														</label>
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[1]} class="checkbox" />
															<span class="label-text">Tuesday</span>
														</label>
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[2]} class="checkbox" />
															<span class="label-text">Wednesday</span>
														</label>
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[3]} class="checkbox" />
															<span class="label-text">Thursday</span>
														</label>
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[4]} class="checkbox" />
															<span class="label-text">Friday</span>
														</label>
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[5]} class="checkbox" />
															<span class="label-text">Saturday</span>
														</label>
														<label class="label cursor-pointer justify-start gap-3 py-0">
															<input type="checkbox" bind:checked={editDays[6]} class="checkbox" />
															<span class="label-text">Sunday</span>
														</label>
													</div>
												</div>
												<div class="form-control">
													<div class="label">
														<span class="label-text">{m.time_to_take()}</span>
													</div>
													<div class="flex flex-col gap-2">
														{#each editTime as enabled, time}
															{#if enabled}
																<button
																	class="my-0 px-2 py-0 text-left hover:text-error hover:line-through"
																	onclick={() => (editTime[time] = false)}
																	>{time.toString().padStart(2, '0')}:00</button
																>
															{/if}
														{/each}
														<select
															class="select select-bordered w-full max-w-xs"
															bind:value={selectTime}
															onchange={() => {
																if (selectTime !== -1) {
																	editTime[selectTime] = true;
																	selectTime = -1;
																}
															}}
														>
															<option disabled selected value={-1}>Select a Time</option>
															{#each Array(24) as _, i}
																{#if !editTime[i]}
																	<option value={i}>{i.toString().padStart(2, '0')}:00</option>
																{/if}
															{/each}
														</select>
													</div>
												</div>
											</div>
											<label class="form-control w-full max-w-xs">
												<div class="label">
													<span class="label-text">Dose</span>
												</div>
												<div class="flex flex-row gap-3">
													<input
														type="text"
														class="input input-bordered w-24 text-right"
														bind:value={editDose}
													/>
													<select
														class="select select-bordered w-full max-w-32"
														bind:value={editUnits}
													>
														<option disabled selected>Units</option>
														<option value="mg">mg</option>
														<option value="g">g</option>
														<option value="mL">mL</option>
														<option value="L">L</option>
														<option value="pills">pills</option>
														<option value="tablets">tablets</option>
														<option value="drops">drops</option>
														<option value="CC">CC</option>
														<option value="mol">mol</option>
													</select>
												</div>
											</label>
											<div class="flex flex-row gap-3">
												<label class="form-control w-full max-w-xs">
													<div class="label">
														<span class="label-text">{m.quantity()}</span>
													</div>
													<div class="flex flex-row items-baseline gap-3">
														<input
															type="text"
															class="input input-bordered w-24 text-right"
															bind:value={editQuantity}
														/>
														<span>{editUnits}</span>
													</div>
												</label>
												<label class="form-control w-full max-w-xs">
													<div class="label">
														<span class="label-text">{m.refill_at()}</span>
													</div>
													<div class="flex flex-row items-baseline gap-3">
														<input
															type="text"
															class="input input-bordered w-24 text-right"
															bind:value={editWarningLevel}
														/>
														<span>{editUnits}</span>
													</div>
												</label>
											</div>
										</div>

										<div class="modal-action">
											<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
											<!-- svelte-ignore a11y_click_events_have_key_events -->
											<label
												for={med.id.toString()}
												class="btn btn-outline btn-error"
												onclick={() => deleteMed(med.id)}>{m.delete_med()}</label
											>
											<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
											<!-- svelte-ignore a11y_click_events_have_key_events -->
											<label
												for={med.id.toString()}
												class="btn btn-outline btn-success"
												onclick={() => saveMed(med.id)}>{m.save_med()}</label
											>
										</div>
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<!-- The button to open modal -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<label for="add_modal" class="btn btn-outline btn-success mt-4" onclick={initAddModal}
				>{m.add_medication()}</label
			>

			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="add_modal" class="modal-toggle" />
			<div class="modal modal-middle z-[9999]" role="dialog">
				<div class="modal-box">
					<h3 class="text-lg font-bold">{m.add_medication()}</h3>
					<div class="mt-1 flex flex-col gap-3">
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">{m.name()}</span>
							</div>
							<input
								type="text"
								class="input input-bordered w-full max-w-xs"
								bind:value={editName}
							/>
						</label>
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">{m.description()}</span>
							</div>
							<textarea
								class="textarea textarea-bordered h-24 resize-none"
								placeholder={m.description()}
								bind:value={editDescription}
							></textarea>
						</label>
						<div class="flex flex-row gap-16">
							<div class="form-control">
								<div class="label"><span class="label-text">{m.days_to_take()}</span></div>
								<div class="flex flex-col gap-2">
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[0]} class="checkbox" />
										<span class="label-text">{m.monday()}</span>
									</label>
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[1]} class="checkbox" />
										<span class="label-text">{m.tuesday()}</span>
									</label>
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[2]} class="checkbox" />
										<span class="label-text">{m.wednesday()}</span>
									</label>
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[3]} class="checkbox" />
										<span class="label-text">{m.thursday()}</span>
									</label>
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[4]} class="checkbox" />
										<span class="label-text">{m.friday()}</span>
									</label>
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[5]} class="checkbox" />
										<span class="label-text">{m.saturday()}</span>
									</label>
									<label class="label cursor-pointer justify-start gap-3 py-0">
										<input type="checkbox" bind:checked={editDays[6]} class="checkbox" />
										<span class="label-text">{m.sunday()}</span>
									</label>
								</div>
							</div>
							<div class="form-control">
								<div class="label"><span class="label-text">{m.time_to_take()}</span></div>
								<div class="flex flex-col gap-2">
									{#each editTime as enabled, time}
										{#if enabled}
											<button
												class="my-0 px-2 py-0 text-left hover:text-error hover:line-through"
												onclick={() => (editTime[time] = false)}
												>{time.toString().padStart(2, '0')}:00</button
											>
										{/if}
									{/each}
									<select
										class="select select-bordered w-full max-w-xs"
										bind:value={selectTime}
										onchange={() => {
											if (selectTime !== -1) {
												editTime[selectTime] = true;
												selectTime = -1;
											}
										}}
									>
										<option disabled selected value={-1}>Select a Time</option>
										{#each Array(24) as _, i}
											{#if !editTime[i]}
												<option value={i}>{i.toString().padStart(2, '0')}:00</option>
											{/if}
										{/each}
									</select>
								</div>
							</div>
						</div>
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">{m.dose()}</span>
							</div>
							<div class="flex flex-row gap-3">
								<input
									type="text"
									class="input input-bordered w-24 text-right"
									bind:value={editDose}
								/>
								<select class="select select-bordered w-full max-w-32" bind:value={editUnits}>
									<option disabled selected>Units</option>
									<option value="mg">mg</option>
									<option value="g">g</option>
									<option value="mL">mL</option>
									<option value="L">L</option>
									<option value="pills">pills</option>
									<option value="tablets">tablets</option>
									<option value="drops">drops</option>
									<option value="CC">CC</option>
									<option value="mol">mol</option>
								</select>
							</div>
						</label>
						<div class="flex flex-row gap-3">
							<label class="form-control w-full max-w-xs">
								<div class="label">
									<span class="label-text">{m.quantity_total()}</span>
								</div>
								<div class="flex flex-row items-baseline gap-3">
									<input
										type="text"
										class="input input-bordered w-24 text-right"
										bind:value={editQuantity}
									/>
									<span>{editUnits}</span>
								</div>
							</label>
							<label class="form-control w-full max-w-xs">
								<div class="label">
									<span class="label-text">{m.refill_at()}</span>
								</div>
								<div class="flex flex-row items-baseline gap-3">
									<input
										type="text"
										class="input input-bordered w-24 text-right"
										bind:value={editWarningLevel}
									/>
									<span>{editUnits}</span>
								</div>
							</label>
						</div>
					</div>

					<div class="modal-action">
						<label for="add_modal" class="btn btn-outline btn-error">Cancel</label>
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<label for="add_modal" class="btn btn-outline btn-success" onclick={() => saveMed()}
							>{m.save_med()}</label
						>
					</div>
				</div>
			</div>
		</div>

		<h2 class="mt-5 text-xl font-medium">{m.family()}</h2>
		<p class="my-1 mb-2 text-sm text-gray-500">{m.family_access_notice()}</p>
		<form method="POST" action="?/addFamilyMember" class="flex flex-row gap-3" use:enhance>
			<div class="flex flex-col">
				<label class="input input-bordered flex max-w-72 items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
						/>
						<path
							d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
						/>
					</svg>
					<input
						type="email"
						class="grow"
						placeholder="Email"
						name="familyMemberEmail"
						required
						value={form?.familyMemberEmail ?? ''}
					/>
				</label>
				<div class="label">
					{#if form}
						<span class={`label-text-alt ${form?.ok ? 'text-success' : 'text-error'}`}
							>{form?.ok ? '' : 'Error: '}{form?.message}</span
						>
					{/if}
				</div>
			</div>
			<button type="submit" class="btn btn-outline btn-success">{m.add_family()}</button>
		</form>
		<ul class="mt-2">
			{#each data.user?.familyMembers ?? [] as family}
				<li class="">
					<form action="?/deleteFamilyMember" method="POST" use:enhance>
						<input type="text" value={family.id} name="id" required hidden />
						<input
							type="submit"
							class="hover:text-error hover:line-through"
							value="- {family.familyMember.name} ({family.familyMember.email})"
						/>
					</form>
				</li>
			{/each}
		</ul>
	</div>
</section>
