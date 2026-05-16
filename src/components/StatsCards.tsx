import { Users, CheckCircle2, AlertCircle } from "lucide-react";

interface StatsCardsProps {
  totalWUS: number;
  sudahIVA: number;
  jatuhTempo: number;
}

export function StatsCards({ totalWUS, sudahIVA, jatuhTempo }: StatsCardsProps) {
  const stats = [
    {
      label: "Total WUS",
      value: totalWUS,
      icon: Users,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
    {
      label: "Status Aman",
      value: sudahIVA,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Wajib Test Ulang",
      value: jatuhTempo,
      icon: AlertCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-5 flex items-center gap-4">
          <div className={`p-3 rounded-lg ${stat.bg}`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-semibold text-slate-900">
              {stat.value.toLocaleString()}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
