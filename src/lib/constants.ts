export const KELURAHANS = [
  { name: "Polonia", lat: 3.5658, lng: 98.6655 },
  { name: "Sari Rejo", lat: 3.5501, lng: 98.6732 },
  { name: "Suka Damai", lat: 3.5685, lng: 98.6780 },
  { name: "Anggrung", lat: 3.5762, lng: 98.6715 },
  { name: "Madras Hulu", lat: 3.5825, lng: 98.6695 },
  { name: "Jati", lat: 3.5735, lng: 98.6850 },
] as const;

export type KelurahanName = (typeof KELURAHANS)[number]["name"];

export interface ResidentData {
  id: string;
  nik: string;
  name: string;
  age: number;
  rt: string;
  rw: string;
  kelurahan: KelurahanName;
  status: "Selesai" | "Terjadwal" | "Belum";
  lat: number;
  lng: number;
  createdAt: string;
}

export const MOCK_DATA: ResidentData[] = [
  { id: "1", nik: "1234567890123456", name: "Siti Aminah", age: 34, rt: "001", rw: "002", kelurahan: "Polonia", status: "Selesai", lat: 3.5658, lng: 98.6655, createdAt: "2024-04-20" },
  { id: "2", nik: "2345678901234567", name: "Budi Santoso", age: 42, rt: "005", rw: "001", kelurahan: "Sari Rejo", status: "Belum", lat: 3.5501, lng: 98.6732, createdAt: "2024-04-21" },
  { id: "3", nik: "3456789012345678", name: "Dewi Lestari", age: 29, rt: "002", rw: "003", kelurahan: "Suka Damai", status: "Terjadwal", lat: 3.5685, lng: 98.6780, createdAt: "2024-04-22" },
  { id: "4", nik: "4567890123456789", name: "Ani Wijaya", age: 38, rt: "003", rw: "004", kelurahan: "Anggrung", status: "Selesai", lat: 3.5762, lng: 98.6715, createdAt: "2024-04-23" },
  { id: "5", nik: "5678901234567890", name: "Linda Kusuma", age: 45, rt: "001", rw: "001", kelurahan: "Madras Hulu", status: "Selesai", lat: 3.5825, lng: 98.6695, createdAt: "2024-04-24" },
  { id: "6", nik: "6789012345678901", name: "Rina Sari", age: 31, rt: "004", rw: "002", kelurahan: "Jati", status: "Belum", lat: 3.5735, lng: 98.6850, createdAt: "2024-04-25" },
  { id: "7", nik: "7890123456789012", name: "Maya Putri", age: 27, rt: "002", rw: "001", kelurahan: "Polonia", status: "Terjadwal", lat: 3.5658, lng: 98.6655, createdAt: "2024-04-26" },
  { id: "8", nik: "8901234567890123", name: "Eka Rahayu", age: 35, rt: "006", rw: "003", kelurahan: "Sari Rejo", status: "Selesai", lat: 3.5501, lng: 98.6732, createdAt: "2024-04-27" },
  { id: "9", nik: "9012345678901234", name: "Yanti Melati", age: 40, rt: "003", rw: "002", kelurahan: "Suka Damai", status: "Selesai", lat: 3.5685, lng: 98.6780, createdAt: "2024-04-28" },
  { id: "10", nik: "0123456789012345", name: "Ina Permata", age: 33, rt: "001", rw: "005", kelurahan: "Anggrung", status: "Belum", lat: 3.5762, lng: 98.6715, createdAt: "2024-04-29" },
  { id: "11", nik: "1122334455667788", name: "Rani Widya", age: 36, rt: "002", rw: "002", kelurahan: "Madras Hulu", status: "Selesai", lat: 3.5825, lng: 98.6695, createdAt: "2024-04-30" },
  { id: "12", nik: "2233445566778899", name: "Tuti Susanti", age: 39, rt: "005", rw: "001", kelurahan: "Jati", status: "Selesai", lat: 3.5735, lng: 98.6850, createdAt: "2024-05-01" },
  { id: "13", nik: "3344556677889900", name: "Novi Arifin", age: 32, rt: "004", rw: "003", kelurahan: "Polonia", status: "Selesai", lat: 3.5658, lng: 98.6655, createdAt: "2024-05-02" },
  { id: "14", nik: "4455667788990011", name: "Lia Rahma", age: 41, rt: "001", rw: "004", kelurahan: "Sari Rejo", status: "Terjadwal", lat: 3.5501, lng: 98.6732, createdAt: "2024-05-03" },
  { id: "15", nik: "5566778899001122", name: "Wati Setia", age: 37, rt: "003", rw: "001", kelurahan: "Suka Damai", status: "Selesai", lat: 3.5685, lng: 98.6780, createdAt: "2024-05-04" },
];
