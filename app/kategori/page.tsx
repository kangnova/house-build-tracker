"use client";

import CategoryList from "@/components/CategoryList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 font-sans pb-20">
            <div className="max-w-md mx-auto space-y-6">
                <header className="flex items-center gap-4 mb-6">
                    <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Kelola Kategori
                    </h1>
                </header>

                <CategoryList />
            </div>
        </main>
    );
}
