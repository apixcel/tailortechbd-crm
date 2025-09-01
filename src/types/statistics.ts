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
export interface IInvestmentTimelineEntry {
  date: string;
  amount: number;
}
export interface IWithdrawalTimelineEntry {
  date: string;
  amount: number;
}

export interface ICostingGroupByCategory {
  name: string;
  value: number;
  percent: number;
}

export interface ISalesTimeline {
  date: string;
  amount: number;
  orders: number;
}
