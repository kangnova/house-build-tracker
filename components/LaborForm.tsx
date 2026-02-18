import { useEffect, useState } from "react";
import { Card, CardHeader } from "./ui/Card";
import { Loader2, UserCheck, Users } from "lucide-react";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";

export default function LaborForm({ initialData, onSuccess }: { initialData?: Transaction, onSuccess?: () => void }) {
    const { labor, addTransaction, updateTransaction } = useApp();
    const [loading, setLoading] = useState(false);
    const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

    useEffect(() => {
        if (initialData) {
            // For labor, reconstructing the selection is hard because we store "Upah Tukang (3 orang)"
            // and the total amount. We don't store WHO was present in the transaction description.
            // For MVP, if editing labor, maybe we just reset the selection? 
            // Or ideally, we should store metadata in the transaction. 
            // For now, let's just leave it empty and let user re-select, 
            // accepting that "Editing" Labor means re-doing the attendance.
        }
    }, [initialData]);

    const handleToggleWorker = (id: string) => {
        setSelectedWorkers((prev) =>
            prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedWorkers.length === 0) return;

        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const totalWage = selectedWorkers.reduce((sum, id) => {
            const worker = labor.find(w => w.id === id);
            return sum + (worker ? worker.dailyWage : 0);
        }, 0);

        const transactionData: Transaction = {
            id: initialData ? initialData.id : crypto.randomUUID(),
            date: initialData ? initialData.date : new Date().toISOString().split('T')[0],
            amount: totalWage,
            category: 'LABOR',
            description: `Upah Tukang (${selectedWorkers.length} orang)`,
        };

        if (initialData) {
            updateTransaction(transactionData);
            alert("Data presensi berhasil diperbarui!");
        } else {
            addTransaction(transactionData);
            alert("Data presensi berhasil disimpan!");
        }

        console.log("Submitted Presensi:", selectedWorkers);
        setLoading(false);
        if (!initialData) setSelectedWorkers([]);
        if (onSuccess) onSuccess();
    };

    return (
        <Card>
            <CardHeader title="Absen Tukang Harian" description="Centang tukang yang masuk hari ini" />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    {labor.map((worker) => (
                        <div
                            key={worker.id}
                            onClick={() => handleToggleWorker(worker.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedWorkers.includes(worker.id)
                                ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 dark:bg-emerald-900/20"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-300"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${selectedWorkers.includes(worker.id) ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-zinc-500'}`}>
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{worker.name}</p>
                                    <p className="text-xs text-zinc-500">{worker.role}</p>
                                </div>
                            </div>
                            {selectedWorkers.includes(worker.id) && (
                                <UserCheck className="w-5 h-5 text-emerald-600" />
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading || selectedWorkers.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <UserCheck className="w-5 h-5" />
                            Simpan Presensi ({selectedWorkers.length})
                        </>
                    )}
                </button>
            </form>
        </Card>
    );
}
