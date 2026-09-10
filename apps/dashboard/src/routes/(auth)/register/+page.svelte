<script lang="ts">
	// TODO: buat User(role=PARTNER) + Partner(status=PENDING) lewat @vistara/database.
	let email = $state('');
	let password = $state('');
	let namaUsaha = $state('');
</script>

<h1>Daftar Mitra</h1>
<form method="post">
	<label>Nama usaha <input bind:value={namaUsaha} required /></label>
	<label>Email <input type="email" bind:value={email} required /></label>
	<label>Password <input type="password" bind:value={password} required /></label>
	<button type="submit">Daftar</button>
</form>
<p><a href="/login">Sudah punya akun?</a></p>
