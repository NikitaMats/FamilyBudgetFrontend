// User types
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserDetailDto extends User {
  transactions?: TransactionDto[];
}

export interface UserUpdateDto {
  name: string;
  email: string;
}

// Transaction types
export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  userId: number;
  categoryId: number;
  user: User;
  category: Category;
}

export interface TransactionDto {
  id: number;
  amount: number;
  date: string;
  description: string;
}

export interface TransactionCreateDto {
  amount: number;
  date: string;
  description: string;
  userId: number;
  categoryId: number;
}

// Category types
export interface Category {
  id: number;
  name: string;
  transactionTypeId: number;
  transactionType?: TransactionType;
}

export interface CategoryCreateDto {
  name: string;
  transactionTypeId: number;
}

// TransactionType types
export interface TransactionType {
  id: number;
  name: string;
}

export interface TransactionTypeDto {
  id: number;
  name: string;
}

export interface TransactionTypeCreateDto {
  name: string;
}

export interface TransactionUpdateDto {
  amount: number;
  date: string;
  description: string;
  userId: number;
  categoryId: number;
}

// Report types
export interface CategoryReportDto {
  category: string;
  type: string;
  total: number;
  percentage: number;
}

export interface UserReportDto {
  userId: number;
  userName: string;
  totalIncome: number;
  totalExpense: number;
}