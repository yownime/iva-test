"use client";

import { useState } from "react";
import { KELURAHANS, ResidentData, KelurahanName } from "@/lib/constants";

interface RegistrationFormProps {
  onAdd: (data: Omit<ResidentData, "id" | "createdAt">) => void;
}

export function RegistrationForm({ onAdd }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    age: "",
    rt: "",
    rw: "",
    kelurahan: "" as KelurahanName | "",
    status: "Belum" as ResidentData["status"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kelurahan) return;

    const kelurahanData = KELURAHANS.find((k) => k.name === formData.kelurahan);
    if (!kelurahanData) return;

    onAdd({
      nik: formData.nik,
      name: formData.name,
      age: parseInt(formData.age),
      rt: formData.rt,
      rw: formData.rw,
      kelurahan: formData.kelurahan as KelurahanName,
      status: formData.status,
      lat: kelurahanData.lat,
      lng: kelurahanData.lng,
    });

    setFormData({
      nik: "",
      name: "",
      age: "",
      rt: "",
      rw: "",
      kelurahan: "",
      status: "Belum",
    });
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white";
  const labelClasses = "block text-sm font-medium text-slate-700";

  return (
    <div className="card p-6">
      <h3 className="text-lg font-medium text-slate-900 mb-4">Tambah Data Peserta</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClasses}>NIK (16 Digit)</label>
          <input
            required
            maxLength={16}
            type="text"
            className={inputClasses}
            value={formData.nik}
            onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
          />
        </div>

        <div>
          <label className={labelClasses}>Nama Lengkap</label>
          <input
            required
            type="text"
            className={inputClasses}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className={labelClasses}>Usia</label>
            <input
              required
              type="number"
              className={inputClasses}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClasses}>RT</label>
            <input
              required
              type="text"
              className={inputClasses}
              value={formData.rt}
              onChange={(e) => setFormData({ ...formData, rt: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClasses}>RW</label>
            <input
              required
              type="text"
              className={inputClasses}
              value={formData.rw}
              onChange={(e) => setFormData({ ...formData, rw: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Kelurahan</label>
            <select
              required
              className={inputClasses}
              value={formData.kelurahan}
              onChange={(e) => setFormData({ ...formData, kelurahan: e.target.value as KelurahanName })}
            >
              <option value="">Pilih...</option>
              {KELURAHANS.map((k) => (
                <option key={k.name} value={k.name}>{k.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Status</label>
            <select
              required
              className={inputClasses}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ResidentData["status"] })}
            >
              <option value="Belum">Belum</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  );
}
