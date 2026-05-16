import { getResidents } from "@/app/actions";
import { LaporanClient } from "./LaporanClient";
import { ResidentData } from "@/lib/constants";

export default async function Laporan() {
  const dbData = await getResidents();
  
  const residents: ResidentData[] = dbData.map((r) => ({
    ...r,
    kelurahan: r.kelurahan as any,
    lastTestDate: r.lastTestDate || "",
    lat: parseFloat(r.lat),
    lng: parseFloat(r.lng),
    createdAt: r.createdAt.toISOString(),
  }));

  return <LaporanClient data={residents} />;
}
