import { getResidents } from "@/app/actions";
import { DashboardClient } from "@/components/DashboardClient";
import { ResidentData } from "@/lib/constants";

export default async function DashboardPage() {
  const dbData = await getResidents();
  
  // Convert DB result to ResidentData type (handling numeric to number conversion if needed)
  const initialData: ResidentData[] = dbData.map((r) => ({
    ...r,
    kelurahan: r.kelurahan as any,
    lastTestDate: r.lastTestDate || "",
    lat: parseFloat(r.lat),
    lng: parseFloat(r.lng),
    createdAt: r.createdAt.toISOString(),
  }));

  return <DashboardClient initialData={initialData} />;
}
