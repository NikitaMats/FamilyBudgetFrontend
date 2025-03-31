import axios from 'axios';
import { User, UserDetailDto, UserUpdateDto } from '../types/types';

const API_URL = 'https://localhost:7016/api/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUser = async (id: number, includeTransactions = false): Promise<UserDetailDto> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    params: { includeTransactions }
  });
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: UserUpdateDto): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};