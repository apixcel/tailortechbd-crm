export interface IFinancialOverview {
  capital: {
    amount: number;
    increasePct: number;
  };
  sales: {
    amount: number;
    increasePct: number;
  };
  expenses: {
    amount: number;
    increasePct: number;
  };
  profit: {
    amount: number;
    increasePct: number;
  };
}

export interface ICapitalTimelineEntry {
  credit: number;
  debit: number;
  date: string;
  balance: number;
}
