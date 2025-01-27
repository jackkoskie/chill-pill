<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte'
	import '../app.css';
	import logo from "$lib/assets/images/chill_pill_logo.png";
	let { children } = $props();

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
	<div class="navbar sticky top-0 z-[9999] bg-base-300 ">
		<!-- Top left corner Website Title -->
		<a href="/" class="mx-2 gap-2 px-1 text-3xl btn btn-ghost"><img src={logo} class="w-12"/>Chill Pill</a>

		<!-- Dark and Light Theme Toggle -->
		<label class="label-info me-auto flex cursor-pointer gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="5" />
				<path
					d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
				/>
			</svg>
			<input
				type="checkbox"
				value="luxury"
				class="theme-controller toggle"
				bind:checked={theme}
				onclick={toggleTheme}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		</label>

		<!-- Dropdown Menu -->
		<div class="flex-none gap-2">
			<div class="flex-none gap-2">
				<ul class="menu menu-horizontal p-1">
					<li>
						<details>
							<summary>Menu</summary>
							<ul class="rounded-3xl bg-base-100 p-1">
								<li><a>Account</a></li>
								<li><a>Settings</a></li>
								<li><a>Notifications</a></li>
								<li><a>Calendar</a></li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
						/>
						<!--TinyURL.com used to shorten image address from google  -->
					</div>
				</div>
				<ul
					tabindex="0"
					class="bg-base-400 menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box p-2 shadow"
				>
					<li>
						<a class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a>Log Out</a></li>
					<li><a>Change Time Zone</a></li>
					<li><a>Personal Preferences</a></li>
					<li><a>About Us</a></li>
				</ul>
			</div>
		</div>
	</div>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="footer z-[9999] items-center bg-neutral p-4 text-neutral-content">
		<aside class="grid-flow-col items-center">
			
			<p>
				ChillPill | Copyright © 2024 - {new Date().getFullYear()} | All right reserved | Powered by
				Cloudfare
			</p>
		</aside>
		<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<a class="text-xl" href="https://x.com" target="_blank">
				<Icon icon="prime:twitter"/>
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
