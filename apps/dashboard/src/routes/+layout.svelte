<script lang="ts">
	 import vistaraMark from '../../../web/public/vistara-mark.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Dashboard | Vistara</title>
	<link rel="icon" href={vistaraMark} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<a class="skip-link" href="#main-content">Lewati ke konten</a>
<header class="dashboard-header">
	<a class="dashboard-brand" href="/"><img src={vistaraMark} alt="" width="28" height="28" />VISTARA<span>Dashboard</span></a>
</header>
<main id="main-content" class="dashboard-content">{@render children()}</main>

<style>
	:global(:root) { font-family: 'Plus Jakarta Sans', sans-serif; color: #202527; background: #f7f8fa; --dashboard-accent: #0a66c2; --dashboard-line: #dce0e3; --dashboard-muted: #596168; }
	:global(*) { box-sizing: border-box; }
	:global(body) { margin: 0; }
	:global(a) { color: var(--dashboard-accent); text-underline-offset: 4px; }
	:global(button), :global(input) { font: inherit; }
	:global(:is(a, button, input):focus-visible) { outline: 2px solid var(--dashboard-accent); outline-offset: 3px; }
	.skip-link { position: absolute; top: -100px; left: 16px; background: white; padding: 12px; }
	.skip-link:focus { top: 8px; z-index: 1; }
	.dashboard-header { background: #fff; border-bottom: 1px solid var(--dashboard-line); padding: 12px max(24px, calc((100% - 1200px) / 2)); }
	.dashboard-brand { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; color: #202527; font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 600; text-decoration: none; }
	.dashboard-brand img { object-fit: contain; }
	.dashboard-brand span { margin-left: 12px; padding-left: 20px; border-left: 1px solid var(--dashboard-line); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 400; color: var(--dashboard-muted); }
	.dashboard-content { max-width: 1248px; padding: 32px 24px 64px; margin-inline: auto; }
	:global(.dashboard-content h1) { font-size: 28px; line-height: 1.3; font-weight: 600; margin: 24px 0 16px; overflow-wrap: anywhere; }
	:global(.dashboard-content p) { color: var(--dashboard-muted); font-size: 14px; line-height: 1.8; overflow-wrap: anywhere; }
	:global(.dashboard-nav) { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 32px; padding-bottom: 12px; border-bottom: 1px solid var(--dashboard-line); }
	:global(.dashboard-nav strong) { color: var(--dashboard-muted); font-size: 12px; font-weight: 600; }
	:global(.dashboard-nav nav) { display: flex; flex-wrap: wrap; gap: 4px 24px; }
	:global(.dashboard-nav a) { display: flex; align-items: center; min-height: 44px; color: var(--dashboard-muted); font-size: 14px; text-decoration: none; border-bottom: 2px solid transparent; }
	:global(.dashboard-nav a[aria-current='page']) { color: var(--dashboard-accent); border-color: var(--dashboard-accent); }
	:global(.dashboard-nav a:hover) { color: var(--dashboard-accent); }
	:global(.dashboard-actions) { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
	:global(.dashboard-button), :global(.dashboard-content button) { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 10px 16px; background: var(--dashboard-accent); color: #fff; border: 1px solid var(--dashboard-accent); border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; }
	:global(.dashboard-button:hover), :global(.dashboard-content button:hover:not(:disabled)) { background: #084f95; }
	:global(.dashboard-button-secondary) { background: #fff; color: var(--dashboard-accent); }
	:global(.dashboard-button-secondary:hover) { background: #e8f1fb; }
	:global(.dashboard-content button:disabled) { cursor: not-allowed; color: #596168; background: #eef0f2; border-color: var(--dashboard-line); }
	:global(.dashboard-status) { padding: 24px 0; margin-top: 28px; border-block: 1px solid var(--dashboard-line); }
	:global(.dashboard-auth) { max-width: 440px; margin: 24px auto; }
	:global(.dashboard-auth form) { padding: 24px; margin-block: 24px; border: 1px solid var(--dashboard-line); border-radius: 8px; background: #fff; }
	:global(.dashboard-content label) { display: grid; gap: 8px; margin-bottom: 20px; font-size: 13px; font-weight: 600; }
	:global(.dashboard-content input) { width: 100%; min-width: 0; min-height: 46px; padding: 10px 12px; border: 1px solid var(--dashboard-line); border-radius: 6px; background: #fff; color: #202527; font-size: 16px; font-weight: 400; }
	:global(.dashboard-auth button) { width: 100%; }
	@media (max-width: 599px) {
		.dashboard-content { padding: 24px 16px 40px; }
		.dashboard-header { padding-inline: 16px; }
		.dashboard-brand { gap: 8px; font-size: 16px; }
		.dashboard-brand span { margin-left: 4px; padding-left: 12px; }
		:global(.dashboard-content h1) { font-size: 24px; }
		:global(.dashboard-nav) { align-items: flex-start; flex-direction: column; gap: 4px; }
		:global(.dashboard-nav nav) { gap: 4px 16px; }
		:global(.dashboard-nav a) { font-size: 13px; }
		:global(.dashboard-auth form) { padding: 20px; }
	}
</style>
