"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type InputHTMLAttributes } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, Eye, EyeOff, LoaderCircle, UserRound, X } from "lucide-react";
import { loginSchema, registrationSchema, type LoginValues, type RegistrationValues } from "@/lib/auth-validation";
import { KATEGORI_LAYANAN } from "@/lib/kategori-layanan";
import styles from "./AuthExperience.module.css";

const fieldMotion = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .28 } } };
const formMotion = { hidden: {}, visible: { transition: { staggerChildren: .035 } } };

function Field({ label, error, id, type = "text", ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; id: string }) {
  const [visible, setVisible] = useState(false);
  const secret = type === "password";
  return <motion.div className={styles.field} variants={fieldMotion}>
    <label htmlFor={id}>{label}</label>
    <div className={styles.inputWrap}>
      <input {...props} id={id} type={secret && visible ? "text" : type} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
      {secret && <button className={styles.reveal} type="button" aria-label={`${visible ? "Sembunyikan" : "Tampilkan"} ${label.toLowerCase()}`} title={`${visible ? "Sembunyikan" : "Tampilkan"} ${label.toLowerCase()}`} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
    </div>
    {error && <p className={styles.error} id={`${id}-error`}>{error}</p>}
  </motion.div>;
}

function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return <motion.button className={styles.submit} type="submit" disabled={pending} whileHover={{ scale: 1.012 }} whileTap={{ scale: .985 }} variants={fieldMotion}>
    {pending ? <><LoaderCircle size={19} className={styles.spinner} aria-hidden="true" />Memproses...</> : <>{children}<ArrowRight size={18} aria-hidden="true" /></>}
  </motion.button>;
}

function LoginForm() {
  const [notice, setNotice] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { identifier: "", password: "", remember: false } });
  async function submit() {
    setNotice("");
    await new Promise(resolve => setTimeout(resolve, 650));
    setNotice("Validasi berhasil. Ini masih pratinjau: sesi masuk belum dibuat dan pilihan Ingat saya belum disimpan.");
  }
  return <motion.form noValidate onSubmit={handleSubmit(submit)} initial="hidden" animate="visible" variants={formMotion} aria-label="Form masuk" aria-busy={isSubmitting}>
    <fieldset disabled={isSubmitting} className={styles.fields}>
      <Field id="identifier" label="Email atau nomor HP" autoComplete="username" placeholder="nama@email.com atau 08..." {...register("identifier")} error={errors.identifier?.message} />
      <Field id="password" label="Password" type="password" autoComplete="current-password" placeholder="Minimal 8 karakter" {...register("password")} error={errors.password?.message} />
      <motion.div className={styles.formOptions} variants={fieldMotion}>
        <label className={styles.checkbox}><input type="checkbox" {...register("remember")} />Ingat saya</label>
        <button type="button" className={styles.textLink} onClick={() => setNotice("Pemulihan password belum tersedia.")}>Lupa password?</button>
      </motion.div>
      <SubmitButton pending={isSubmitting}>Masuk</SubmitButton>
    </fieldset>
    <p className={styles.feedback} role="status">{notice && <><CheckCircle2 size={18} aria-hidden="true" /><span>{notice}</span></>}</p>
  </motion.form>;
}

