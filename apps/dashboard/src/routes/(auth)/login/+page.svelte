<script lang="ts">
	// TODO: submit ke endpoint auth (JWT/session), simpan cookie, redirect sesuai role.
	let email = $state('');
	let password = $state('');
</script>

<h1>Masuk</h1>
<form method="post">
	<label>Email <input type="email" bind:value={email} required /></label>
	<label>Password <input type="password" bind:value={password} required /></label>
	<button type="submit">Masuk</button>
</form>
<p><a href="/register">Belum punya akun mitra?</a></p>
