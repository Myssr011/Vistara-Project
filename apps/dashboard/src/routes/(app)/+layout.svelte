<script lang="ts">
	let { children } = $props();
</script>

<header>
	<strong>Dashboard Mitra</strong>
	<nav>
		<a href="/listings">Listing</a>
		<a href="/bookings">Booking Masuk</a>
	</nav>
</header>

{@render children()}
