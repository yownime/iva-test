"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Laporan", href: "/laporan" },
    { name: "Pengaturan", href: "/pengaturan" },
  ];

  return (
    <nav className="hidden md:flex gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium px-1 py-5 border-b-2 ${
              isActive
                ? "text-emerald-600 border-emerald-600"
                : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
