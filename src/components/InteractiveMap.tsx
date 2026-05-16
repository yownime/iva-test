"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { ResidentData, KELURAHANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface InteractiveMapProps {
  data: ResidentData[];
}

export function InteractiveMap({ data }: InteractiveMapProps) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return (
    <div className="h-[400px] w-full bg-slate-100 rounded-xl flex items-center justify-center">
      <p className="text-sm text-slate-500">Memuat Peta...</p>
    </div>
  );

  const getMarkerIcon = (percentage: number) => {
    let color = "#ef4444"; // Red
    if (percentage >= 80) color = "#10b981"; // Green
    else if (percentage >= 50) color = "#f59e0b"; // Yellow

    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  const kelurahanStats = KELURAHANS.map((k) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const residentsInKel = data.filter((r) => r.kelurahan === k.name);
    const completed = residentsInKel.filter((r) => {
      if (!r.lastTestDate) return false;
      const lastDate = new Date(r.lastTestDate);
      return lastDate >= sixMonthsAgo && lastDate <= today;
    }).length;
    
    const total = residentsInKel.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return {
      ...k,
      total,
      completed,
      percentage,
    };
  });

  return (
    <div className="card overflow-hidden h-[400px] relative">
      <MapContainer
        center={[3.5685, 98.6732]} // Center of Medan Polonia
        zoom={14}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {kelurahanStats.map((k) => (
          <Marker key={k.name} position={[k.lat, k.lng]} icon={getMarkerIcon(k.percentage)}>
            <Popup>
              <div className="min-w-[150px]">
                <h3 className="font-medium text-slate-900 mb-1">{k.name}</h3>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-500">Cakupan</span>
                  <span className={cn(
                    "font-medium",
                    k.percentage >= 80 ? "text-emerald-600" : k.percentage >= 50 ? "text-amber-600" : "text-rose-600"
                  )}>
                    {Math.round(k.percentage)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${k.percentage}%`,
                      backgroundColor: k.percentage >= 80 ? "#10b981" : k.percentage >= 50 ? "#f59e0b" : "#ef4444"
                    }}
                  />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
