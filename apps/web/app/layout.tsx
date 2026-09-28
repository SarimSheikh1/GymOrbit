import "./globals.css";
import type { Metadata } from "next";
import { ThemeToggle } from "./theme-toggle";
export const metadata: Metadata = { title: "GymOrbit", description: "Your whole gym, in orbit." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><ThemeToggle />{children}</body></html>; }
