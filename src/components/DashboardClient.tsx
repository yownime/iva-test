"use client";

import { useState } from "react";
import { StatsCards } from "@/components/StatsCards";
import { RegistrationForm } from "@/components/RegistrationForm";
import { InteractiveMap } from "@/components/InteractiveMap";
import { DataTable } from "@/components/DataTable";
import { Leaderboard } from "@/components/Leaderboard";
import { MOCK_DATA, ResidentData } from "@/lib/constants";
import { addResident, deleteResident, updateResidentTest, seedResidents } from "@/app/actions";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ConfirmModal";

interface DashboardClientProps {
  initialData: ResidentData[];
}

export function DashboardClient({ initialData }: DashboardClientProps) {
  const [data, setData] = useState<ResidentData[]>(initialData);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "delete" | "test" | "seed";
    id?: number;
    title: string;
    message: string;
  }>({ isOpen: false, type: "delete", title: "", message: "" });

  const handleSeed = async () => {
    const res = await seedResidents(MOCK_DATA);
    if (res.success) {
      toast.success("Data simulasi berhasil dimasukkan!");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast.error("Gagal memasukkan data simulasi.");
    }
  };

  const handleAddData = async (newData: Omit<ResidentData, "id" | "createdAt">) => {
    const res = await addResident(newData);
    if (res.success) {
      toast.success(`Berhasil menambahkan warga: ${newData.name}`);
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast.error(res.error || "Gagal menambahkan data.");
    }
  };

  const executeDelete = async (id: number) => {
    const res = await deleteResident(id);
    if (res.success) {
      setData(data.filter((item) => item.id !== id));
      toast.success("Data warga berhasil dihapus.");
    } else {
      toast.error("Gagal menghapus data.");
    }
  };

  const executeUpdateTest = async (id: number) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const resident = data.find(r => r.id === id);
    if (!resident) return;

    const newCount = resident.testCount + 1;
    const res = await updateResidentTest(id, newCount, todayStr);
    if (res.success) {
      setData(data.map((item) => 
        item.id === id 
          ? { ...item, testCount: newCount, lastTestDate: todayStr }
          : item
      ));
      toast.success(`IVA Test berhasil diperbarui untuk ${resident.name}`);
    } else {
      toast.error("Gagal memperbarui data test.");
    }
  };

  const openConfirm = (type: "delete" | "test" | "seed", id?: number, name?: string) => {
    if (type === "delete" && id) {
      setModalConfig({
        isOpen: true,
        type: "delete",
        id,
        title: "Hapus Data Warga",
        message: `Apakah Anda yakin ingin menghapus data ${name || 'warga ini'}? Tindakan ini tidak dapat dibatalkan.`
      });
    } else if (type === "test" && id) {
      setModalConfig({
        isOpen: true,
        type: "test",
        id,
        title: "Konfirmasi IVA Test",
        message: `Warga ${name} telah melakukan pemeriksaan IVA hari ini?`
      });
    } else if (type === "seed") {
      setModalConfig({
        isOpen: true,
        type: "seed",
        title: "Seed Data Simulasi",
        message: "Ingin memasukkan data simulasi ke database Neon? Ini akan menambahkan beberapa data dummy."
      });
    }
  };

  const totalWUS = data.length;
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const sudahIVA = data.filter((item) => {
    if (!item.lastTestDate) return false;
    const lastDate = new Date(item.lastTestDate);
    return lastDate >= sixMonthsAgo && lastDate <= today;
  }).length;

  const jatuhTempo = data.filter((item) => {
    if (!item.lastTestDate) return false;
    const lastDate = new Date(item.lastTestDate);
    return lastDate < sixMonthsAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Overview</h2>
          <p className="text-sm text-slate-500">Pantau cakupan screening IVA di wilayah Medan Polonia.</p>
        </div>
        <div className="flex items-center gap-3">
          {data.length === 0 && (
            <button 
              onClick={() => openConfirm("seed")}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors"
            >
              Seed Data Simulasi
            </button>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      <StatsCards totalWUS={totalWUS} sudahIVA={sudahIVA} jatuhTempo={jatuhTempo} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Pemetaan Wilayah</h3>
            <InteractiveMap data={data} />
          </section>

          <section>
            <DataTable 
              data={data} 
              onDelete={(id) => openConfirm("delete", id, data.find(r => r.id === id)?.name)} 
              onUpdateTest={(id) => openConfirm("test", id, data.find(r => r.id === id)?.name)} 
            />
          </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <RegistrationForm onAdd={handleAddData} />
          <Leaderboard data={data} />
        </div>
      </div>

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={() => {
          if (modalConfig.type === "delete" && modalConfig.id) executeDelete(modalConfig.id);
          if (modalConfig.type === "test" && modalConfig.id) executeUpdateTest(modalConfig.id);
          if (modalConfig.type === "seed") handleSeed();
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.type === "delete" ? "danger" : "success"}
        confirmText={modalConfig.type === "delete" ? "Hapus Sekarang" : "Konfirmasi"}
      />
    </div>
  );
}
