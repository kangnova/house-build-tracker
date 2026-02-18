"use client";

import { Budget, Category, Labor, Material, Transaction } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { mockMaterials } from "./mockData";
import { supabase } from "./supabase";

interface AppContextType {
    budget: Budget;
    transactions: Transaction[];
    materials: Material[];
    labor: Labor[];
    categories: Category[];
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (transaction: Transaction) => void;
    addLabor: (labor: Labor) => void;
    deleteLabor: (id: string) => void;
    updateLabor: (labor: Labor) => void;
    addCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;
    updateBudget: (budget: Budget) => void;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [budget, setBudget] = useState<Budget>({
        total: 0, remaining: 0, plan_material: 0, plan_labor: 0, plan_other: 0
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [materials, setMaterials] = useState<Material[]>(mockMaterials); // Static for now
    const [labor, setLabor] = useState<Labor[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Initial Data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: budgetData } = await supabase.from('budget').select('*').single();
                const { data: transData } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
                const { data: laborData } = await supabase.from('labor').select('*');
                const { data: catData } = await supabase.from('categories').select('*');

                if (budgetData) setBudget(budgetData);
                if (transData) setTransactions(transData);
                if (laborData) setLabor(laborData);
                if (catData) setCategories(catData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // Optional: Realtime subscription could go here
    }, []);


    const addTransaction = async (t: Transaction) => {
        // Optimistic UI update
        setTransactions((prev) => [t, ...prev]);

        const { error } = await supabase.from('transactions').insert(t);
        if (error) {
            console.error("Error adding transaction:", error);
            // Rollback if needed, but for MVP we log error
        }
    };

    const deleteTransaction = async (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
        const { error } = await supabase.from('transactions').delete().eq('id', id);
        if (error) console.error("Error deleting transaction:", error);
    };

    const updateTransaction = async (updatedT: Transaction) => {
        setTransactions((prev) => prev.map((t) => (t.id === updatedT.id ? updatedT : t)));
        const { error } = await supabase.from('transactions').update(updatedT).eq('id', updatedT.id);
        if (error) console.error("Error updating transaction:", error);
    };

    const addLabor = async (l: Labor) => {
        setLabor((prev) => [...prev, l]);
        const { error } = await supabase.from('labor').insert(l);
        if (error) console.error("Error adding labor:", error);
    };

    const deleteLabor = async (id: string) => {
        setLabor((prev) => prev.filter((l) => l.id !== id));
        const { error } = await supabase.from('labor').delete().eq('id', id);
        if (error) console.error("Error deleting labor:", error);
    };

    const updateLabor = async (updatedL: Labor) => {
        setLabor((prev) => prev.map((l) => (l.id === updatedL.id ? updatedL : l)));
        const { error } = await supabase.from('labor').update(updatedL).eq('id', updatedL.id);
        if (error) console.error("Error updating labor:", error);
    };

    const addCategory = async (c: Category) => {
        setCategories((prev) => [...prev, c]);
        const { error } = await supabase.from('categories').insert(c);
        if (error) console.error("Error adding category:", error);
    };

    const deleteCategory = async (id: string) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) console.error("Error deleting category:", error);
    };

    const updateBudget = async (newBudget: Budget) => {
        setBudget(newBudget);
        // Assuming ID 1 for single budget row as per schema seed
        const { error } = await supabase.from('budget').update(newBudget).eq('id', 1);
        if (error) {
            // If update fails (maybe row 1 doesn't exist yet?), try insert? 
            // Schema seed handles insert, but just in case:
            if (error.code === 'PGRST116') { // details vary based on error
                await supabase.from('budget').insert({ ...newBudget, id: 1 });
            }
            console.error("Error updating budget:", error);
        }
    };

    return (
        <AppContext.Provider value={{
            budget, transactions, materials, labor, categories,
            addTransaction, deleteTransaction, updateTransaction,
            addLabor, deleteLabor, updateLabor,
            addCategory, deleteCategory,
            updateBudget,
            isLoading
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
