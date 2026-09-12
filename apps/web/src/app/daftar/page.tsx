import type { Metadata } from "next";
import AuthExperience from "@/components/AuthExperience";

export const metadata: Metadata = { title: "Daftar", robots: { index: false, follow: true } };

export default function RegistrationPage() { return <AuthExperience mode="register" />; }