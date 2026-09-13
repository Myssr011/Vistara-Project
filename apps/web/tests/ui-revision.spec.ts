import { test, expect, type Page } from "@playwright/test";
import { loginSchema, registrationSchema } from "../src/lib/auth-validation";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3001";
test.use({ baseURL, viewport: { width: 1440, height: 1000 } });
test.setTimeout(120_000);

async function openPage(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
}

async function screenshot(page: Page, name: string) {
  await page.screenshot({ path: `../../design-preview/review/${name}.png`, fullPage: true, animations: "disabled" });
}

test("auth schemas reject invalid phone numbers and enforce password rules", () => {
  for (const identifier of ["review@example.com", "081234567890", "+62 812-3456-7890"]) expect(loginSchema.safeParse({ identifier, password: "Review-12345", remember: false }).success).toBe(true);
  for (const identifier of ["broken-email", "0       1", "12345678", "+1234567890123456"]) expect(loginSchema.safeParse({ identifier, password: "Review-12345", remember: false }).success).toBe(false);
  expect(loginSchema.safeParse({ identifier: "review@example.com", password: "short", remember: false }).success).toBe(false);
  const registration = { name: "Pengguna Review", email: " review@example.com ", phone: "081234567890", password: "Review-12345", confirmation: "Review-12345", terms: true, accountType: "user", businessName: "", businessCategory: "" };
  expect(registrationSchema.safeParse(registration).success).toBe(true);
  expect(registrationSchema.safeParse({ ...registration, accountType: "partner" }).success).toBe(false);
  expect(registrationSchema.safeParse({ ...registration, accountType: "partner", businessName: "Studio", businessCategory: "properti" }).success).toBe(true);
});

