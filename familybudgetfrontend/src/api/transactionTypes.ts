import axios from 'axios';
import { TransactionTypeDto, TransactionTypeCreateDto } from '../types/types';

const API_URL = 'https://localhost:7016/api/transactiontypes';

export const createTransactionType = async (dto: TransactionTypeCreateDto): Promise<TransactionTypeDto> => {
  const response = await axios.post(API_URL, dto);
  return response.data;
};

export const getTransactionType = async (id: number): Promise<TransactionTypeDto> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteTransactionType = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};