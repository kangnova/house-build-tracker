"use client";

import ReportView from "@/components/ReportView";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";
import { ArrowLeft, Calendar, FileText, Printer } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type ReportType = 'ALL' | 'LABOR';
type ReportPeriod = 'WEEKLY' | 'MONTHLY';

export default function ReportPage() {
    const { transactions } = useApp();
    const [reportType, setReportType] = useState<ReportType>('ALL');
    const [periodStr, setPeriodStr] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM

    // Logic untuk filter data
    const filteredTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        const filterDate = new Date(periodStr);

        // Filter by Type
        if (reportType === 'LABOR' && t.category !== 'LABOR') return false;

        // Filter by Period (Monthly implementation for simplicity first)
        // Check Year and Month match
        return tDate.getFullYear() === filterDate.getFullYear() &&
            tDate.getMonth() === filterDate.getMonth();
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

    const reportRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: reportRef,
        documentTitle: `Laporan-${reportType}-${periodStr}`,
    });

    // Helper untuk judul periode readable
    const getPeriodLabel = () => {
        const date = new Date(periodStr);
        return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 font-sans pb-20 print:bg-white print:p-0">
            {/* Navigasi & Kontrol (Sembunyi saat Print) */}
            <div className="max-w-4xl mx-auto space-y-6 print:hidden">
                <header className="flex items-center gap-4 mb-6">
                    <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Laporan & Ekspor
                    </h1>
                </header>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Jenis Laporan</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setReportType('ALL')}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${reportType === 'ALL'
                                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400'
                                        }`}
                                >
                                    Semua Transaksi
                                </button>
                                <button
                                    onClick={() => setReportType('LABOR')}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${reportType === 'LABOR'
                                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400'
                                        }`}
                                >
                                    Hanya Upah Tukang
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Pilih Bulan</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="month"
                                    className="block w-full pl-10 pr-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={periodStr}
                                    onChange={(e) => setPeriodStr(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Printer className="w-5 h-5" />
                        Cetak Laporan / Simpan PDF
                    </button>
                </div>
            </div>

            {/* Preview Laporan */}
            <div className="mt-8">
                <ReportView
                    ref={reportRef}
                    title={reportType === 'ALL' ? 'Semua Transaksi Pembangunan' : 'Rekapitulasi Upah Tukang Mingguan'}
                    period={getPeriodLabel()}
                    transactions={filteredTransactions}
                    totalAmount={totalAmount}
                />
            </div>
        </main>
    );
}
