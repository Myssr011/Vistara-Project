"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Globe2, HelpCircle, LogIn, LogOut, Moon, Settings, Sun, UserPlus, UserRound, X } from "lucide-react";

export default function AccountBar() {
  const [language, setLanguage] = useState("ID");
  const [loggedIn, setLoggedIn] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<"help" | "settings">("settings");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuId = useId();

  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function showPanel(next: "help" | "settings") {
    setPanel(next);
    setOpen(false);
    dialog.current?.showModal();
  }

  return (
    <div className="account-bar" ref={root} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      {!loggedIn && <Link href="/masuk" className="account-login">Masuk</Link>}
      <button ref={trigger} type="button" className="chrome-icon account-avatar" aria-label="Menu profil" title="Menu profil" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}>
        {loggedIn ? <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop" alt="" width={36} height={36} /> : <UserRound size={21} aria-hidden="true" />}
      </button>
      {open && <div id={menuId} className="account-menu" aria-label="Pilihan profil">
        <div className="account-language"><Globe2 size={18} aria-hidden="true" /><span>Bahasa</span>
          <div className="account-language-options" role="group" aria-label="Bahasa">
            {["ID", "EN"].map(option => <button key={option} type="button" aria-pressed={language === option} onClick={() => setLanguage(option)}>{option}</button>)}
          </div>
        </div>
        <label className="theme-control">{dark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}<span>Tema gelap</span><input type="checkbox" role="switch" checked={dark} onChange={event => setDark(event.target.checked)} /></label>
        <button type="button" onClick={() => showPanel("help")}><HelpCircle size={18} aria-hidden="true" />Bantuan</button>
        <button type="button" onClick={() => showPanel("settings")}><Settings size={18} aria-hidden="true" />Pengaturan Akun</button>
        <hr className="account-divider" />
        {loggedIn ? <button type="button" onClick={() => { setLoggedIn(false); setOpen(false); trigger.current?.focus(); }}><LogOut size={18} aria-hidden="true" />Keluar</button>
          : <><Link href="/masuk" onClick={() => setOpen(false)}><LogIn size={18} aria-hidden="true" />Masuk</Link><Link href="/daftar" onClick={() => setOpen(false)}><UserPlus size={18} aria-hidden="true" />Daftar</Link></>}
      </div>}
      <dialog ref={dialog} className="chrome-dialog" aria-labelledby={`${menuId}-title`} onClose={() => trigger.current?.focus()}>
        <div className="chrome-dialog-heading"><h2 id={`${menuId}-title`}>{panel === "help" ? "Bantuan" : "Pengaturan Akun"}</h2><button type="button" className="chrome-icon" aria-label="Tutup" title="Tutup" onClick={() => dialog.current?.close()}><X aria-hidden="true" /></button></div>
        {panel === "help" ? <p>Untuk pertanyaan mengenai harga atau pemesanan, hubungi mitra yang tercantum pada tempat pilihan Anda. Konfirmasi ketersediaan dilakukan oleh mitra.</p>
          : <><p>{loggedIn ? "Anda menggunakan akun demo Vistara. Belum terhubung ke autentikasi atau data akun pribadi." : "Anda sedang menjelajah sebagai tamu."}</p><p>Bahasa pilihan: {language}. Tema: {dark ? "Gelap" : "Terang"}.</p></>}
      </dialog>
    </div>
  );
}