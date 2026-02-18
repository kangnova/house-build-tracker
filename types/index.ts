export type PurchaseStatus = 'PLANNED' | 'PURCHASED';
export type LaborRole = 'TUKANG' | 'LADEN';

export interface Budget {
  total: number;
  remaining: number;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  status: PurchaseStatus;
}

export interface Labor {
  id: string;
  name: string;
  role: 'TUKANG' | 'LADEN';
  dailyWage: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: 'MATERIAL' | 'LABOR' | 'OTHER';
  description: string;
}

export interface DailyLaborLog {
  id: string;
  date: string;
  laborId: string;
  isPresent: boolean;
}
