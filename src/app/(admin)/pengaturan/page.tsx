export default function Pengaturan() {
  const inputClasses = "mt-1 block w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white";
  const labelClasses = "block text-sm font-medium text-slate-700";

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">Pengaturan Sistem</h2>
        <p className="text-sm text-slate-500">Kelola preferensi akun dan parameter aplikasi.</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-medium text-slate-900">Profil Pengguna</h3>
          <p className="text-sm text-slate-500 mt-1">Informasi dasar akun Kader PKK Anda.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Nama Lengkap</label>
              <input type="text" className={inputClasses} defaultValue="Admin Kader PKK" />
            </div>
            <div>
              <label className={labelClasses}>Wilayah Tugas</label>
              <input type="text" className={inputClasses} defaultValue="Medan Polonia" disabled />
            </div>
            <div>
              <label className={labelClasses}>Email</label>
              <input type="email" className={inputClasses} defaultValue="admin@pkkpolonia.id" />
            </div>
            <div>
              <label className={labelClasses}>Nomor Telepon</label>
              <input type="text" className={inputClasses} defaultValue="081234567890" />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700">
              Simpan Profil
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-medium text-slate-900">Parameter Target</h3>
          <p className="text-sm text-slate-500 mt-1">Atur nilai target untuk indikator kinerja wilayah.</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className={labelClasses}>Target Cakupan IVA (%)</label>
            <p className="text-xs text-slate-500 mb-2">Batas minimal persentase warga yang sudah di-screening untuk status 'Aman' (Hijau).</p>
            <div className="flex items-center gap-4">
              <input type="number" className={`${inputClasses} w-32`} defaultValue={80} />
              <span className="text-slate-500">%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <input type="checkbox" id="notif" className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4" defaultChecked />
            <label htmlFor="notif" className="text-sm text-slate-700">Aktifkan notifikasi email untuk laporan bulanan otomatis</label>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700">
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
