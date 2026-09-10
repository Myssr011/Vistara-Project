"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Globe2, HelpCircle, LogOut, Menu, Moon, Settings, Sun, UserRound, X } from "lucide-react";

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
      <label className="account-language"><Globe2 size={17} aria-hidden="true" />
        <span className="sr-only">Bahasa</span>
        <select aria-label="Bahasa" value={language} onChange={event => setLanguage(event.target.value)}><option>ID</option><option>EN</option></select>
      </label>
      {!loggedIn && <button type="button" className="account-login" title="Masuk dengan akun demo" onClick={() => setLoggedIn(true)}>Masuk</button>}
      <button type="button" className="chrome-icon account-avatar" aria-label={loggedIn ? "Profil akun demo" : "Profil tamu"} title={loggedIn ? "Profil akun demo" : "Profil tamu"} onClick={() => showPanel("settings")}>
        {loggedIn ? <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop" alt="" width={36} height={36} /> : <UserRound size={21} aria-hidden="true" />}
      </button>
      <button ref={trigger} type="button" className="chrome-icon" aria-label="Menu akun" title="Menu akun" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><Menu size={22} aria-hidden="true" /></button>
      {open && <div id={menuId} className="account-menu">
        <label className="theme-control">{dark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}<span>Tema gelap</span><input type="checkbox" role="switch" checked={dark} onChange={event => setDark(event.target.checked)} /></label>
        <button type="button" onClick={() => showPanel("help")}><HelpCircle size={18} aria-hidden="true" />Bantuan</button>
        <button type="button" onClick={() => showPanel("settings")}><Settings size={18} aria-hidden="true" />Pengaturan Akun</button>
        {loggedIn && <button type="button" onClick={() => { setLoggedIn(false); setOpen(false); trigger.current?.focus(); }}><LogOut size={18} aria-hidden="true" />Keluar</button>}
      </div>}
      <dialog ref={dialog} className="chrome-dialog" aria-labelledby={`${menuId}-title`} onClose={() => trigger.current?.focus()}>
        <div className="chrome-dialog-heading"><h2 id={`${menuId}-title`}>{panel === "help" ? "Bantuan" : "Pengaturan Akun"}</h2><button type="button" className="chrome-icon" aria-label="Tutup" title="Tutup" onClick={() => dialog.current?.close()}><X aria-hidden="true" /></button></div>
        {panel === "help" ? <p>Untuk pertanyaan mengenai harga atau pemesanan, hubungi mitra yang tercantum pada tempat pilihan Anda. Konfirmasi ketersediaan dilakukan oleh mitra.</p>
          : <><p>{loggedIn ? "Anda menggunakan akun demo Vistara. Belum terhubung ke autentikasi atau data akun pribadi." : "Anda sedang menjelajah sebagai tamu."}</p><p>Bahasa pilihan: {language}. Tema: {dark ? "Gelap" : "Terang"}.</p></>}
      </dialog>
    </div>
  );
}