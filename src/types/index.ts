export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  type: 'income' | 'expense';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
}