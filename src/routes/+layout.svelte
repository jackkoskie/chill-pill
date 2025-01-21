<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>
<div class="navbar bg-base-300">
	<!-- Top left corner Website Title -->
	<div class="">
	  <a class="btn btn-ghost text-3xl">ChillPill</a>
	</div>
  
	<!-- Dark and Light Theme Toggle -->
	<label class="flex cursor-pointer gap-2 me-auto">
	  <svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round">
		<circle cx="12" cy="12" r="5" />
		<path
		  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
	  </svg>
	  <input type="checkbox" value="luxury" class="toggle theme-controller" />
	  <svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round">
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
	  </svg>
	</label>
  
	<!-- Dropdown Menu -->
	<div class="flex-none gap-2">
	  <div class="flex-none">
		<ul class="menu menu-horizontal px-1">
		  <li>
			<details>
			  <summary>Menu</summary>
			  <ul class="bg-base-100 rounded-t-none p-2">
				<li><a>Settings</a></li>
				<li><a>Account</a></li>
				<li><a>Notifications</a></li>
				<li><a>Calendar</a></li>
			  </ul>
			</details>
		  </li>
		</ul>
	  </div>
	  <div class="dropdown dropdown-end">
		<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
		  <div class="w-10 rounded-full">
			<img
			  alt="Tailwind CSS Navbar component"
			  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
		  </div>
		</div>
		<ul
		  tabindex="0"
		  class="menu menu-sm dropdown-content bg-base-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
{@render children()}
