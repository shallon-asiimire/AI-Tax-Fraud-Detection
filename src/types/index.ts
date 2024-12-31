export interface TaxPayment {
  id: string;
  amount: number;
  date: string;
  description: string;
  dueDate: string;
}

export interface TaxCalculation {
  totalPayments: number;
  taxRate: number;
  taxDue: number;
  sentiment: string;
}