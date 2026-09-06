---
name: playwright
description: Skill untuk otomasi & testing browser dengan Microsoft Playwright (Chromium, Firefox, WebKit — satu API). Web testing and automation framework. Use when asked to "test website", "browser automation", "E2E testing", "scrape halaman", "screenshot browser", or anything Playwright-related.
license: Apache-2.0
metadata:
  author: microsoft/playwright
  version: "1.0"
---

# Playwright (Web Testing & Automation)

Sumber: https://github.com/microsoft/playwright (Apache-2.0). Instal via npm/pip — tidak perlu clone repo.

## Apa ini

Framework otomasi & testing browser dari Microsoft: kendalikan Chromium, Firefox, dan WebKit dengan satu API. Mendukung auto-wait, network interception, screenshot/video, mobile emulation, dan test runner bawaan (`@playwright/test`).

## Instalasi

```bash
# Node.js (utama)
npm init playwright@latest        # setup proyek test lengkap
# atau library saja:
npm i -D playwright && npx playwright install --with-deps chromium

# Python
pip install playwright && playwright install chromium
```

## Pemakaian cepat (Node.js)

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
```

## Pemakaian cepat (Python)

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    page.screenshot(path="screenshot.png")
    browser.close()
```

## Test runner

```bash
npx playwright test               # jalankan semua test
npx playwright test --ui          # mode UI interaktif
npx playwright codegen <url>      # rekam interaksi jadi kode test
npx playwright show-report        # lihat laporan HTML
```

## Aturan kerja

- Untuk verifikasi frontend lokal, gunakan bersama skill `webapp-testing` (sudah berbasis Playwright).
- Browser binary tersimpan di `~/.cache/ms-playwright` — instal hanya browser yang dibutuhkan (mis. `chromium` saja) agar hemat ruang.
- Dokumentasi lengkap: https://playwright.dev
