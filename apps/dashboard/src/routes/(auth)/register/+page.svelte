<script lang="ts">
	// TODO: buat User(role=PARTNER) + Partner(status=PENDING) lewat @vistara/database.
	let email = $state('');
	let password = $state('');
	let namaUsaha = $state('');
</script>

<section class="dashboard-auth" aria-labelledby="register-title">
	<h1 id="register-title">Daftar sebagai mitra</h1>
	<p id="register-notice">Pendaftaran belum tersedia. Formulir ini masih berupa pratinjau.</p>
	<form method="post" onsubmit={(event) => event.preventDefault()} aria-describedby="register-notice">
		<label>Nama usaha <input name="namaUsaha" autoComplete="organization" bind:value={namaUsaha} required /></label>
		<label>Email <input type="email" name="email" autoComplete="email" bind:value={email} required /></label>
		<label>Password <input type="password" name="password" autoComplete="new-password" bind:value={password} required /></label>
		<button type="submit" disabled>Daftar</button>
	</form>
	<p>Sudah punya akun? <a href="/login">Masuk</a></p>
</section>
