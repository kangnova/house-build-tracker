import { useState, useEffect } from "react";
import { Card, CardHeader } from "./ui/Card";
import { Loader2, Plus, Box, Calculator } from "lucide-react";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";

export default function MaterialForm({ initialData, onSuccess }: { initialData?: Transaction, onSuccess?: () => void }) {
    const { addTransaction, updateTransaction } = useApp();
    const [loading, setLoading] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [calculatorTotal, setCalculatorTotal] = useState("");

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

    // Calculator Effect
    useEffect(() => {
        if (showCalculator && calculatorTotal && formData.quantity) {
            const total = parseFloat(calculatorTotal);
            const qty = parseFloat(formData.quantity);
            if (!isNaN(total) && !isNaN(qty) && qty > 0) {
                const pricePerUnit = Math.round(total / qty);
                setFormData(prev => ({ ...prev, price: pricePerUnit.toString() }));
            }
        }
    }, [calculatorTotal, formData.quantity, showCalculator]);

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
            setCalculatorTotal("");
            setShowCalculator(false);
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

                {/* Calculator Toggle */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowCalculator(!showCalculator)}
                        className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${showCalculator
                                ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300"
                                : "bg-zinc-50 border-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:border-zinc-700"
                            }`}
                    >
                        <Calculator className="w-3.5 h-3.5" />
                        {showCalculator ? "Sembunyikan Kalkulator" : "Hitung Harga Satuan dari Total"}
                    </button>
                </div>

                {/* Calculator Field */}
                {showCalculator && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800 animate-in slide-in-from-top-2 fade-in duration-200">
                        <label className="block text-sm font-medium text-indigo-900 dark:text-indigo-100 mb-1">
                            Total Harga Borongan (Semua Item)
                        </label>
                        <input
                            type="number"
                            className="block w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Contoh: 850000"
                            value={calculatorTotal}
                            onChange={(e) => setCalculatorTotal(e.target.value)}
                        />
                        <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-2">
                            *Harga Satuan akan otomatis dihitung: {calculatorTotal || '0'} / {formData.quantity || '1'} = <strong>{Math.round((parseFloat(calculatorTotal) || 0) / (parseFloat(formData.quantity) || 1)).toLocaleString()}</strong>
                        </p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Harga Satuan (Rp)</label>
                    <input
                        type="number"
                        required
                        readOnly={showCalculator}
                        className={`block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none ${showCalculator ? 'opacity-75 cursor-not-allowed' : ''}`}
                        placeholder="Contoh: 65000"
                        value={formData.price}
                        onChange={(e) => !showCalculator && setFormData({ ...formData, price: e.target.value })}
                    />
                    {showCalculator && <p className="text-xs text-zinc-500 mt-1">Dihitung otomatis dari kalkulator di atas.</p>}
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
