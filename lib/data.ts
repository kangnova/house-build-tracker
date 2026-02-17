import { initialBudget, mockLabor, mockLaborLogs, mockMaterials, mockTransactions } from "./mockData";

export function getBudgetOverview() {
    const totalBudget = initialBudget.total;

    // Calculate material expenses (from transactions for now, or from material status?)
    // PRD says: "Sisa Saldo = Budget Awal - (Sum Material + Sum Upah)"
    // We should use transactions for actual expenses.

    const materialExpenses = mockTransactions
        .filter(t => t.category === 'MATERIAL')
        .reduce((sum, t) => sum + t.amount, 0);

    const laborExpenses = mockTransactions
        .filter(t => t.category === 'LABOR')
        .reduce((sum, t) => sum + t.amount, 0);

    const otherExpenses = mockTransactions
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