test("account bar only exposes login and profile, with unified controls", async ({ page }) => {
  await openPage(page, "/masuk");
  const bar = page.locator(".account-bar");
  await expect(bar.locator(":scope > button")).toHaveCount(1);
  await expect(bar.locator(":scope > a")).toHaveCount(1);
  await expect(bar.locator(":scope > a")).toHaveAttribute("href", "/masuk");
  await expect(bar.locator("select")).toHaveCount(0);
  const trigger = page.getByRole("button", { name: "Menu profil", exact: true });
  await trigger.click();
  const menu = page.locator(".account-menu");
  await expect(menu.getByRole("group", { name: "Bahasa" })).toBeVisible();
  await menu.getByRole("button", { name: "EN", exact: true }).click();
  await expect(menu.getByRole("button", { name: "EN", exact: true })).toHaveAttribute("aria-pressed", "true");
  await menu.getByRole("button", { name: "ID", exact: true }).click();
  await menu.getByRole("switch", { name: "Tema gelap" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await screenshot(page, "profil-dark");
  await menu.getByRole("switch", { name: "Tema gelap" }).uncheck();
  await expect(menu.locator("hr")).toHaveCount(1);
  await expect(menu.getByRole("link", { name: "Masuk", exact: true })).toHaveAttribute("href", "/masuk");
  await expect(menu.getByRole("link", { name: "Daftar", exact: true })).toHaveAttribute("href", "/daftar");
  await screenshot(page, "profil-desktop");
  await menu.getByRole("button", { name: "Pengaturan Akun", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole("button", { name: "Bantuan", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("pertanyaan mengenai harga");
  await page.keyboard.press("Escape");
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
});

test("login validates input, shows pending, and does not create a session", async ({ page }) => {
  await openPage(page, "/masuk");
  await screenshot(page, "masuk-desktop");
  const form = page.getByRole("form", { name: "Form masuk" });
  await form.getByRole("button", { name: "Masuk", exact: true }).click();
  await expect(form.getByText("Masukkan email atau nomor HP yang valid.")).toBeVisible();
  await expect(form.getByText("Password minimal 8 karakter.", { exact: true })).toBeVisible();
  await form.getByLabel("Email atau nomor HP", { exact: true }).fill("review@example.com");
  await form.getByLabel("Password", { exact: true }).fill("Review-12345");
  await form.getByRole("button", { name: "Tampilkan password", exact: true }).click();
  await expect(form.getByLabel("Password", { exact: true })).toHaveAttribute("type", "text");
  await form.getByLabel("Ingat saya").check();
  await form.getByRole("button", { name: "Masuk", exact: true }).click();
  await expect(form.getByRole("button", { name: "Memproses..." })).toBeDisabled();
  await expect(form.getByRole("status")).toContainText("sesi masuk belum dibuat");
  await form.getByLabel("Email atau nomor HP", { exact: true }).fill("081234567890");
  await form.getByRole("button", { name: "Masuk", exact: true }).click();
  await expect(form.getByRole("status")).toContainText("Validasi berhasil");
  await form.getByRole("button", { name: "Lupa password?" }).click();
  await expect(form.getByRole("status")).toContainText("Pemulihan password belum tersedia");
  await expect(page.locator(".account-login")).toHaveText("Masuk");
});

test("registration validates confirmation, terms, and conditional partner fields", async ({ page }) => {
  await openPage(page, "/daftar");
  await screenshot(page, "daftar-desktop");
  const form = page.getByRole("form", { name: "Form daftar" });
  await expect(form.getByLabel("Nama usaha", { exact: true })).toHaveCount(0);
  await form.getByLabel("Nama lengkap", { exact: true }).fill("Pengguna Review");
  await form.getByLabel("Email", { exact: true }).fill("invalid-email");
  await form.getByLabel("Nomor HP", { exact: true }).fill("081234567890");
  await form.getByLabel("Password", { exact: true }).fill("Review-12345");
  await form.getByLabel("Konfirmasi password", { exact: true }).fill("wrong-password");
  await form.getByRole("button", { name: "Daftar", exact: true }).click();
  await expect(form.getByText("Masukkan email yang valid.")).toBeVisible();
  await expect(form.getByText("Konfirmasi password harus sama.")).toBeVisible();
  await expect(form.getByText("Persetujuan Syarat & Ketentuan diperlukan.")).toBeVisible();
  await form.getByLabel("Email", { exact: true }).fill("review@example.com");
  await form.getByLabel("Konfirmasi password", { exact: true }).fill("Review-12345");
  await form.getByRole("checkbox").check();
  await form.getByRole("radio", { name: "Mitra/Partner" }).check();
  await form.getByRole("button", { name: "Daftar", exact: true }).click();
  await expect(form.getByText("Masukkan nama usaha.")).toBeVisible();
  await expect(form.getByText("Pilih kategori usaha.", { exact: true })).toBeVisible();
  await form.getByLabel("Nama usaha", { exact: true }).fill("Studio Review");
  await form.getByLabel("Kategori usaha", { exact: true }).selectOption("properti");
  await screenshot(page, "daftar-mitra-desktop");
  await form.getByRole("button", { name: "Daftar", exact: true }).click();
  await expect(form.getByRole("button", { name: "Memproses..." })).toBeDisabled();
  await expect(form.getByRole("status")).toContainText("akun belum dibuat");
  await form.getByRole("radio", { name: "Pengguna", exact: true }).check();
  await expect(form.getByLabel("Nama usaha", { exact: true })).toHaveCount(0);
  await form.getByRole("button", { name: "Daftar", exact: true }).click();
  await expect(form.getByRole("status")).toContainText("Validasi berhasil");
});

test("auth links navigate without a document reload", async ({ page }) => {
  await openPage(page, "/masuk");
  await page.evaluate(() => { document.documentElement.dataset.navigationMarker = "preserved"; });
  await page.getByRole("link", { name: "Daftar di sini" }).click();
  await expect(page).toHaveURL(/\/daftar$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Buat akun Vistara");
  await expect(page.locator("html")).toHaveAttribute("data-navigation-marker", "preserved");
  await page.getByRole("link", { name: "Masuk di sini" }).click();
  await expect(page).toHaveURL(/\/masuk$/);
  await expect(page.locator("html")).toHaveAttribute("data-navigation-marker", "preserved");
});

test("top loading bar appears during a delayed route and finishes after navigation", async ({ page }) => {
  await openPage(page, "/masuk");
  let release = () => {};
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route(url => url.pathname === "/about" && url.searchParams.has("_rsc"), async route => { await gate; await route.continue(); });
  try {
    await page.getByRole("navigation", { name: "Navigasi utama" }).getByRole("link", { name: "About", exact: true }).click();
    await expect(page.locator("#nprogress .bar")).toBeVisible();
    await screenshot(page, "navigasi-loading");
  } finally { release(); }
  await expect(page).toHaveURL(/\/about$/, { timeout: 60_000 });
  await expect(page.locator("#nprogress")).toHaveCount(0, { timeout: 60_000 });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("MEDIA INDONESIA");
  await page.goBack();
  await expect(page).toHaveURL(/\/masuk$/);
  await expect(page.locator("#nprogress")).toHaveCount(0);
});

test("search query changes and repeated searches do not leave a stuck loader", async ({ page }) => {
  await openPage(page, "/cari?q=hotel");
  const search = page.getByRole("search").first();
  await search.getByRole("searchbox").fill("apartemen");
  await search.getByRole("button", { name: "Cari", exact: true }).click();
  await expect(page).toHaveURL(/q=apartemen/);
  await expect(page.locator("#nprogress")).toHaveCount(0, { timeout: 10_000 });
  await search.getByRole("button", { name: "Cari", exact: true }).click();
  await expect(page.locator("#nprogress")).toHaveCount(0, { timeout: 10_000 });
});

test("auth stays responsive with loaded imagery and reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/masuk", "/daftar"]) {
      await openPage(page, path);
      await expect(page.getByRole("complementary").getByRole("heading")).toHaveText("Vistara Media Indonesia");
      if (path === "/daftar") await page.getByRole("radio", { name: "Mitra/Partner" }).check();
      await expect.poll(() => page.locator("main img").evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const visual = await page.getByRole("complementary").boundingBox();
      const form = await page.getByRole("form").boundingBox();
      if (width < 768) expect(form!.y + form!.height).toBeLessThan(visual!.y);
      else expect(form!.x + form!.width).toBeLessThan(visual!.x);
      expect(await page.locator("main img").evaluate(image => getComputedStyle(image.parentElement!).animationName)).toBe("none");
      if (width === 375) await screenshot(page, path === "/masuk" ? "masuk-mobile" : "daftar-mitra-mobile");
    }
  }
  expect(errors).toEqual([]);
});

for (const width of [375, 1440]) {
  test(`public pages stay responsive at ${width}px`, async ({ page }) => {
    test.setTimeout(360_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    const detailPaths = new Set<string>();
    page.on("pageerror", error => errors.push(error.message));
    const paths = ["/", "/about", "/kontak", "/portofolio", "/aset", "/bidang", "/content-creator", "/hotel", "/apartemen", "/cafe-restoran", "/cari?q=hotel", "/bidang/pemasaran-properti", "/bidang/content-creator-management", "/bidang/affiliate-marketing", "/bidang/konten-kuliner"];
    for (const path of paths) {
      await openPage(page, path);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
      const links = await page.locator("main a[href]").evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute("href")!));
      for (const prefix of ["/hotel/", "/apartemen/", "/cafe-restoran/", "/content-creator/", "/artikel/", "/insight/"]) {
        const detail = links.find(href => href.startsWith(prefix));
        if (detail && ![...detailPaths].some(href => href.startsWith(prefix))) detailPaths.add(detail);
      }
      await screenshot(page, `anti-slop-${width}-${path.replace(/[^a-z0-9]+/gi, "-") || "home"}`);
    }
    for (const path of detailPaths) {
      await openPage(page, path);
      await expect(page.locator("main h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
      await screenshot(page, `anti-slop-${width}-detail-${path.split("/")[1]}`);
    }
    expect(errors).toEqual([]);
  });

  test(`dashboard pages stay responsive at ${width}px`, async ({ page }) => {
    const dashboardURL = process.env.PLAYWRIGHT_DASHBOARD_URL ?? "http://localhost:5173";
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const path of ["/", "/login", "/register", "/listings", "/listings/new", "/listings/review", "/bookings", "/admin/categories", "/admin/listings", "/admin/partners"]) {
      await openPage(page, `${dashboardURL}${path}`);
      await expect(page.locator("main h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
      if (path === "/login" || path === "/register") await expect(page.locator("main button")).toBeDisabled();
      await screenshot(page, `anti-slop-dashboard-${width}-${path.replace(/[^a-z0-9]+/gi, "-") || "home"}`);
    }
    expect(errors).toEqual([]);
  });
}