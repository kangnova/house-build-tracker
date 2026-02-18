"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/data";
import { useApp } from "@/lib/context";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TransactionList() {
    const { transactions: allTransactions } = useApp();
    const transactions = [...allTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <Card className="mt-6">
            <CardHeader title="Riwayat Transaksi" />
            <div className="space-y-4">
                {transactions.length === 0 ? (
                    <p className="text-zinc-500 text-sm">Belum ada transaksi.</p>
                ) : (
                    transactions.map((t) => (
                        <div key={t.id} className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full">
                                    <ArrowDownLeft className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{t.description}</p>
                                    <p className="text-xs text-zinc-500">{t.date} • {t.category}</p>
                                </div>
                            </div>
                            <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                                -{formatCurrency(t.amount)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}
