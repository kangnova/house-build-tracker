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

    return (
        <AppContext.Provider value={{ budget, transactions, materials, labor, addTransaction }}>
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
