<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.user}
	<p>Hello {data.user.name}</p>
	<p><a href="/logout">Logout</a></p>
{:else}
	<p>Not Logged In. <a href="/login">Login</a></p>
{/if}
