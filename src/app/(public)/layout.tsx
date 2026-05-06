import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-600">
      <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" fill="white"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">IVA-Track Polonia</h1>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Kesehatan Masyarakat</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#tentang" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Tentang Program</a>
              <a href="#statistik" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Data Publik</a>
              <Link 
                href="/dashboard" 
                className="text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full transition-colors shadow-sm"
              >
                Login Kader PKK
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">© 2024 IVA-Track Polonia. Platform Edukasi dan Monitoring Kesehatan Masyarakat.</p>
        </div>
      </footer>
    </div>
  );
}
