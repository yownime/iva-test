"use client";

import { useState } from "react";
import { StatsCards } from "@/components/StatsCards";
import { RegistrationForm } from "@/components/RegistrationForm";
import { InteractiveMap } from "@/components/InteractiveMap";
import { DataTable } from "@/components/DataTable";
import { Leaderboard } from "@/components/Leaderboard";
import { MOCK_DATA, ResidentData } from "@/lib/constants";

export default function Dashboard() {
  const [data, setData] = useState<ResidentData[]>(MOCK_DATA);

  const handleAddData = (newData: Omit<ResidentData, "id" | "createdAt">) => {
    const entry: ResidentData = {
      ...newData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setData([entry, ...data]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const totalWUS = data.length;
  const sudahIVA = data.filter((item) => item.status === "Selesai").length;
  const belumIVA = data.filter((item) => item.status === "Belum").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Overview</h2>
          <p className="text-sm text-slate-500">Pantau cakupan screening IVA di wilayah Medan Polonia.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <StatsCards totalWUS={totalWUS} sudahIVA={sudahIVA} belumIVA={belumIVA} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Pemetaan Wilayah</h3>
            <InteractiveMap data={data} />
          </section>

          <section>
            <DataTable data={data} onDelete={handleDelete} />
          </section>
        </div>

        {/* Sidebar Area (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          <RegistrationForm onAdd={handleAddData} />
          <Leaderboard data={data} />
        </div>
      </div>
    </div>
  );
}
