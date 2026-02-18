"use client";

import { useState } from "react";
import { Card, CardHeader } from "./ui/Card";
import { Loader2, Plus, Receipt } from "lucide-react";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";

export default function OtherForm() {
    const { addTransaction } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const transaction: Transaction = {
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],
            amount: Number(formData.amount),
            category: 'OTHER',
            description: formData.description,
        };

        addTransaction(transaction);

        setLoading(false);
        setFormData({ description: "", amount: "" });
        alert("Biaya lain-lain berhasil disimpan!");
    };

    return (
        <Card>
            <CardHeader title="Biaya Lain-lain" description="Catat pengeluaran di luar material & tukang (Snack, Alat, dll)" />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Keterangan Pengeluaran</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Receipt className="h-5 w-5 text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            placeholder="Contoh: Beli Gorengan, Sewa Molen"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Total Biaya (Rp)</label>
                    <input
                        type="number"
                        required
                        className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="Contoh: 50000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            Simpan Pengeluaran
                        </>
                    )}
                </button>
            </form>
        </Card>
    );
}
