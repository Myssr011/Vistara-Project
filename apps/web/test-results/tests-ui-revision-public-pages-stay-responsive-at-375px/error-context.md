# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/ui-revision.spec.ts >> public pages stay responsive at 375px
- Location: tests/ui-revision.spec.ts:183:7

# Error details

```
Error: page.goto: net::ERR_ABORTED at http://localhost:3001/
Call log:
  - navigating to "http://localhost:3001/", waiting until "networkidle"

```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { loginSchema, registrationSchema } from "../src/lib/auth-validation";
  3   | 
  4   | const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3001";
  5   | test.use({ baseURL, viewport: { width: 1440, height: 1000 } });
  6   | test.setTimeout(120_000);
  7   | 
  8   | async function openPage(page: Page, path: string) {
> 9   |   const response = await page.goto(path, { waitUntil: "networkidle" });
      |                               ^ Error: page.goto: net::ERR_ABORTED at http://localhost:3001/
  10  |   expect(response?.status()).toBe(200);
  11  | }
  12  | 
  13  | async function screenshot(page: Page, name: string) {
  14  |   await page.screenshot({ path: `../../design-preview/review/${name}.png`, fullPage: true, animations: "disabled" });
  15  | }
  16  | 
  17  | test("auth schemas reject invalid phone numbers and enforce password rules", () => {
  18  |   for (const identifier of ["review@example.com", "081234567890", "+62 812-3456-7890"]) expect(loginSchema.safeParse({ identifier, password: "Review-12345", remember: false }).success).toBe(true);
  19  |   for (const identifier of ["broken-email", "0       1", "12345678", "+1234567890123456"]) expect(loginSchema.safeParse({ identifier, password: "Review-12345", remember: false }).success).toBe(false);
  20  |   expect(loginSchema.safeParse({ identifier: "review@example.com", password: "short", remember: false }).success).toBe(false);
  21  |   const registration = { name: "Pengguna Review", email: " review@example.com ", phone: "081234567890", password: "Review-12345", confirmation: "Review-12345", terms: true, accountType: "user", businessName: "", businessCategory: "" };
  22  |   expect(registrationSchema.safeParse(registration).success).toBe(true);
  23  |   expect(registrationSchema.safeParse({ ...registration, accountType: "partner" }).success).toBe(false);
  24  |   expect(registrationSchema.safeParse({ ...registration, accountType: "partner", businessName: "Studio", businessCategory: "properti" }).success).toBe(true);
  25  | });
  26  | 
  27  | test("account bar only exposes login and profile, with unified controls", async ({ page }) => {
  28  |   await openPage(page, "/masuk");
  29  |   const bar = page.locator(".account-bar");
  30  |   await expect(bar.locator(":scope > button")).toHaveCount(1);
  31  |   await expect(bar.locator(":scope > a")).toHaveCount(1);
  32  |   await expect(bar.locator(":scope > a")).toHaveAttribute("href", "/masuk");
  33  |   await expect(bar.locator("select")).toHaveCount(0);
  34  |   const trigger = page.getByRole("button", { name: "Menu profil", exact: true });
  35  |   await trigger.click();
  36  |   const menu = page.locator(".account-menu");
  37  |   await expect(menu.getByRole("group", { name: "Bahasa" })).toBeVisible();
  38  |   await menu.getByRole("button", { name: "EN", exact: true }).click();
  39  |   await expect(menu.getByRole("button", { name: "EN", exact: true })).toHaveAttribute("aria-pressed", "true");
  40  |   await menu.getByRole("button", { name: "ID", exact: true }).click();
  41  |   await menu.getByRole("switch", { name: "Tema gelap" }).check();
  42  |   await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  43  |   await screenshot(page, "profil-dark");
  44  |   await menu.getByRole("switch", { name: "Tema gelap" }).uncheck();
  45  |   await expect(menu.locator("hr")).toHaveCount(1);
  46  |   await expect(menu.getByRole("link", { name: "Masuk", exact: true })).toHaveAttribute("href", "/masuk");
  47  |   await expect(menu.getByRole("link", { name: "Daftar", exact: true })).toHaveAttribute("href", "/daftar");
  48  |   await screenshot(page, "profil-desktop");
  49  |   await menu.getByRole("button", { name: "Pengaturan Akun", exact: true }).click();
  50  |   await expect(page.getByRole("dialog")).toBeVisible();
  51  |   await page.keyboard.press("Escape");
  52  |   await expect(trigger).toBeFocused();
  53  |   await trigger.click();
  54  |   await menu.getByRole("button", { name: "Bantuan", exact: true }).click();
  55  |   await expect(page.getByRole("dialog")).toContainText("pertanyaan mengenai harga");
  56  |   await page.keyboard.press("Escape");
  57  |   await trigger.click();
  58  |   await page.keyboard.press("Escape");
  59  |   await expect(menu).toHaveCount(0);
  60  | });
  61  | 
  62  | test("login validates input, shows pending, and does not create a session", async ({ page }) => {
  63  |   await openPage(page, "/masuk");
  64  |   await screenshot(page, "masuk-desktop");
  65  |   const form = page.getByRole("form", { name: "Form masuk" });
  66  |   await form.getByRole("button", { name: "Masuk", exact: true }).click();
  67  |   await expect(form.getByText("Masukkan email atau nomor HP yang valid.")).toBeVisible();
  68  |   await expect(form.getByText("Password minimal 8 karakter.", { exact: true })).toBeVisible();
  69  |   await form.getByLabel("Email atau nomor HP", { exact: true }).fill("review@example.com");
  70  |   await form.getByLabel("Password", { exact: true }).fill("Review-12345");
  71  |   await form.getByRole("button", { name: "Tampilkan password", exact: true }).click();
  72  |   await expect(form.getByLabel("Password", { exact: true })).toHaveAttribute("type", "text");
  73  |   await form.getByLabel("Ingat saya").check();
  74  |   await form.getByRole("button", { name: "Masuk", exact: true }).click();
  75  |   await expect(form.getByRole("button", { name: "Memproses..." })).toBeDisabled();
  76  |   await expect(form.getByRole("status")).toContainText("sesi masuk belum dibuat");
  77  |   await form.getByLabel("Email atau nomor HP", { exact: true }).fill("081234567890");
  78  |   await form.getByRole("button", { name: "Masuk", exact: true }).click();
  79  |   await expect(form.getByRole("status")).toContainText("Validasi berhasil");
  80  |   await form.getByRole("button", { name: "Lupa password?" }).click();
  81  |   await expect(form.getByRole("status")).toContainText("Pemulihan password belum tersedia");
  82  |   await expect(page.locator(".account-login")).toHaveText("Masuk");
  83  | });
  84  | 
  85  | test("registration validates confirmation, terms, and conditional partner fields", async ({ page }) => {
  86  |   await openPage(page, "/daftar");
  87  |   await screenshot(page, "daftar-desktop");
  88  |   const form = page.getByRole("form", { name: "Form daftar" });
  89  |   await expect(form.getByLabel("Nama usaha", { exact: true })).toHaveCount(0);
  90  |   await form.getByLabel("Nama lengkap", { exact: true }).fill("Pengguna Review");
  91  |   await form.getByLabel("Email", { exact: true }).fill("invalid-email");
  92  |   await form.getByLabel("Nomor HP", { exact: true }).fill("081234567890");
  93  |   await form.getByLabel("Password", { exact: true }).fill("Review-12345");
  94  |   await form.getByLabel("Konfirmasi password", { exact: true }).fill("wrong-password");
  95  |   await form.getByRole("button", { name: "Daftar", exact: true }).click();
  96  |   await expect(form.getByText("Masukkan email yang valid.")).toBeVisible();
  97  |   await expect(form.getByText("Konfirmasi password harus sama.")).toBeVisible();
  98  |   await expect(form.getByText("Persetujuan Syarat & Ketentuan diperlukan.")).toBeVisible();
  99  |   await form.getByLabel("Email", { exact: true }).fill("review@example.com");
  100 |   await form.getByLabel("Konfirmasi password", { exact: true }).fill("Review-12345");
  101 |   await form.getByRole("checkbox").check();
  102 |   await form.getByRole("radio", { name: "Mitra/Partner" }).check();
  103 |   await form.getByRole("button", { name: "Daftar", exact: true }).click();
  104 |   await expect(form.getByText("Masukkan nama usaha.")).toBeVisible();
  105 |   await expect(form.getByText("Pilih kategori usaha.", { exact: true })).toBeVisible();
  106 |   await form.getByLabel("Nama usaha", { exact: true }).fill("Studio Review");
  107 |   await form.getByLabel("Kategori usaha", { exact: true }).selectOption("properti");
  108 |   await screenshot(page, "daftar-mitra-desktop");
  109 |   await form.getByRole("button", { name: "Daftar", exact: true }).click();
```