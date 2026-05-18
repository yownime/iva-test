"use client";

import { useState } from "react";
import { ResidentData, KELURAHANS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search, Filter, Download, RefreshCw, Trash2 } from "lucide-react";

interface DataTableProps {
  data: ResidentData[];
  onDelete?: (id: number) => void;
  onUpdateTest?: (id: number) => void;
}

export function DataTable({ data, onDelete, onUpdateTest }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKel, setFilterKel] = useState("");

  const filteredData = data.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nik.includes(searchTerm);
    const matchesFilter = filterKel === "" || item.kelurahan === filterKel;
    return matchesSearch && matchesFilter;
  });

  const exportToCSV = () => {
    const headers = ["NIK,Nama,Usia,Alamat,Kelurahan,Test_Ke,Status,Tanggal"];
    const rows = filteredData.map((r) => 
      `${r.nik},${r.name},${r.age},${r.address},${r.kelurahan},${r.testCount},${getStatusInfo(r.lastTestDate).label},${r.createdAt}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_IVA_Polonia_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusInfo = (lastTestDate: string) => {
    if (!lastTestDate) return { label: "Belum Pernah", color: "bg-slate-100 text-slate-700" };
    
    const today = new Date();
    const lastDate = new Date(lastTestDate);
    
    if (lastDate > today) return { label: "Terjadwal", color: "bg-blue-100 text-blue-700" };
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    const isOverdue = lastDate < sixMonthsAgo;
    
    if (isOverdue) return { label: "Jatuh Tempo", color: "bg-rose-100 text-rose-700" };
    return { label: "Aman", color: "bg-emerald-100 text-emerald-700" };
  };

  const getStatusBadge = (lastTestDate: string) => {
    const { label, color } = getStatusInfo(lastTestDate);
    return (
      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", color)}>
        {label}
      </span>
    );
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-slate-900">Data Peserta</h3>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="pl-9 pr-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="py-1.5 pl-3 pr-8 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            value={filterKel}
            onChange={(e) => setFilterKel(e.target.value)}
          >
            <option value="">Semua Wilayah</option>
            {KELURAHANS.map((k) => (
              <option key={k.name} value={k.name}>{k.name}</option>
            ))}
          </select>
          
          <button
            onClick={exportToCSV}
            className="p-1.5 text-slate-500 hover:text-slate-700 border border-slate-300 rounded-md bg-white shadow-sm"
            title="Export CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">NIK / Nama</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Usia</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Wilayah</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Riwayat Test</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-4 py-3"><span className="sr-only">Aksi</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.nik}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                  {item.age}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{item.kelurahan}</div>
                  <div className="text-sm text-slate-500">{item.address}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{item.testCount}x</span>
                      <span className="text-xs text-slate-500">Pemeriksaan</span>
                    </div>
                    {item.hasilTest && (
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-fit">
                        Hasil: {item.hasilTest}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(item.lastTestDate)}
                  {item.lastTestDate && (
                    <div className="text-[10px] text-slate-400 mt-1">
                      {new Date(item.lastTestDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {onUpdateTest && (
                      <button 
                        onClick={() => onUpdateTest(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200"
                        title="Klik jika sudah test hari ini"
                      >
                        <RefreshCw className="w-3 h-3" />
                        TEST IVA
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
