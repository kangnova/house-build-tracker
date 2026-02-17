"use client";

import { useState } from "react";
import { Card, CardHeader } from "./ui/Card";
import { Loader2, Plus, Box } from "lucide-react";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";

export default function MaterialForm() {
    const { addTransaction } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "pcs",
        price: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const total = Number(formData.quantity) * Number(formData.price);
        const transaction: Transaction = {
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],
            amount: total,
            category: 'MATERIAL',
            description: `Beli ${formData.name} (${formData.quantity} ${formData.unit})`,
        };

        addTransaction(transaction);

        setLoading(false);
        setFormData({ name: "", quantity: "", unit: "pcs", price: "" });
        alert("Data material berhasil disimpan!");
    };

    return (
        <Card>
            <CardHeader title="Input Material Baru" description="Catat pembelian material bangunan" />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nama Material</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Box className="h-5 w-5 text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            placeholder="Contoh: Semen Gresik"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Jumlah</label>
                        <input
                            type="number"
                            required
                            className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="0"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Satuan</label>
                        <select
                            className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        >
                            <option value="pcs">Pcs (Buah)</option>
                            <option value="sak">Sak</option>
                            <option value="kg">Kg</option>
                            <option value="batang">Batang</option>
                            <option value="meter">Meter</option>
                            <option value="kubik">Kubik (m³)</option>
                            <option value="rit">Rit/Truck</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Harga Satuan (Rp)</label>
                    <input
                        type="number"
                        required
                        className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="Contoh: 65000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            Simpan Material
                        </>
                    )}
                </button>
            </form>
        </Card>
    );
}
