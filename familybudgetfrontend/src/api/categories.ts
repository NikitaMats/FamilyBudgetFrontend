import axios from 'axios';
import { Category, CategoryCreateDto } from '../types/types';

const API_URL = 'https://localhost:7016/api/categories';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCategory = async (category: CategoryCreateDto): Promise<Category> => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateCategory = async (id: number, category: CategoryCreateDto): Promise<Category> => {
    const response = await axios.put(`${API_URL}/${id}`, category);
    return response.data;
  };