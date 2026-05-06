"use client";

import { InteractiveMap } from "@/components/InteractiveMap";
import { MOCK_DATA } from "@/lib/constants";
import { ShieldCheck, Users, Info, HeartPulse, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const totalWUS = MOCK_DATA.length;
  const sudahIVA = MOCK_DATA.filter((item) => item.status === "Selesai").length;
  const persentase = totalWUS > 0 ? Math.round((sudahIVA / totalWUS) * 100) : 0;

  return (
    <div className="w-full bg-white">
      
      {/* 1. Hero Section (Split Layout) */}
      <section className="relative bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                <HeartPulse className="w-4 h-4" /> Program Kesehatan Nasional
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Deteksi Dini Kanker Serviks untuk <span className="text-emerald-600">Keluarga Sehat.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                Portal resmi pemantauan program Inspeksi Visual Asam Asetat (IVA) bagi warga Medan Polonia. Temukan informasi, edukasi, dan pantau cakupan kesehatan wilayah kita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#edukasi" className="inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                  Pelajari Pentingnya Tes IVA
                  <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                </a>
                <a href="#statistik" className="inline-flex justify-center items-center px-6 py-3.5 border border-slate-300 text-base font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                  Lihat Peta Wilayah
                </a>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 hidden md:block border-8 border-white z-10">
              <img 
                src="/hero_clinic.png" 
                alt="Fasilitas Puskesmas yang bersih dan modern" 
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Cakupan Wilayah</p>
                  <p className="text-xs text-slate-500">Medan Polonia, 2024</p>
                </div>
                <div className="text-2xl font-black text-emerald-600">{persentase}%</div>
              </div>
            </div>
          </div>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </section>

      {/* 2. Tentang Program Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1 border-8 border-slate-50">
              <img 
                src="/community_health.png" 
                alt="Penyuluhan kesehatan masyarakat oleh Kader PKK" 
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Tentang Program</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Bersama Kader PKK Melindungi Kesehatan Wanita</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Kanker serviks merupakan salah satu penyebab kematian tertinggi pada wanita di Indonesia. Namun, penyakit ini sebenarnya sangat bisa dicegah jika terdeteksi sejak dini (fase lesi pra-kanker).
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Melalui program edukasi dan jemput bola yang digerakkan oleh para Kader PKK Medan Polonia, kami bertujuan mencapai target 100% perlindungan bagi Wanita Usia Subur (WUS) di wilayah kita.
              </p>
              <ul className="space-y-4">
                {[
                  "Penyuluhan gratis di setiap kelurahan",
                  "Fasilitas pemeriksaan yang nyaman dan rahasia",
                  "Pemantauan rutin dan pendampingan medis"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Edukasi Section */}
      <section id="edukasi" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Mengenal Lebih Jauh Tentang Tes IVA</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Inspeksi Visual Asam Asetat (IVA) adalah metode yang mudah, cepat, dan terjangkau untuk mendeteksi dini kanker serviks. Prosesnya tidak menyakitkan dan hasilnya bisa langsung Anda ketahui.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-slate-900 mb-1">Cepat & Akurat</h4>
                  <p className="text-sm text-slate-600">Pemeriksaan hanya memakan waktu 1-2 menit. Jika ada kelainan, sel pra-kanker akan terlihat memutih.</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <Info className="w-8 h-8 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-slate-900 mb-1">Siapa yang Wajib?</h4>
                  <p className="text-sm text-slate-600">Setiap wanita yang sudah pernah melakukan kontak seksual aktif, diutamakan usia 30-50 tahun.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-xl border-8 border-white bg-slate-200">
              <img 
                src="/doctor_consultation.png" 
                alt="Konsultasi dokter yang ramah dan profesional" 
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Public Stats Overview */}
      <section id="statistik" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Transparansi Data Partisipasi</h2>
            <p className="text-lg text-slate-600">Monitoring penyebaran dan capaian screening IVA di berbagai wilayah Medan Polonia secara real-time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-slate-500 mb-2">Total WUS Terdaftar</p>
                <p className="text-5xl font-black text-slate-900">{totalWUS}</p>
              </div>
              <div className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl">
                <Users className="w-8 h-8 text-slate-600" />
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-100 rounded-full opacity-50"></div>
              <div className="relative z-10">
                <p className="text-base font-medium text-emerald-800 mb-2">Telah Melakukan Screening</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-5xl font-black text-emerald-700">{sudahIVA}</p>
                  <p className="text-lg font-bold text-emerald-600">/ {persentase}%</p>
                </div>
              </div>
              <div className="p-5 bg-white border border-emerald-100 shadow-sm rounded-2xl relative z-10">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Peta Sebaran Wilayah</h3>
                <p className="text-sm text-slate-500 mt-1">Interaksi dengan peta untuk melihat detail per kelurahan.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-xs font-bold text-slate-600">Aman</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="text-xs font-bold text-slate-600">Waspada</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span><span className="text-xs font-bold text-slate-600">Bahaya</span></div>
              </div>
            </div>
            <div className="p-2 bg-slate-100">
              {/* InteractiveMap in read-only mode */}
              <div className="pointer-events-auto rounded-xl overflow-hidden border border-slate-200">
                <InteractiveMap data={MOCK_DATA} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Pertanyaan yang Sering Diajukan</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "Apakah tes IVA sakit?", a: "Tidak. Proses pengolesan asam asetat sangat cepat dan minim rasa sakit. Hanya butuh waktu 1-2 menit." },
              { q: "Berapa biaya pemeriksaannya?", a: "Melalui program PKK atau Puskesmas, tes IVA umumnya gratis atau sangat terjangkau jika menggunakan BPJS Kesehatan." },
              { q: "Seberapa sering harus melakukan tes IVA?", a: "Jika hasilnya normal (negatif), sangat disarankan untuk mengulang pemeriksaan setiap 1 hingga 3 tahun sekali." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 6. Call to Action for Kader */}
      <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-6">Akses Area Kader PKK</h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Jika Anda adalah petugas atau Kader PKK yang bertugas mendata dan memantau program IVA di kelurahan Anda, silakan masuk ke sistem manajemen.
          </p>
          <Link href="/dashboard" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-900/50">
            Login ke Dashboard Admin
          </Link>
        </div>
      </section>
    </div>
  );
}
