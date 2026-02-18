"use client";

import { formatCurrency } from "@/lib/data";
import { Transaction } from "@/types";
import { forwardRef } from "react";

interface ReportViewProps {
    title: string;
    period: string;
    transactions: Transaction[];
    totalAmount: number;
}

const ReportView = forwardRef<HTMLDivElement, ReportViewProps>(({ title, period, transactions, totalAmount }, ref) => {
    return (
        <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto print:max-w-none print:mx-0 print:p-0">
            {/* Header Laporan */}
            <div className="border-b-2 border-zinc-900 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-center uppercase tracking-wider text-zinc-900">
                    Laporan Pengeluaran Proyek
                </h1>
                <div className="flex justify-between mt-4 text-sm text-zinc-600">
                    <div>
                        <p><span className="font-semibold">Laporan:</span> {title}</p>
                        <p><span className="font-semibold">Periode:</span> {period}</p>
                    </div>
                    <div className="text-right">
                        <p><span className="font-semibold">Tanggal Cetak:</span> {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
                    </div>
                </div>
            </div>

            {/* Tabel Data */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-100 text-zinc-700 uppercase font-bold border-b border-zinc-300">
                        <tr>
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">Keterangan</th>
                            <th className="px-4 py-3 text-right">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500 italic">
                                    Tidak ada data transaksi pada periode ini.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-zinc-50 print:hover:bg-transparent">
                                    <td className="px-4 py-2 whitespace-nowrap">{t.date}</td>
                                    <td className="px-4 py-2">
                                        {t.category === 'MATERIAL' ? 'Material' : t.category === 'LABOR' ? 'Upah Tukang' : 'Lain-lain'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>{t.description}</div>
                                        {t.store_name && (
                                            <div className="text-xs text-zinc-500 mt-1">
                                                Toko: {t.store_name}
                                                {t.store_address && ` • ${t.store_address}`}
                                                {t.store_phone && ` • Telp: ${t.store_phone}`}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-right font-medium">
                                        {formatCurrency(t.amount)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot className="border-t-2 border-zinc-900 font-bold bg-zinc-50">
                        <tr>
                            <td colSpan={3} className="px-4 py-3 text-right uppercase">Total Pengeluaran</td>
                            <td className="px-4 py-3 text-right">{formatCurrency(totalAmount)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Tanda Tangan (Khusus Print) */}
            <div className="mt-16 hidden print:grid grid-cols-2 gap-8 text-center break-inside-avoid">
                <div>
                    <p className="mb-20">Dibuat Oleh,</p>
                    <p className="font-bold border-b border-zinc-400 inline-block min-w-[150px]"></p>
                    <p className="text-sm mt-1">Admin Proyek</p>
                </div>
                <div>
                    <p className="mb-20">Disetujui Oleh,</p>
                    <p className="font-bold border-b border-zinc-400 inline-block min-w-[150px]"></p>
                    <p className="text-sm mt-1">Pemilik / Bendahara</p>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-zinc-400 print:hidden">
                * Tampilan ini dioptimalkan untuk dicetak pada kertas A4.
            </div>
        </div>
    );
});

ReportView.displayName = "ReportView";

export default ReportView;
