<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import { FakePrimitiveParam } from 'drizzle-orm';
	import { intToDay } from '$lib/utils/converter';
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

<div class="box">
	<h1 class=" flex items-center">
		<p class="pl-10 font-black">
			Welcome, User
			<br />
			14:15:40
			<br />
			{weekday},
			<br />
			{month}
			{day}{ordinal(day)}
		</p>
	</h1>
</div>

<style>
	.box {
		font-size: 20px;
		padding: 20px;
		margin: 10px;
		border-radius: 8px;
	}
</style>
