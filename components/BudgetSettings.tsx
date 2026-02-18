"use client";

import { useApp } from "@/lib/context";
import { formatCurrency } from "@/lib/data";
import { Budget } from "@/types";
import { Save, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "./ui/Card";

export default function BudgetSettings() {
    const { budget, updateBudget } = useApp();
    const [formData, setFormData] = useState<Budget>({
        total: 0,
        remaining: 0,
        plans: {
            material: 0,
            labor: 0,
            other: 0,
        }
    });

    useEffect(() => {
        setFormData(budget);
    }, [budget]);

    const handleTotalChange = (value: number) => {
        // When total changes, we might want to suggest distribution or just update total
        // For simplicity, we just update total. User manually updates plans.
        setFormData(prev => ({ ...prev, total: value }));
    };

    const handlePlanChange = (key: keyof Budget['plans'], value: number) => {
        setFormData(prev => ({
            ...prev,
            plans: {
                ...prev.plans,
                [key]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBudget(formData);
        alert("Pengaturan anggaran berhasil disimpan!");
    };

    const allocated = formData.plans.material + formData.plans.labor + formData.plans.other;
    const unallocated = formData.total - allocated;

    return (
        <Card>
            <CardHeader title="Pengaturan Anggaran" description="Atur total budget dan alokasi dana" />
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Total Anggaran Pembangunan (Rp)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-zinc-500 font-bold">Rp</span>
                        </div>
                        <input
                            type="number"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-xl font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.total || ''}
                            onChange={(e) => handleTotalChange(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Alokasi Dana (Plan)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Material</label>
                            <input
                                type="number"
                                className="block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                                value={formData.plans.material || ''}
                                onChange={(e) => handlePlanChange('material', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Upah Tukang</label>
                            <input
                                type="number"
                                className="block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                                value={formData.plans.labor || ''}
                                onChange={(e) => handlePlanChange('labor', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Lain-lain (Cadangan)</label>
                            <input
                                type="number"
                                className="block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                                value={formData.plans.other || ''}
                                onChange={(e) => handlePlanChange('other', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className={`text-sm p-3 rounded-lg ${unallocated < 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {unallocated < 0 ? (
                            <p>⚠️ Alokasi melebihi total anggaran sebesar {formatCurrency(Math.abs(unallocated))}</p>
                        ) : (
                            <p>✅ Sisa anggaran belum dialokasikan: {formatCurrency(unallocated)}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Simpan Pengaturan
                </button>
            </form>
        </Card>
    );
}
