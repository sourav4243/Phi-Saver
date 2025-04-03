const API_BASE_URL = 'http://localhost:5000/api';

export const fetchDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

export const addExpense = async (expenseData: any) => {
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

export const updateSavings = async (savingsData: any) => {
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