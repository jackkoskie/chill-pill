<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import { FakePrimitiveParam } from 'drizzle-orm';
	let { data }: { data: PageData } = $props();
    let date = new Date();
</script>

<div class="text-center text-5xl">
	<h1>Hello, User</h1>
    <p>
        {date.getDate()} / {date.getDay()} / {date.getFullYear()} / {date.getMonth()}

    </p>
    
</div>
