import { Budget, DailyLaborLog, Labor, Material, Transaction } from "@/types";

export const initialBudget: Budget = {
    total: 100000000,
    remaining: 100000000,
    plan_material: 60000000,
    plan_labor: 30000000,
    plan_other: 10000000,
};

export const mockMaterials: Material[] = [
    { id: '1', name: 'Bata Merah', quantity: 1000, unit: 'pcs', pricePerUnit: 800, status: 'PURCHASED' },
    { id: '2', name: 'Pasir', quantity: 1, unit: 'truck', pricePerUnit: 1500000, status: 'PURCHASED' },
    { id: '3', name: 'Semen', quantity: 10, unit: 'sak', pricePerUnit: 60000, status: 'PLANNED' },
    { id: '4', name: 'Besi 10mm', quantity: 50, unit: 'batang', pricePerUnit: 75000, status: 'PLANNED' },
];

export const mockLabor: Labor[] = [
    { id: '1', name: 'Pak Tukang 1', role: 'TUKANG', daily_wage: 150000 },
    { id: '2', name: 'Pak Tukang 2', role: 'TUKANG', daily_wage: 150000 },
    { id: '3', name: 'Pak Tukang 3', role: 'TUKANG', daily_wage: 150000 },
    { id: '4', name: 'Mas Laden 1', role: 'LADEN', daily_wage: 100000 },
    { id: '5', name: 'Mas Laden 2', role: 'LADEN', daily_wage: 100000 },
];

export const mockTransactions: Transaction[] = [
    { id: '1', date: '2023-10-25', amount: 800000, category: 'MATERIAL', description: 'Beli Bata Merah 1000pcs' },
    { id: '2', date: '2023-10-26', amount: 1500000, category: 'MATERIAL', description: 'Beli Pasir 1 Truck' },
];

export const mockLaborLogs: DailyLaborLog[] = [];
