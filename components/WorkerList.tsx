"use client";

import { useApp } from "@/lib/context";
import { formatCurrency } from "@/lib/data";
import { Labor } from "@/types";
import { Edit2, Plus, Trash2, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader } from "./ui/Card";

export default function WorkerList() {
    const { labor, addLabor, deleteLabor, updateLabor } = useApp();
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Labor>>({
        name: "",
        role: "TUKANG",
        dailyWage: 0,
    });

    const handleEdit = (worker: Labor) => {
        setIsEditing(worker.id);
        setFormData(worker);
    };

    const handleDelete = (id: string) => {
        if (confirm("Hapus data pekerja ini?")) {
            deleteLabor(id);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.dailyWage) return;

        if (isEditing) {
            updateLabor({ ...formData, id: isEditing } as Labor);
            setIsEditing(null);
        } else {
            addLabor({
                id: crypto.randomUUID(),
                name: formData.name,
                role: formData.role as "TUKANG" | "LADEN",
                dailyWage: Number(formData.dailyWage),
            });
        }
        setFormData({ name: "", role: "TUKANG", dailyWage: 0 });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({ name: "", role: "TUKANG", dailyWage: 0 });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader title={isEditing ? "Edit Pekerja" : "Tambah Pekerja Baru"} description="Kelola data tukang dan laden" />
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            className="block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Contoh: Pak Budi"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Peran</label>
                            <select
                                className="block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                            >
                                <option value="TUKANG">Tukang</option>
                                <option value="LADEN">Laden (Asisten)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Upah Harian (Rp)</label>
                            <input
                                type="number"
                                required
                                className="block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                                value={formData.dailyWage || ''}
                                onChange={(e) => setFormData({ ...formData, dailyWage: Number(e.target.value) })}
                                placeholder="150000"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 py-2.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-medium rounded-lg transition-colors"
                            >
                                Batal
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            {isEditing ? "Update Data" : "Simpan Pekerja"}
                        </button>
                    </div>
                </form>
            </Card>

            <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                    <Users className="w-5 h-5" />
                    Daftar Pekerja
                </h3>
                {labor.length === 0 ? (
                    <p className="text-zinc-500 italic">Belum ada data pekerja.</p>
                ) : (
                    labor.map((worker) => (
                        <div key={worker.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center shadow-sm">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{worker.name}</h4>
                                <p className="text-sm text-zinc-500">
                                    {worker.role === 'TUKANG' ? 'Tukang' : 'Laden'} • {formatCurrency(worker.dailyWage)}/hari
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(worker)}
                                    className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(worker.id)}
                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
