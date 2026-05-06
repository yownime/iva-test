"use client";

import { Trophy, Medal, Award } from "lucide-react";
import { ResidentData } from "@/lib/constants";

interface LeaderboardProps {
  data: ResidentData[];
}

export function Leaderboard({ data }: LeaderboardProps) {
  // Group by RT/Kelurahan for competition
  const rtStats = data.reduce((acc, item) => {
    const key = `${item.kelurahan} - RT ${item.rt}`;
    if (!acc[key]) acc[key] = { name: key, total: 0, completed: 0 };
    acc[key].total += 1;
    if (item.status === "Selesai") acc[key].completed += 1;
    return acc;
  }, {} as Record<string, { name: string; total: number; completed: number }>);

  const sortedStats = Object.values(rtStats)
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 5);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-medium text-slate-900 mb-4">Top Cakupan RT</h3>

      <div className="space-y-4">
        {sortedStats.map((stat, index) => {
          const percentage = (stat.completed / stat.total) * 100;
          return (
            <div key={stat.name} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-6 flex justify-center text-sm font-medium text-slate-500">
                {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                {index === 1 && <Medal className="w-5 h-5 text-slate-400" />}
                {index === 2 && <Award className="w-5 h-5 text-amber-600" />}
                {index > 2 && index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-medium text-slate-900 truncate">{stat.name}</span>
                  <span className="text-xs text-slate-500">{stat.completed} / {stat.total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {sortedStats.length === 0 && (
          <div className="text-center py-6 text-sm text-slate-500">
            Belum ada data prestasi
          </div>
        )}
      </div>
    </div>
  );
}
