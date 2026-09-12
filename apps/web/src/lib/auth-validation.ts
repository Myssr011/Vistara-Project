import { z } from "zod";
import { KATEGORI_LAYANAN } from "./kategori-layanan";

const phone = z.string().trim().refine(value => /^\+?[0-9][0-9 ()-]*[0-9]$/.test(value) && /^[0-9]{9,15}$/.test(value.replace(/[^0-9]/g, "")), "Masukkan nomor HP yang valid.");
const password = z.string().min(8, "Password minimal 8 karakter.");

export const loginSchema = z.object({
  identifier: z.string().trim().refine(value => z.email().safeParse(value).success || phone.safeParse(value).success, "Masukkan email atau nomor HP yang valid."),
  password,
  remember: z.boolean(),
});

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Nama lengkap minimal 2 karakter."),
  email: z.string().trim().pipe(z.email("Masukkan email yang valid.")),
  phone,
  password,
  confirmation: z.string(),
  accountType: z.enum(["user", "partner"]),
  businessName: z.string().trim(),
  businessCategory: z.string(),
  terms: z.boolean().refine(value => value, "Persetujuan Syarat & Ketentuan diperlukan."),
}).superRefine((values, context) => {
  if (values.password !== values.confirmation) context.addIssue({ code: "custom", path: ["confirmation"], message: "Konfirmasi password harus sama." });
  if (values.accountType === "partner") {
    if (values.businessName.length < 2) context.addIssue({ code: "custom", path: ["businessName"], message: "Masukkan nama usaha." });
    if (!KATEGORI_LAYANAN.some(category => category.slug !== "semua" && category.slug === values.businessCategory)) context.addIssue({ code: "custom", path: ["businessCategory"], message: "Pilih kategori usaha." });
  }
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegistrationValues = z.infer<typeof registrationSchema>;