function RegistrationForm() {
  const [notice, setNotice] = useState("");
  const termsDialog = useRef<HTMLDialogElement>(null);
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmation: "", accountType: "user", businessName: "", businessCategory: "", terms: false },
  });
  const accountType = useWatch({ control, name: "accountType" });
  async function submit() {
    setNotice("");
    await new Promise(resolve => setTimeout(resolve, 650));
    setNotice("Validasi berhasil. Ini masih pratinjau: akun belum dibuat dan data belum dikirim.");
  }
  return <motion.form noValidate onSubmit={handleSubmit(submit)} initial="hidden" animate="visible" variants={formMotion} aria-label="Form daftar" aria-busy={isSubmitting}>
    <fieldset disabled={isSubmitting} className={styles.fields}>
      <motion.fieldset className={styles.accountTypes} variants={fieldMotion}>
        <legend>Tipe akun</legend>
        <div>{[{ value: "user", label: "Pengguna", Icon: UserRound }, { value: "partner", label: "Mitra/Partner", Icon: Building2 }].map(({ value, label, Icon }) => <label key={value}><input type="radio" value={value} {...register("accountType")} /><span><Icon size={18} aria-hidden="true" />{label}</span></label>)}</div>
      </motion.fieldset>
      <Field id="name" label="Nama lengkap" autoComplete="name" placeholder="Nama lengkap Anda" {...register("name")} error={errors.name?.message} />
      <div className={styles.pair}>
        <Field id="email" label="Email" type="email" autoComplete="email" placeholder="nama@email.com" {...register("email")} error={errors.email?.message} />
        <Field id="phone" label="Nomor HP" type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" {...register("phone")} error={errors.phone?.message} />
      </div>
      <AnimatePresence initial={false}>
        {accountType === "partner" && <motion.div className={styles.businessFields} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .18 }}>
          <Field id="businessName" label="Nama usaha" autoComplete="organization" placeholder="Nama usaha atau brand" {...register("businessName")} error={errors.businessName?.message} />
          <div className={styles.field}><label htmlFor="businessCategory">Kategori usaha</label><select id="businessCategory" {...register("businessCategory")} aria-invalid={!!errors.businessCategory} aria-describedby={errors.businessCategory ? "businessCategory-error" : undefined}><option value="">Pilih kategori usaha</option>{KATEGORI_LAYANAN.filter(category => category.slug !== "semua").map(category => <option key={category.slug} value={category.slug}>{category.nama}</option>)}</select>{errors.businessCategory && <p id="businessCategory-error" className={styles.error}>{errors.businessCategory.message}</p>}</div>
        </motion.div>}
      </AnimatePresence>
      <div className={styles.pair}>
        <Field id="password" label="Password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" {...register("password")} error={errors.password?.message} />
        <Field id="confirmation" label="Konfirmasi password" type="password" autoComplete="new-password" placeholder="Ulangi password" {...register("confirmation")} error={errors.confirmation?.message} />
      </div>
      <motion.div className={styles.terms} variants={fieldMotion}>
        <div><input id="terms" type="checkbox" {...register("terms")} aria-invalid={!!errors.terms} aria-describedby={errors.terms ? "terms-error" : undefined} /><label htmlFor="terms">Saya setuju dengan Syarat &amp; Ketentuan</label><button type="button" className={styles.termsLink} title="Baca Syarat & Ketentuan" aria-label="Baca Syarat & Ketentuan" onClick={() => termsDialog.current?.showModal()}><ArrowUpRight size={18} /></button></div>
        {errors.terms && <p id="terms-error" className={styles.error}>{errors.terms.message}</p>}
      </motion.div>
      <SubmitButton pending={isSubmitting}>Daftar</SubmitButton>
    </fieldset>
    <p className={styles.feedback} role="status">{notice && <><CheckCircle2 size={18} aria-hidden="true" /><span>{notice}</span></>}</p>
    <dialog ref={termsDialog} className="chrome-dialog" aria-labelledby="terms-title"><div className="chrome-dialog-heading"><h2 id="terms-title">Syarat &amp; Ketentuan</h2><button type="button" className="chrome-icon" title="Tutup" aria-label="Tutup" onClick={() => termsDialog.current?.close()}><X /></button></div><p>Dokumen Syarat &amp; Ketentuan resmi belum tersedia. Form ini hanya pratinjau dan tidak membuat akun atau mencatat persetujuan hukum.</p></dialog>
  </motion.form>;
}

export default function AuthExperience({ mode }: { mode: "login" | "register" }) {
  const reducedMotion = useReducedMotion();
  const signup = mode === "register";
  return <MotionConfig reducedMotion="user"><main id="main-content" className={styles.page} data-auth-mode={mode}>
    <section className={styles.formSide} aria-labelledby="auth-title">
      <motion.div className={styles.formInner} initial={{ opacity: 0, x: reducedMotion ? 0 : signup ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .3, ease: "easeOut" }}>
        <Link href="/" className={styles.wordmark}>VISTARA<span>MEDIA INDONESIA</span></Link>
        <header className={styles.heading}><h1 id="auth-title">{signup ? "Buat akun Vistara" : "Masuk ke Vistara"}</h1><p>{signup ? "Pendaftaran belum tersedia. Formulir ini masih berupa pratinjau." : "Login belum tersedia. Formulir ini masih berupa pratinjau."}</p></header>
        {signup ? <RegistrationForm /> : <LoginForm />}
        <p className={styles.switchPage}>{signup ? "Sudah punya akun?" : "Belum punya akun?"} <Link href={signup ? "/masuk" : "/daftar"}>{signup ? "Masuk di sini" : "Daftar di sini"}<ArrowRight size={15} aria-hidden="true" /></Link></p>
      </motion.div>
    </section>
    <aside className={styles.visual} aria-label="Vistara: kreatif dan properti">
      <div className={styles.photo}><Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop" alt="Arsitektur gedung kaca menjulang ke langit" fill priority sizes="(max-width: 767px) 100vw, 40vw" /></div>
      <div className={styles.tint} />
      <div className={styles.visualCopy}><h2>Vistara Media Indonesia</h2><p>Pemasaran properti dan produksi konten.</p></div>
    </aside>
  </main></MotionConfig>;
}