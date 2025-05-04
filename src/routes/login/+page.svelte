<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';

	let { data }: { data: PageData } = $props();

	import Icon from '@iconify/svelte';
</script>

<section class="">
	<div class="my-auto flex min-h-screen w-full flex-col items-center justify-center">
		<div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-body">
				<div class="card-actions justify-center">
					<a href="/login/google" class="btn btn-neutral w-60"
						><Icon icon="devicon:google" />{m.google_login()}</a
					>
					<!-- <a href="/login/facebook" class="btn btn-neutral w-60"
						><Icon icon="logos:facebook" /> Continue with Facebook</a
					> -->
				</div>
			</div>
		</div>
	</div>
</section>
