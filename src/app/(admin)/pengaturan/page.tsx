import { currentUser } from "@clerk/nextjs/server";
import { User, Shield, Target, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default async function Pengaturan() {
  const user = await currentUser();
  const inputClasses = "mt-1 block w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white transition-all";
  const labelClasses = "block text-sm font-bold text-slate-700 mb-1";

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div>
        <h2 className="text-3xl font-black text-slate-900 leading-tight">Pengaturan</h2>
        <p className="text-slate-500">Kelola identitas akun dan preferensi aplikasi Anda.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profil Section */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Profil Petugas</h3>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50 shadow-md" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <User className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div>
                  <label className={labelClasses}>Nama Lengkap</label>
                  <input type="text" className={inputClasses} defaultValue={user?.fullName || ""} readOnly />
                </div>
                <div>
                  <label className={labelClasses}>Wilayah Tugas</label>
                  <input type="text" className={inputClasses} defaultValue="Medan Polonia" disabled />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Email Utama</label>
                  <input type="email" className={inputClasses} defaultValue={user?.emailAddresses[0]?.emailAddress || ""} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Parameter Target & Notifikasi</h3>
          </div>
          <div className="p-8 space-y-8">
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <label className={labelClasses}>Target Cakupan IVA (%)</label>
                  <p className="text-xs text-slate-500">Batas minimal persentase warga yang sudah di-screening untuk status 'Aman'.</p>
                </div>
                <span className="text-2xl font-black text-emerald-600">80%</span>
              </div>
              <input type="range" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" defaultValue={80} />
            </div>
            
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Bell className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Laporan Bulanan Otomatis</p>
                    <p className="text-xs text-slate-500">Kirim ringkasan statistik ke email setiap awal bulan.</p>
                  </div>
                </div>
                <input type="checkbox" className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-emerald-500 relative transition-all cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 before:transition-all checked:before:left-5 shadow-inner" defaultChecked />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="card overflow-hidden border-rose-100">
          <div className="p-6 border-b border-rose-50 bg-rose-50/30 flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Keamanan & Sesi</h3>
          </div>
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-sm font-bold text-slate-900">Keluar dari Akun</p>
              <p className="text-xs text-slate-500">Pastikan Anda telah menyimpan semua perubahan sebelum keluar.</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
