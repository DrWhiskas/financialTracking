export interface Transaction{
    id: string;
    amount: number;
    description: string;
    type: 'income' | 'expense';
    date: Date;
  }
  
  export interface FinanceState {
    balance: number;
    transactions: Transaction[];
  }