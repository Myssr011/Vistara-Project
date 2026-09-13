<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
</script>

<header class="dashboard-nav">
	<strong>Area mitra</strong>
	<nav aria-label="Navigasi mitra">
		<a href="/listings" aria-current={page.url.pathname.startsWith('/listings') ? 'page' : undefined}>Listing</a>
		<a href="/bookings" aria-current={page.url.pathname === '/bookings' ? 'page' : undefined}>Booking masuk</a>
	</nav>
</header>

{@render children()}
