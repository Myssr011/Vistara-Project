<script lang="ts">
	let { children } = $props();
</script>

<header>
	<strong>Dashboard Admin</strong>
	<nav>
		<a href="/admin/listings">Moderasi Listing</a>
		<a href="/admin/partners">Mitra</a>
		<a href="/admin/categories">Kategori</a>
	</nav>
</header>

{@render children()}
