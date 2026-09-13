<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
</script>

<header class="dashboard-nav">
	<strong>Area admin</strong>
	<nav aria-label="Navigasi admin">
		<a href="/admin/listings" aria-current={page.url.pathname === '/admin/listings' ? 'page' : undefined}>Moderasi listing</a>
		<a href="/admin/partners" aria-current={page.url.pathname === '/admin/partners' ? 'page' : undefined}>Mitra</a>
		<a href="/admin/categories" aria-current={page.url.pathname === '/admin/categories' ? 'page' : undefined}>Kategori</a>
	</nav>
</header>

{@render children()}
