"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { KELURAHANS, MOCK_DATA } from "@/lib/constants";

export default function Laporan() {
  const chartData = KELURAHANS.map((kel) => {
    const residentsInKel = MOCK_DATA.filter((r) => r.kelurahan === kel.name);
    const completed = residentsInKel.filter((r) => r.status === "Selesai").length;
    const pending = residentsInKel.filter((r) => r.status === "Belum" || r.status === "Terjadwal").length;
    return {
      name: kel.name,
      Selesai: completed,
      Belum: pending,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">Laporan & Statistik</h2>
        <p className="text-sm text-slate-500">Analisis data cakupan screening IVA tingkat kelurahan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 md:col-span-2">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Cakupan per Kelurahan</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Selesai" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Belum" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Ringkasan Eksekutif</h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <p className="text-sm font-medium text-emerald-800 mb-1">Kelurahan Terbaik</p>
              <p className="text-lg font-bold text-emerald-900">Sari Rejo</p>
              <p className="text-xs text-emerald-600 mt-1">Cakupan tertinggi bulan ini</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm font-medium text-amber-800 mb-1">Perlu Perhatian</p>
              <p className="text-lg font-bold text-amber-900">Anggrung</p>
              <p className="text-xs text-amber-600 mt-1">Target bulanan belum tercapai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
