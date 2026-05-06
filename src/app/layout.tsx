import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "IVA-Track Polonia",
  description: "Aplikasi monitoring deteksi dini kanker serviks (IVA Test).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased text-slate-600 bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}
