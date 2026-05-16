import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Selamat Datang Kembali</h1>
          <p className="text-slate-500 mt-1">Silakan masuk ke akun Kader PKK Anda</p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700 text-sm normal-case",
              card: "shadow-xl border border-slate-200 rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 text-slate-600 font-medium",
              footerActionLink: "text-emerald-600 hover:text-emerald-700 font-bold"
            }
          }}
        />
      </div>
    </div>
  );
}
