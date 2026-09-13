<script lang="ts">
	// TODO: submit ke endpoint auth (JWT/session), simpan cookie, redirect sesuai role.
	let email = $state('');
	let password = $state('');
</script>

<section class="dashboard-auth" aria-labelledby="login-title">
	<h1 id="login-title">Masuk ke dashboard</h1>
	<p id="login-notice">Login belum tersedia. Formulir ini masih berupa pratinjau.</p>
	<form method="post" onsubmit={(event) => event.preventDefault()} aria-describedby="login-notice">
		<label>Email <input type="email" name="email" autoComplete="username" bind:value={email} required /></label>
		<label>Password <input type="password" name="password" autoComplete="current-password" bind:value={password} required /></label>
		<button type="submit" disabled>Masuk</button>
	</form>
	<p>Belum punya akun? <a href="/register">Daftar sebagai mitra</a></p>
</section>
