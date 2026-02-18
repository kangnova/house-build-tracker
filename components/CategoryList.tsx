"use client";

import { useApp } from "@/lib/context";
import { Category } from "@/types";
import { Plus, Tag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader } from "./ui/Card";

export default function CategoryList() {
    const { categories, addCategory, deleteCategory } = useApp();
    const [newCategory, setNewCategory] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        addCategory({
            id: `cat-${crypto.randomUUID()}`,
            name: newCategory,
            type: 'CUSTOM'
        });
        setNewCategory("");
    };

    const handleDelete = (id: string) => {
        if (confirm("Hapus kategori ini?")) {
            deleteCategory(id);
        }
    };

    return (
        <Card>
            <CardHeader title="Kategori Pengeluaran" description="Kelola label kategori untuk biaya lain-lain" />

            <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nama Kategori Baru (misal: Transport)"
                    className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    disabled={!newCategory.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-300 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Tambah
                </button>
            </form>

            <div className="space-y-2">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${cat.type === 'SYSTEM' ? 'bg-zinc-100 text-zinc-500' : 'bg-emerald-100 text-emerald-600'}`}>
                                <Tag className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                {cat.name} {cat.type === 'SYSTEM' && <span className="text-xs text-zinc-400 font-normal italic">(Sistem)</span>}
                            </span>
                        </div>
                        {cat.type === 'CUSTOM' && (
                            <button
                                onClick={() => handleDelete(cat.id)}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}
