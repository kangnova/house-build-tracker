"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/data";
import { useApp } from "@/lib/context";
import { ArrowDownLeft, Trash2, Edit2 } from "lucide-react";
import Link from "next/link";

export default function TransactionList() {
    const { transactions: allTransactions, deleteTransaction, categories } = useApp();
    const transactions = [...allTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleDelete = (id: string) => {
        if (confirm("Yakin ingin menghapus transaksi ini?")) {
            deleteTransaction(id);
        }
    };

    const getCategoryName = (t: any) => {
        if (t.category_id) {
            const cat = categories.find(c => c.id === t.category_id);
            return cat ? cat.name : 'Lain-lain';
        }
        return t.category === 'MATERIAL' ? 'Material' : t.category === 'LABOR' ? 'Upah Tukang' : 'Lain-lain';
    };

    return (
        <Card className="mt-6">
            <CardHeader title="Riwayat Transaksi" description="Daftar pengeluaran terbaru" />
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {transactions.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500">
                        Belum ada transaksi.
                    </div>
                ) : (
                    transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                    <ArrowDownLeft className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{t.description}</p>
                                    <p className="text-xs text-zinc-500">
                                        {t.date} • {getCategoryName(t)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                                    -{formatCurrency(t.amount)}
                                </span>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <Link
                                    href={`/tambah?edit=${t.id}`}
                                    className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}
