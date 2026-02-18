import BudgetOverview from "@/components/BudgetOverview";
import TransactionList from "@/components/TransactionList";
import { Hammer, LayoutGrid, Settings, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 font-sans pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg text-white">
              <Hammer className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Bangun Rumah
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/pengaturan" className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-300 transition-colors">
              <Settings className="w-5 h-5 text-zinc-600" />
            </Link>
          </div>
        </header>

        <div className="flex justify-end gap-2 mb-4">
          <Link href="/kategori" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 bg-zinc-100 px-3 py-1.5 rounded-lg">
            <LayoutGrid className="w-4 h-4" />
            Kategori
          </Link>
          <Link href="/pekerja" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg">
            <Users className="w-4 h-4" />
            Pekerja
          </Link>
        </div>

        {/* Dashboard Modules */}
        <BudgetOverview />

        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Aktivitas Terkini</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Lihat Semua</button>
          </div>
          <TransactionList />
        </section>

        {/* Floating Action Button */}
        <Link href="/tambah" className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center">
          <Hammer className="w-6 h-6" />
        </Link>
      </div>
    </main>
  );
}
