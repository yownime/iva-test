"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { KELURAHANS, ResidentData } from "@/lib/constants";
import { Users, Calendar, Activity, TrendingUp } from "lucide-react";

interface LaporanClientProps {
  data: ResidentData[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e', '#8b5cf6'];

export function LaporanClient({ data }: LaporanClientProps) {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  // 1. Chart Data: Selesai vs Belum per Kelurahan
  const chartData = KELURAHANS.map((kel) => {
    const residentsInKel = data.filter((r) => r.kelurahan === kel.name);
    const completed = residentsInKel.filter((r) => {
      if (!r.lastTestDate) return false;
      const lastDate = new Date(r.lastTestDate);
      return lastDate >= sixMonthsAgo && lastDate <= today;
    }).length;
    
    return {
      name: kel.name,
      Selesai: completed,
      Belum: residentsInKel.length - completed,
    };
  });

  // 2. Age Distribution
  const ageGroups = [
    { name: "20-30", count: data.filter(r => r.age >= 20 && r.age <= 30).length },
    { name: "31-40", count: data.filter(r => r.age >= 31 && r.age <= 40).length },
    { name: "41-50", count: data.filter(r => r.age >= 41 && r.age <= 50).length },
    { name: "50+", count: data.filter(r => r.age > 50).length },
  ].filter(g => g.count > 0);

  // 3. Recent Activity
  const recentActivity = [...data]
    .filter(r => r.lastTestDate)
    .sort((a, b) => new Date(b.lastTestDate).getTime() - new Date(a.lastTestDate).getTime())
    .slice(0, 4);

  // 4. Executive Summary Logic
  const kelScores = chartData.map(k => ({
    name: k.name,
    score: k.Selesai / (k.Selesai + k.Belum || 1)
  })).sort((a, b) => b.score - a.score);

  const bestKel = kelScores[0]?.name || "-";
  const worstKel = kelScores[kelScores.length - 1]?.name || "-";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Laporan & Statistik</h2>
          <p className="text-sm text-slate-500">Analisis real-time cakupan screening IVA Medan Polonia.</p>
        </div>
        <div className="text-xs font-medium text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200">
          Update Terakhir: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Quick Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Users className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500">Total WUS</p>
            <p className="text-lg font-bold text-slate-900">{data.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Activity className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500">Rata-rata Usia</p>
            <p className="text-lg font-bold text-slate-900">
              {data.length > 0 ? Math.round(data.reduce((a, b) => a + b.age, 0) / data.length) : 0} Thn
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Calendar className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500">Tes Bulan Ini</p>
            <p className="text-lg font-bold text-slate-900">
              {data.filter(r => r.lastTestDate?.startsWith(new Date().toISOString().slice(0, 7))).length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><TrendingUp className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500">Persentase Total</p>
            <p className="text-lg font-bold text-slate-900">
              {Math.round((data.filter(r => {
                if (!r.lastTestDate) return false;
                const d = new Date(r.lastTestDate);
                return d >= sixMonthsAgo && d <= today;
              }).length / (data.length || 1)) * 100)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Bar Chart */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-slate-900 mb-6 flex items-center gap-2">
            Cakupan per Kelurahan
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" />
                <Bar dataKey="Selesai" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={40} />
                <Bar dataKey="Belum" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="card p-6 bg-slate-900 text-white border-none shadow-xl shadow-slate-200">
            <h3 className="text-lg font-medium mb-4 text-slate-400">Ringkasan Eksekutif</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Cakupan Tertinggi</p>
                <p className="text-xl font-black text-emerald-400">{bestKel}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Perlu Intervensi</p>
                <p className="text-xl font-black text-rose-400">{worstKel}</p>
              </div>
            </div>
          </div>

          {/* Age Pie Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4 text-center">Distribusi Usia</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageGroups}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {ageGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
              {ageGroups.map((g, i) => (
                <div key={g.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-[11px] font-bold text-slate-600">{g.name} Thn</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-medium text-slate-900">Aktivitas Screening Terbaru</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-tighter">Real-time Feed</span>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{activity.name}</p>
                  <p className="text-xs text-slate-500">{activity.kelurahan} • NIK: {activity.nik.slice(0, 4)}***</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-emerald-600">BERHASIL TEST</p>
                <p className="text-[10px] text-slate-400">
                  {new Date(activity.lastTestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>
          ))}
          {recentActivity.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">Belum ada aktivitas test terbaru.</div>
          )}
        </div>
      </div>
    </div>
  );
}
