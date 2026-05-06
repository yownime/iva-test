"use client";

import { useState } from "react";
import { ResidentData, KELURAHANS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search, Filter, Download } from "lucide-react";

interface DataTableProps {
  data: ResidentData[];
  onDelete?: (id: string) => void;
}

export function DataTable({ data, onDelete }: DataTableProps) {
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
    const headers = ["NIK,Nama,Usia,RT,RW,Kelurahan,Status,Tanggal"];
    const rows = filteredData.map((r) => 
      `${r.nik},${r.name},${r.age},${r.rt},${r.rw},${r.kelurahan},${r.status},${r.createdAt}`
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

  const getStatusBadge = (status: ResidentData["status"]) => {
    const styles = {
      Selesai: "bg-emerald-100 text-emerald-700",
      Terjadwal: "bg-blue-100 text-blue-700",
      Belum: "bg-slate-100 text-slate-700",
    };
    return (
      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", styles[status])}>
        {status}
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
                  <div className="text-sm text-slate-500">RT {item.rt} / RW {item.rw}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="text-rose-600 hover:text-rose-900"
                    >
                      Hapus
                    </button>
                  )}
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
