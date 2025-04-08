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
</script>

<div class="container mx-auto">
	<h1 class="pt-6 text-3xl font-semibold">{getGreeting(data.user!.name.split(' ')[0])}</h1>
	<p class="my-1 text-sm text-gray-500">Use this page to view your medication history.</p>
	<div class="mt-0 divider"></div>
</div>

