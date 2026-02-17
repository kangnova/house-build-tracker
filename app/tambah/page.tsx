"use client";

import { useState } from "react";
import MaterialForm from "@/components/MaterialForm";
import LaborForm from "@/components/LaborForm";
import { ArrowLeft, Hammer, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AddPage() {
    const [activeTab, setActiveTab] = useState<'material' | 'labor'>('material');

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 font-sans pb-20">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <header className="flex items-center gap-4 mb-6">
                    <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Tambah Data
                    </h1>
                </header>

                {/* Tabs */}
                <div className="grid grid-cols-2 p-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
                    <button
                        onClick={() => setActiveTab('material')}
                        className={cn(
                            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'material'
                                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        )}
                    >
                        <Package className="w-4 h-4" />
                        Material
                    </button>
                    <button
                        onClick={() => setActiveTab('labor')}
                        className={cn(
                            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'labor'
                                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        )}
                    >
                        <Hammer className="w-4 h-4" />
                        Tukang
                    </button>
                </div>

                {/* Content */}
                <div className="mt-6">
                    {activeTab === 'material' ? (
                        <MaterialForm />
                    ) : (
                        <LaborForm />
                    )}
                </div>
            </div>
        </main>
    );
}
