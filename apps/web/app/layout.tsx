import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "GymOrbit", description: "Your whole gym, in orbit." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
