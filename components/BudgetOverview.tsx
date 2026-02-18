"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { formatCurrency, getBudgetOverview } from "@/lib/data";
import { useApp } from "@/lib/context";
import { Wallet, TrendingDown, AlertCircle } from "lucide-react";

export default function BudgetOverview() {
    const { budget, transactions } = useApp();
    const { totalBudget, totalExpenses, remaining, breakdown } = getBudgetOverview(transactions, budget.total);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader title="Ringkasan Anggaran" description="Pantau penggunaan dana pembangunan" />
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 icon-box">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 capitalize">Total Anggaran</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(totalBudget)}</p>
                        </div>

                        {/* Breakdown per components using new snake_case props */}
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                            <p className="text-xs text-zinc-500 mb-1">Material</p>
                            <p className="text-lg font-semibold">{formatCurrency(budget.plan_material)}</p>
                            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min((breakdown.material / budget.plan_material) * 100, 100)}%` }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                            <p className="text-xs text-zinc-500 mb-1">Upah Tukang</p>
                            <p className="text-lg font-semibold">{formatCurrency(budget.plan_labor)}</p>
                            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${Math.min((breakdown.labor / budget.plan_labor) * 100, 100)}%` }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                            <p className="text-xs text-zinc-500 mb-1">Lain-lain</p>
                            <p className="text-lg font-semibold">{formatCurrency(budget.plan_other)}</p>
                            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${Math.min((breakdown.other / budget.plan_other) * 100, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
