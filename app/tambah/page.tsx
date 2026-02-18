"use client";

import { Suspense, useEffect, useState } from "react";
import MaterialForm from "@/components/MaterialForm";
import LaborForm from "@/components/LaborForm";
import OtherForm from "@/components/OtherForm";
import { ArrowLeft, Hammer, Package, Receipt } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { Transaction } from "@/types";

function AddPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { transactions } = useApp();
    const editId = searchParams.get('edit');

    const [activeTab, setActiveTab] = useState<'material' | 'labor' | 'other'>('material');
    const [editData, setEditData] = useState<Transaction | undefined>(undefined);

    useEffect(() => {
        if (editId) {
            const transaction = transactions.find(t => t.id === editId);
            if (transaction) {
                setEditData(transaction);
                if (transaction.category === 'MATERIAL') setActiveTab('material');
                else if (transaction.category === 'LABOR') setActiveTab('labor');
                else setActiveTab('other');
            }
        } else {
            setEditData(undefined);
        }
    }, [editId, transactions]);

    const handleSuccess = () => {
        if (editId) {
            router.push('/');
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 font-sans pb-20">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <header className="flex items-center gap-4 mb-6">
                    <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {editId ? 'Edit Data' : 'Tambah Data'}
                    </h1>
                </header>

                {/* Tabs */}
                <div className="grid grid-cols-3 p-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
                    <button
                        onClick={() => setActiveTab('material')}
                        disabled={!!editId}
                        className={cn(
                            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'material'
                                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                            !!editId && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Package className="w-4 h-4" />
                        Material
                    </button>
                    <button
                        onClick={() => setActiveTab('labor')}
                        disabled={!!editId}
                        className={cn(
                            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'labor'
                                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                            !!editId && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Hammer className="w-4 h-4" />
                        Tukang
                    </button>
                    <button
                        onClick={() => setActiveTab('other')}
                        disabled={!!editId}
                        className={cn(
                            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'other'
                                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                            !!editId && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Receipt className="w-4 h-4" />
                        Lain-lain
                    </button>
                </div>

                {/* Content */}
                <div className="mt-6">
                    {activeTab === 'material' ? (
                        <MaterialForm initialData={editData} onSuccess={handleSuccess} />
                    ) : activeTab === 'labor' ? (
                        <LaborForm initialData={editData} onSuccess={handleSuccess} />
                    ) : (
                        <OtherForm initialData={editData} onSuccess={handleSuccess} />
                    )}
                </div>
            </div>
        </main>
    );
}

export default function AddPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddPageContent />
        </Suspense>
    );
}
