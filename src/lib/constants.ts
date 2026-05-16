export const KELURAHANS = [
  { name: "Polonia", lat: 3.5658, lng: 98.6655 },
  { name: "Sari Rejo", lat: 3.5501, lng: 98.6732 },
  { name: "Suka Damai", lat: 3.5685, lng: 98.6780 },
  { name: "Anggrung", lat: 3.5762, lng: 98.6715 },
  { name: "Madras Hulu", lat: 3.5825, lng: 98.6695 },
] as const;

export type KelurahanName = (typeof KELURAHANS)[number]["name"];

export interface ResidentData {
  id: number;
  nik: string;
  name: string;
  age: number;
  address: string;
  kelurahan: KelurahanName;
  testCount: number;
  lastTestDate: string; // ISO Date String
  lat: number;
  lng: number;
  createdAt: string;
}

export const MOCK_DATA: ResidentData[] = [
  // Aman (Tested within last 6 months - after Nov 2025)
  { id: 1, nik: "1234567890123456", name: "Siti Aminah", age: 34, address: "Jl. Mustang No. 12", kelurahan: "Polonia", testCount: 2, lastTestDate: "2026-03-20", lat: 3.5658, lng: 98.6655, createdAt: "2024-04-20" },
  { id: 5, nik: "5678901234567890", name: "Linda Kusuma", age: 45, address: "Jl. Cik Di Tiro No. 10", kelurahan: "Madras Hulu", testCount: 1, lastTestDate: "2026-04-24", lat: 3.5825, lng: 98.6695, createdAt: "2024-04-24" },
  { id: 9, nik: "9012345678901234", name: "Yanti Melati", age: 40, address: "Jl. Suka Cerdas No. 22", kelurahan: "Suka Damai", testCount: 2, lastTestDate: "2026-05-01", lat: 3.5685, lng: 98.6780, createdAt: "2024-04-28" },
  
  // Jatuh Tempo (Tested over 6 months ago - before Nov 2025)
  { id: 4, nik: "4567890123456789", name: "Ani Wijaya", age: 38, address: "Jl. Pattimura No. 44", kelurahan: "Anggrung", testCount: 3, lastTestDate: "2025-08-15", lat: 3.5762, lng: 98.6715, createdAt: "2024-04-23" },
  { id: 8, nik: "8901234567890123", name: "Eka Rahayu", age: 35, address: "Jl. Teratai No. 15", kelurahan: "Sari Rejo", testCount: 2, lastTestDate: "2025-09-10", lat: 3.5501, lng: 98.6732, createdAt: "2024-04-27" },
  { id: 11, nik: "1122334455667788", name: "Rani Widya", age: 36, address: "Jl. KH. Wahid Hasyim No. 5", kelurahan: "Madras Hulu", testCount: 1, lastTestDate: "2025-07-30", lat: 3.5825, lng: 98.6695, createdAt: "2024-04-30" },
  { id: 13, nik: "3344556677889900", name: "Novi Arifin", age: 32, address: "Jl. Starban No. 88", kelurahan: "Polonia", testCount: 2, lastTestDate: "2025-06-12", lat: 3.5658, lng: 98.6655, createdAt: "2024-05-02" },
  { id: 15, nik: "5566778899001122", name: "Wati Setia", age: 37, address: "Jl. Suka Teguh No. 19", kelurahan: "Suka Damai", testCount: 3, lastTestDate: "2025-10-05", lat: 3.5685, lng: 98.6780, createdAt: "2024-05-04" },

  // Belum Pernah / Terjadwal
  { id: 2, nik: "2345678901234567", name: "Budi Santoso", age: 42, address: "Jl. Karya Bersama No. 5", kelurahan: "Sari Rejo", testCount: 0, lastTestDate: "", lat: 3.5501, lng: 98.6732, createdAt: "2024-04-21" },
  { id: 3, nik: "3456789012345678", name: "Dewi Lestari", age: 29, address: "Gg. Damai VI No. 8", kelurahan: "Suka Damai", testCount: 1, lastTestDate: "2026-05-20", lat: 3.5685, lng: 98.6780, createdAt: "2024-04-22" }, // Terjadwal (future date)
  { id: 7, nik: "7890123456789012", name: "Maya Putri", age: 27, address: "Jl. Mongonsidi No. 1", kelurahan: "Polonia", testCount: 0, lastTestDate: "", lat: 3.5658, lng: 98.6655, createdAt: "2024-04-26" },
  { id: 10, nik: "0123456789012345", name: "Ina Permata", age: 33, address: "Jl. Imam Bonjol No. 101", kelurahan: "Anggrung", testCount: 0, lastTestDate: "", lat: 3.5762, lng: 98.6715, createdAt: "2024-04-29" },
  { id: 14, nik: "4455667788990011", name: "Lia Rahma", age: 41, address: "Jl. Mawar No. 4", kelurahan: "Sari Rejo", testCount: 1, lastTestDate: "2026-06-03", lat: 3.5501, lng: 98.6732, createdAt: "2024-05-03" },
];
