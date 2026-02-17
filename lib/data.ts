import { Transaction } from "@/types";

export function getBudgetOverview(transactions: Transaction[], totalBudget: number) {
    // PRD says: "Sisa Saldo = Budget Awal - (Sum Material + Sum Upah)"

    const materialExpenses = transactions
        .filter(t => t.category === 'MATERIAL')
        .reduce((sum, t) => sum + t.amount, 0);

    const laborExpenses = transactions
        .filter(t => t.category === 'LABOR')
        .reduce((sum, t) => sum + t.amount, 0);

    const otherExpenses = transactions
        .filter(t => t.category === 'OTHER')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = materialExpenses + laborExpenses + otherExpenses;
    const remaining = totalBudget - totalExpenses;

    return {
        totalBudget,
        totalExpenses,
        remaining,
        breakdown: {
            material: materialExpenses,
            labor: laborExpenses,
            other: otherExpenses
        }
    };
}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
