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
		<div class="navbar sticky top-0 z-[9999] bg-base-300">
			<!-- Top left corner Website Title -->
			<a href={i18n.resolveRoute('/')} class="btn btn-ghost mx-2 gap-2 px-1 text-3xl"
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
							<li><a>{m.notifications()}</a></li>
							<li><a>{m.calendar()}</a></li>
						</ul>
					</div>
					<div class="dropdown dropdown-end">
						<div class="btn btn-ghost" tabindex="0" role="button">
							<span>{data.user.name}</span>
						</div>
						<ul
							tabindex="-2"
							class="bg-base-400 menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box p-2 shadow"
						>
							<li>
								<a class="justify-between"> {m.profile()} </a>
							</li>
							<li><a>{m.settings()}</a></li>
							<li><a href={i18n.resolveRoute('/logout')}>{m.logout()}</a></li>
						</ul>
					</div>
				</div>
			{:else}
				<div class="flex-none gap-2">
					<a href={i18n.resolveRoute('/login')} class="btn btn-ghost">{m.login()}</a>
				</div>
			{/if}
			<div class="dropdown dropdown-bottom">
				<div class="btn btn-ghost" tabindex="0" role="button">
					<span>Language</span>
				</div>
				<ul
					tabindex="-1"
					class="bg-base-400 menu dropdown-content menu-sm z-[1] mt-3 w-32 rounded-box p-2 shadow"
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
							<li><a href={'/zh' + i18n.route($page.url.pathname)}>繁體中文</a></li>
						</ul>
					</li>
					<li role="menuitem">
						<a href={'/es' + i18n.route($page.url.pathname)}>Español</a>
					</li>
				</ul>
			</div>
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
</ParaglideJS>
