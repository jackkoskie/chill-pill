<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import Icon from '@iconify/svelte';
</script>

<section class="">
	<div class="my-auto flex min-h-screen w-full flex-col items-center justify-center">
		<div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-body">
				<div class="card-actions justify-center">
					<button class="btn btn-neutral"
						><Icon icon="devicon:google" /> Continue with Google</button
					>
				</div>
			</div>
		</div>
		<!-- <h1>Sign in</h1>
		<a href="/login/google">Sign in with Google</a> -->
	</div>
</section>
