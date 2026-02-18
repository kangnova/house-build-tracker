"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { formatCurrency, getBudgetOverview } from "@/lib/data";
import { useApp } from "@/lib/context";
import { Wallet, TrendingDown, AlertCircle } from "lucide-react";

export default function BudgetOverview() {
    const { budget, transactions } = useApp();
    const { totalBudget, totalExpenses, remaining, breakdown } = getBudgetOverview(transactions, budget.total);

    const percentUsed = (totalExpenses / totalBudget) * 100;

    const renderProgressBar = (label: string, used: number, planned: number) => {
        const percent = planned > 0 ? (used / planned) * 100 : 0;
        const isOver = used > planned;

        return (
            <div className="mb-4 last:mb-0">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
                    <div className="text-right">
                        <span className={`text-sm font-bold ${isOver ? 'text-red-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                            {formatCurrency(used)}
                        </span>
                        <span className="text-xs text-zinc-400 ml-1">
                            / {formatCurrency(planned)}
                        </span>
                    </div>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800 overflow-hidden">
                    <div
                        className={`h-2 rounded-full transition-all ${percent > 100 ? 'bg-red-500' : percent > 80 ? 'bg-yellow-500' : 'bg-emerald-500'
                            }`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                </div>
                {percent > 80 && (
                    <p className="text-[10px] mt-1 text-right text-yellow-600 dark:text-yellow-500">
                        {percent > 100 ? 'Over Budget!' : 'Mendekati limit'}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="flex flex-col relative z-10">
                    <span className="text-zinc-400 dark:text-zinc-600 text-sm font-medium">Sisa Anggaran</span>
                    <span className="text-3xl font-bold mt-1">{formatCurrency(remaining)}</span>
                    <div className="mt-4 w-full bg-white/10 rounded-full h-1.5 dark:bg-black/10">
                        <div
                            className="bg-white dark:bg-zinc-900 h-1.5 rounded-full transition-all"
                            style={{ width: `${Math.min(100 - percentUsed, 100)}%` }}
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-zinc-400 dark:text-zinc-600">
                        <div className="flex items-center">
                            <Wallet className="w-4 h-4 mr-2" />
                            <span>Total Plan: {formatCurrency(totalBudget)}</span>
                        </div>
                        <span>{percentUsed.toFixed(0)}% Terpakai</span>
                    </div>
                </div>
            </Card>

            <Card>
                <CardHeader title="Realisasi vs Rencana" className="mb-2" />
                <div className="pt-2">
                    {renderProgressBar("Material", breakdown.material, budget.plans.material)}
                    {renderProgressBar("Upah Tukang", breakdown.labor, budget.plans.labor)}
                    {renderProgressBar("Lain-lain", breakdown.other, budget.plans.other)}
                </div>
            </Card>
        </div>
    );
}
