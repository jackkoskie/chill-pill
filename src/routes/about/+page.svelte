<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import Icon from '@iconify/svelte';
</script>

<section class="py-12">
	<div class="max-w-6xl mx-auto px-6 text-center">
		
		<div class="flex items-center my-6">
			<hr class="flex-grow border-gray-300">
			<span class="mx-6 text-4xl font-bold">About Us</span>
			<hr class="flex-grow border-gray-300">
		</div>
		<p class="mt-4"> At ChillPill, we believe that managing medications should be simple, reliable, and stress-free. Our goal is to help individuals, caregivers, and healthcare providers track medication schedules effortlessly. Our platform ensures users never miss a dose with intuitive reminders, smart scheduling, and real-time notifications. Whether you’re managing prescriptions for yourself or a loved one, our app makes it easy to stay on top of your health.</p>
		
		<div class="flex items-center my-6">
			<hr class="flex-grow border-gray-300">
			<span class="mx-6 text-4xl font-bold">Our Mission</span>
			<hr class="flex-grow border-gray-300">
		</div>
		<p class="mt-4">We are committed to leveraging technology to enhance medication adherence, reduce missed doses, and support better health outcomes. By combining an easy-to-use interface with powerful features, we aim to bridge the gap between healthcare providers and patients.</p>

		<div class="flex items-center my-6">
			<hr class="flex-grow border-gray-300">
			<span class="mx-6 text-4xl font-bold">Who We Are</span>
			<hr class="flex-grow border-gray-300">
		</div>
		<p class="mt-4">We are a team of passionate developers and designers dedicated to making healthcare more accessible and manageable through technology. With a strong focus on user experience, security, and innovation, we strive to create software that makes a real difference in people’s lives.</p>
		

		<div class="mt-12 grid md:grid-cols-3 gap-8">
			<div class="bg-white shadow-lg p-6 rounded-lg text-center">
				<h3 class="mt-4 text-xl text-blue-600 font-semibold">Jack Koskie</h3>
				<p class="text-gray-500">Roles</p>
			</div>
			<div class="bg-white shadow-lg p-6 rounded-lg text-center">
				<h3 class="mt-4 text-xl text-blue-600 font-semibold">Dushyant Saini</h3>
				<p class="text-gray-500">Roles</p>
			</div>
			<div class="bg-white shadow-lg p-6 rounded-lg text-center">
				<h3 class="mt-4 text-xl text-blue-600 font-semibold">Eric Du</h3>
				<p class="text-gray-500">Roles</p>
			</div>
		</div>
	</div>
</section>
