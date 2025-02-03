<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="relative -z-10 flex min-h-[80vh] items-center justify-center">
	<div class="rounded-xl bg-base-200 p-10">
		<ul class="text-pretty text-left text-5xl font-bold">
			<li>Medication</li>
			<li>Reminders</li>
			<li>Personalisation</li>
			<li>Calendars</li>
			<li>ChillPill</li>
		</ul>
	</div>
</div>

<style>
	ul {
		list-style-type: none;
		margin: 0px;
		padding: 20px;
	}
</style>
