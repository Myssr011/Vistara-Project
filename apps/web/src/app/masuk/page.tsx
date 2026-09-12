import type { Metadata } from "next";
import AuthExperience from "@/components/AuthExperience";

export const metadata: Metadata = { title: "Masuk", robots: { index: false, follow: true } };

export default function LoginPage() { return <AuthExperience mode="login" />; }