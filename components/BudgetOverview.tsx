"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { formatCurrency, getBudgetOverview } from "@/lib/data";
import { useApp } from "@/lib/context";
import { Wallet, TrendingDown, AlertCircle } from "lucide-react";

export default function BudgetOverview() {
    const { budget, transactions } = useApp();
    const { totalBudget, totalExpenses, remaining, breakdown } = getBudgetOverview(transactions, budget.total);

    const percentUsed = (totalExpenses / totalBudget) * 100;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-emerald-500 text-white dark:bg-emerald-600 border-none">
                <div className="flex flex-col">
                    <span className="text-emerald-100 text-sm font-medium">Sisa Saldo</span>
                    <span className="text-3xl font-bold mt-1">{formatCurrency(remaining)}</span>
                    <div className="mt-4 flex items-center text-sm text-emerald-100">
                        <Wallet className="w-4 h-4 mr-2" />
                        <span>Dari total {formatCurrency(totalBudget)}</span>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex flex-col">
                    <span className="text-zinc-500 text-sm font-medium">Total Pengeluaran</span>
                    <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{formatCurrency(totalExpenses)}</span>
                    <div className="mt-4 w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800">
                        <div
                            className="bg-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(percentUsed, 100)}%` }}
                        />
                    </div>
                    <span className="text-xs text-zinc-400 mt-2">{percentUsed.toFixed(1)}% terpakai</span>
                </div>
            </Card>

            <Card>
                <CardHeader title="Rincian" className="mb-2" />
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Material</span>
                        <span className="font-semibold">{formatCurrency(breakdown.material)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Upah Tukang</span>
                        <span className="font-semibold">{formatCurrency(breakdown.labor)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Lain-lain</span>
                        <span className="font-semibold">{formatCurrency(breakdown.other)}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
