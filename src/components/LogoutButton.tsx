"use client";

import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <button className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-100 hover:bg-rose-600 hover:text-white transition-all duration-200 active:scale-95 shadow-sm">
        <LogOut className="w-5 h-5" />
        Keluar dari Sistem
      </button>
    </SignOutButton>
  );
}
