<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import * as m from '$lib/paraglide/messages';

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

<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col">
		<div class="navbar sticky top-0 z-[9998] bg-base-300">
			<!-- Top left corner Website Title -->
			<a href={i18n.resolveRoute('/dashboard')} class="btn btn-ghost mx-2 gap-2 px-1 text-3xl"
				><img src={logo} class="w-12" alt="ChillPill Logo" />ChillPill</a
			>

			<!-- Dark and Light Theme Toggle -->
			<label class="label-info flex cursor-pointer gap-2 lg:me-auto">
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

			<div class="dropdown me-auto">
				<div tabindex="0" role="button" class="btn btn-ghost ms-auto lg:hidden">
					<Icon icon="charm:menu-hamburger" style="font-size: 30px" />
				</div>
				<ul
					tabindex="-2"
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li>
						<a href="/calendar">Calendar</a>
					</li>
					<li>
						<a href="/history">History</a>
					</li>
					<li>
						<a href="/settings">Settings</a>
					</li>
					<li>
						<a>Parent</a>
						<ul class="p-2">
							<li><a href="javascript;:">Submenu 1</a></li>
							<li><a href="javascript;:">Submenu 2</a></li>
						</ul>
					</li>
					<li><a href="javascript;:">Item 3</a></li>
				</ul>
			</div>

			<div class="hidden lg:flex">
				<div class="dropdown dropdown-bottom">
					<div class="btn btn-ghost" tabindex="0" role="button">
						<span>{m.language()}</span>
					</div>
					<ul
						tabindex="-1"
						class="menu dropdown-content menu-sm z-[1] mt-3 w-32 rounded-box bg-base-300 p-2 shadow"
					>
						<li role="menuitem">
							<a href={i18n.route($page.url.pathname)} class="justify-between"> English </a>
						</li>
						<li role="menuitem">
							<a href={'/fr' + i18n.route($page.url.pathname)}>Français</a>
						</li>
						<li class="bg-base-400">
							<p class="pointer-events-none">中文</p>
							<ul class="bg-base-400 p-2">
								<li><a href={'/zh-cn' + i18n.route($page.url.pathname)}>简体中文</a></li>
								<li><a href={'/zh-Hant' + i18n.route($page.url.pathname)}>繁體中文</a></li>
							</ul>
						</li>
						<li role="menuitem">
							<a href={'/es' + i18n.route($page.url.pathname)}>Español</a>
						</li>
					</ul>
				</div>
				<!-- Dropdown Menu -->
				{#if data.user}
					<div class="flex flex-grow items-baseline gap-2">
						<div class="flex-none gap-2">
							<ul class="menu menu-horizontal p-1">
								<li><a href="/calendar">{m.calendar()}</a></li>
							</ul>
						</div>
						<div>
							<ul class="menu menu-horizontal p-1">
								<li><a href="/history">{m.navbar_history_btn()}</a></li>
							</ul>
						</div>
						<div class="dropdown dropdown-end">
							<div class="btn btn-ghost" tabindex="0" role="button">
								<span>{data.user.name}</span>
							</div>
							<ul
								tabindex="-2"
								class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
							>
								<li>
									<a class="justify-between" href={i18n.resolveRoute('/dashboard')}>
										{m.dashboard()}
									</a>
								</li>
								<li><a href={i18n.resolveRoute('/settings')}>{m.settings()}</a></li>
								<li><a href={i18n.resolveRoute('/logout')}>{m.logout()}</a></li>
							</ul>
						</div>
					</div>
				{:else}
					<div class="flex flex-grow items-baseline gap-2">
						<a href={i18n.resolveRoute('/login')} class="btn btn-ghost">{m.login()}</a>
					</div>
				{/if}
			</div>
		</div>

		<main class="flex-1">
			{@render children()}
		</main>

		<footer class="footer z-[100] items-center bg-neutral p-4 text-neutral-content">
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
</ParaglideJS>
