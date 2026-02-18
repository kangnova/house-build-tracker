export type PurchaseStatus = 'PLANNED' | 'PURCHASED';
export type LaborRole = 'TUKANG' | 'LADEN';

export interface Budget {
  total: number;
  remaining: number;
  plan_material: number;
  plan_labor: number;
  plan_other: number;
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

export interface Category {
  id: string;
  name: string;
  type: 'SYSTEM' | 'CUSTOM'; // SYSTEM categories (Material, Labor) cannot be deleted
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: 'MATERIAL' | 'LABOR' | 'OTHER'; // Kept for logic differentiation
  category_id?: string; // Changed to match DB column 'category_id'
  description: string;
  store_name?: string; // Changed to match DB column 'store_name'
  store_address?: string; // Changed to match DB column 'store_address'
  store_phone?: string; // Changed to match DB column 'store_phone'
}

export interface DailyLaborLog {
  id: string;
  date: string;
  laborId: string;
  status: 'PRESENT' | 'ABSENT' | 'HALF_DAY';
}
