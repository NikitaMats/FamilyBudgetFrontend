import axios from 'axios';
import { Transaction, TransactionCreateDto, CategoryReportDto, UserReportDto } from '../types/types';

const API_URL = 'https://localhost:7016/api/transactions';

export const getTransactions = async (params?: {
    type?: 'income' | 'expense';
    search?: string;
    startDate?: string;
    endDate?: string;
    categoryId?: number;
  }): Promise<Transaction[]> => {
    const response = await axios.get(API_URL, { 
      params: {
        ...params,
        startDate: params?.startDate ? new Date(params.startDate).toISOString() : undefined,
        endDate: params?.endDate ? new Date(params.endDate).toISOString() : undefined
      }
    });
    return response.data;
  };

export const getTransaction = async (id: number): Promise<Transaction> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTransaction = async (transaction: TransactionCreateDto): Promise<Transaction> => {
  const response = await axios.post(API_URL, transaction);
  return response.data;
};

export const getBalance = async (): Promise<number> => {
  const response = await axios.get(`${API_URL}/balance`);
  return response.data;
};

export const getByCategories = async (startDate?: Date, endDate?: Date): Promise<CategoryReportDto[]> => {
  const response = await axios.get(`${API_URL}/by-categories`, {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getByUsers = async (): Promise<UserReportDto[]> => {
  const response = await axios.get(`${API_URL}/by-users`);
  return response.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  };
  
  export const updateTransaction = async (id: number, data: TransactionCreateDto): Promise<Transaction> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  };