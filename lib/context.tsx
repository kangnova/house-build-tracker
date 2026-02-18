"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Transaction, Budget, Material, Labor } from "@/types";
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [budget, setBudget] = useState<Budget>(initialBudget);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [materials, setMaterials] = useState<Material[]>(mockMaterials);
    const [labor, setLabor] = useState<Labor[]>(mockLabor);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem("transactions");
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        } else {
            setTransactions(mockTransactions); // Start with mock data if empty
        }
        setIsInitialized(true);
    }, []);

    // Save to LocalStorage whenever transactions change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        }
    }, [transactions, isInitialized]);

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

    // Load Labor from LocalStorage
    useEffect(() => {
        const savedLabor = localStorage.getItem("labor");
        if (savedLabor) {
            setLabor(JSON.parse(savedLabor));
        } else {
            setLabor(mockLabor);
        }
    }, []);

    // Save Labor to LocalStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("labor", JSON.stringify(labor));
        }
    }, [labor, isInitialized]);

    return (
        <AppContext.Provider value={{ budget, transactions, materials, labor, addTransaction, deleteTransaction, updateTransaction, addLabor, deleteLabor, updateLabor }}>
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
