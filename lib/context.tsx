"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Transaction, Budget, Material, Labor, Category } from "@/types";
import { initialBudget, mockMaterials, mockLabor, mockTransactions } from "./mockData";

interface AppContextType {
    budget: Budget;
    transactions: Transaction[];
    materials: Material[];
    labor: Labor[];
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (transaction: Transaction) => void;
    addLabor: (labor: Labor) => void;
    deleteLabor: (id: string) => void;
    updateLabor: (labor: Labor) => void;
    categories: Category[];
    addCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;
    updateBudget: (budget: Budget) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [budget, setBudget] = useState<Budget>(initialBudget);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [materials, setMaterials] = useState<Material[]>(mockMaterials);
    const [labor, setLabor] = useState<Labor[]>(mockLabor);
    const [categories, setCategories] = useState<Category[]>([
        { id: 'cat-material', name: 'Material Bangunan', type: 'SYSTEM' },
        { id: 'cat-labor', name: 'Upah Tukang', type: 'SYSTEM' },
        { id: 'cat-snack', name: 'Konsumsi (Snack/Makan)', type: 'CUSTOM' },
        { id: 'cat-tools', name: 'Sewa Alat', type: 'CUSTOM' },
        { id: 'cat-other', name: 'Lain-lain', type: 'CUSTOM' },
    ]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load Data from LocalStorage on mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem("transactions");
        const savedLabor = localStorage.getItem("labor");
        const savedCategories = localStorage.getItem("categories");
        const savedBudget = localStorage.getItem("budget");

        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
        else setTransactions(mockTransactions);

        if (savedLabor) setLabor(JSON.parse(savedLabor));
        else setLabor(mockLabor);

        if (savedCategories) setCategories(JSON.parse(savedCategories));

        if (savedBudget) setBudget(JSON.parse(savedBudget));

        setIsInitialized(true);
    }, []);

    // Save Data to LocalStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("transactions", JSON.stringify(transactions));
            localStorage.setItem("labor", JSON.stringify(labor));
            localStorage.setItem("categories", JSON.stringify(categories));
            localStorage.setItem("budget", JSON.stringify(budget));
        }
    }, [transactions, labor, categories, budget, isInitialized]);

    const addTransaction = (t: Transaction) => {
        setTransactions((prev) => [t, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const updateTransaction = (updatedT: Transaction) => {
        setTransactions((prev) => prev.map((t) => (t.id === updatedT.id ? updatedT : t)));
    };

    const addLabor = (l: Labor) => {
        setLabor((prev) => [...prev, l]);
    };

    const deleteLabor = (id: string) => {
        setLabor((prev) => prev.filter((l) => l.id !== id));
    };

    const updateLabor = (updatedL: Labor) => {
        setLabor((prev) => prev.map((l) => (l.id === updatedL.id ? updatedL : l)));
    };

    const addCategory = (c: Category) => {
        setCategories((prev) => [...prev, c]);
    };

    const deleteCategory = (id: string) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    const updateBudget = (newBudget: Budget) => {
        setBudget(newBudget);
    };

    return (
        <AppContext.Provider value={{
            budget, transactions, materials, labor, categories,
            addTransaction, deleteTransaction, updateTransaction,
            addLabor, deleteLabor, updateLabor,
            addCategory, deleteCategory,
            updateBudget
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
