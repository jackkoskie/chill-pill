<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import '../app.css';
	import logo from '$lib/assets/images/chill_pill_logo.png';
	let { children, data } = $props();

	let theme = $state(false);

	const toggleTheme = () => {
		localStorage.setItem('theme', (!theme).toString());
	};

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			theme = storedTheme === 'true';
			localStorage.setItem('theme', theme.toString());
		}
	});
</script>

<div class="flex min-h-screen flex-col">
	<div class="navbar sticky top-0 z-[9999] bg-base-300">
		<!-- Top left corner Website Title -->
		<a href="/" class="btn btn-ghost mx-2 gap-2 px-1 text-3xl"
			><img src={logo} class="w-12" />Chill Pill</a
		>

		<!-- Dark and Light Theme Toggle -->
		<label class="label-info me-auto flex cursor-pointer gap-2">
			<Icon icon="flowbite:sun-outline" style="font-size: 30px" />
			<input
				type="checkbox"
				value="luxury"
				class="theme-controller toggle"
				bind:checked={theme}
				onclick={toggleTheme}
			/>
			<Icon icon="flowbite:moon-outline" style="font-size: 30px" />
		</label>

		<!-- Dropdown Menu -->
		{#if data.user}
			<div class="flex-none gap-2">
				<div class="flex-none gap-2">
					<ul class="menu menu-horizontal p-1">
						<li><a>Notifications</a></li>
						<li><a>Calendar</a></li>
					</ul>
				</div>
				<div class="dropdown dropdown-end">
					<div class="btn btn-ghost" tabindex="0" role="button">
						<span>{data.user.name}</span>
					</div>
					<ul
						tabindex="0"
						class="bg-base-400 menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box p-2 shadow"
					>
						<li>
							<a class="justify-between"> Profile </a>
						</li>
						<li><a>Settings</a></li>
						<li><a href="/logout">Log Out</a></li>
					</ul>
				</div>
			</div>
		{:else}
			<div class="flex-none gap-2">
				<a href="/login" class="btn btn-ghost">Login</a>
			</div>
		{/if}
	</div>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="footer z-[9999] items-center bg-neutral p-4 text-neutral-content">
		<aside class="grid-flow-col items-center">
			<p>
				ChillPill | Copyright © 2024 - {new Date().getFullYear()} | All right reserved | Powered by
				Cloudfare | <a href="/about" class="hover:link">About Us</a>
			</p>
		</aside>
		<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<a class="text-xl" href="https://en.wikipedia.org/wiki/LeBron_James" target="_blank">
				<Icon icon="ion:basketball-sharp" />
			</a>
			<a class="text-xl" href="https://x.com" target="_blank">
				<Icon icon="prime:twitter" />
			</a>
			<a class="text-xl" href="https://youtube.com" target="_blank">
				<Icon icon="mdi:youtube" />
			</a>
			<a class="text-xl" href="https://instagram.com" target="_blank">
				<Icon icon="mdi:instagram" />
			</a>
			<a class="text-xl" href="https://github.com/jackkoskie/chill-pill" target="_blank">
				<Icon icon="mdi:github" />
			</a>

		</nav>
	</footer>
</div>
