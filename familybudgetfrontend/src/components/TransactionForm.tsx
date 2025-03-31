import React, { useState, useEffect } from 'react';
import { Transaction, TransactionCreateDto } from '../types/types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCategories } from '../api/categories';
import { getUsers } from '../api/users';
import { Category } from '../types/types';
import { User } from '../types/types';
import { createTransaction, updateTransaction } from '../api/transactions';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  transaction: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  open, 
  onClose, 
  onSave, 
  transaction 
}) => {
  const [formData, setFormData] = useState<TransactionCreateDto>({
    amount: 0,
    date: new Date().toISOString(),
    description: '',
    userId: 0,
    categoryId: 0
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const usersData = await getUsers();
        setCategories(categoriesData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        userId: transaction.userId,
        categoryId: transaction.categoryId
      });
    } else {
      setFormData({
        amount: 0,
        date: new Date().toISOString(),
        description: '',
        userId: users.length > 0 ? users[0].id : 0,
        categoryId: categories.length > 0 ? categories[0].id : 0
      });
    }
  }, [transaction, users, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({ ...prev, date: date.toISOString() }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (transaction) {
        await updateTransaction(transaction.id, formData);
      } else {
        await createTransaction(formData);
      }
      onSave(); // Вызываем после успешного сохранения
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {transaction ? 'Редактировать транзакцию' : 'Добавить транзакцию'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Сумма"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />

          <DatePicker
            label="Дата"
            value={new Date(formData.date)}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal'
              }
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Пользователь</InputLabel>
            <Select
              name="userId"
              value={formData.userId}
              onChange={handleSelectChange}
              label="Пользователь"
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Категория</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleSelectChange}
              label="Категория"
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name} ({category.transactionType?.name})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;