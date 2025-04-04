const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface DashboardData {
  level: number;
  progress: number;
  streak: number;
  saved: number;
  dailyGoal: {
    target: number;
    current: number;
  };
  transactions: Array<{
    type: 'expense' | 'savings';
    amount: number;
    category: string;
    date: string;
  }>;
}

export const fetchDashboardData = async (): Promise<ApiResponse<DashboardData>> => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  return response.json();
};

interface FinancialStats {
  totalSavings: number;
  monthlyExpenses: number;
  savingsRate: number;
  categories: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
}

export const fetchFinancialStats = async (): Promise<ApiResponse<FinancialStats>> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
};

interface Transaction {
  id: string;
  type: 'expense' | 'savings';
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export const fetchTransactions = async (): Promise<ApiResponse<Transaction[]>> => {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  return response.json();
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  return response.json();
};

interface ExpenseData {
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface SavingsData {
  amount: number;
  date: string;
  description?: string;
}

export const addExpense = async (expenseData: ExpenseData): Promise<ApiResponse<Transaction>> => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  if (!response.ok) {
    throw new Error('Failed to add expense');
  }
  return response.json();
};

export const updateSavings = async (savingsData: SavingsData): Promise<ApiResponse<Transaction>> => {
  const response = await fetch(`${API_BASE_URL}/savings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(savingsData),
  });
  if (!response.ok) {
    throw new Error('Failed to update savings');
  }
  return response.json();
};

export const sendChatMessage = async (message: string) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }
  return response.json();
};

export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}