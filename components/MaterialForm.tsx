"use client";

import { useState } from "react";
import { Card, CardHeader } from "./ui/Card";
import { Loader2, Plus, Box } from "lucide-react";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";
import { useEffect } from "react";

export default function MaterialForm({ initialData, onSuccess }: { initialData?: Transaction, onSuccess?: () => void }) {
    const { addTransaction, updateTransaction } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "pcs",
        price: "",
        storeName: "",
        storeAddress: "",
        storePhone: "",
    });

    useEffect(() => {
        if (initialData) {
            // ... existing parsing logic ...
            const match = initialData.description.match(/Beli (.+) \((\d+) (.+)\)/);
            if (match) {
                setFormData({
                    name: match[1],
                    quantity: match[2],
                    unit: match[3],
                    price: (initialData.amount / Number(match[2])).toString(),
                    storeName: initialData.store_name || "",
                    storeAddress: initialData.store_address || "",
                    storePhone: initialData.store_phone || "",
                });
            } else {
                setFormData({
                    name: initialData.description,
                    quantity: "1",
                    unit: "pcs",
                    price: initialData.amount.toString(),
                    storeName: initialData.store_name || "",
                    storeAddress: initialData.store_address || "",
                    storePhone: initialData.store_phone || "",
                });
            }
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const total = Number(formData.quantity) * Number(formData.price);
        const transactionData: Transaction = {
            id: initialData ? initialData.id : crypto.randomUUID(),
            date: initialData ? initialData.date : new Date().toISOString().split('T')[0],
            amount: total,
            category: 'MATERIAL',
            description: `Beli ${formData.name} (${formData.quantity} ${formData.unit})`,
            store_name: formData.storeName,
            store_address: formData.storeAddress,
            store_phone: formData.storePhone,
        };

        if (initialData) {
            updateTransaction(transactionData);
            alert("Data material berhasil diperbarui!");
        } else {
            addTransaction(transactionData);
            alert("Data material berhasil disimpan!");
        }

        setLoading(false);
        if (!initialData) {
            setFormData({ name: "", quantity: "", unit: "pcs", price: "", storeName: "", storeAddress: "", storePhone: "" });
        }
        if (onSuccess) onSuccess();
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

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Detail Toko (Untuk Audit)</h3>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nama Toko</label>
                        <input
                            type="text"
                            className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="Nama Toko Bangunan"
                            value={formData.storeName}
                            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Alamat/Lokasi</label>
                            <input
                                type="text"
                                className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Jl. Raya..."
                                value={formData.storeAddress}
                                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">No. Telepon</label>
                            <input
                                type="tel"
                                className="block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="08..."
                                value={formData.storePhone}
                                onChange={(e) => setFormData({ ...formData, storePhone: e.target.value })}
                            />
                        </div>
                    </div>
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
