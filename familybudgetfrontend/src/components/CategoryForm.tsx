import React, { useState, useEffect } from 'react';
import { Category, CategoryCreateDto } from '../types/types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box
} from '@mui/material';
import { getTransactionType } from '../api/transactionTypes';
import { createCategory, updateCategory } from '../api/categories';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  category?: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ open, onClose, onSave, category }) => {
  const [formData, setFormData] = useState<CategoryCreateDto>({
    name: '',
    transactionTypeId: 0
  });
  const [transactionTypes, setTransactionTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactionTypes = async () => {
      try {
        // Добавить запрос типов транзакций
        const types = [
          { id: 1, name: 'Доход' },
          { id: 2, name: 'Расход' }
        ];
        setTransactionTypes(types);
        
        if (types.length > 0) {
          setFormData(prev => ({
            ...prev,
            transactionTypeId: types[0].id
          }));
        }
      } catch (error) {
        console.error('Error fetching transaction types:', error);
      }
    };
    
    fetchTransactionTypes();
  }, []);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        transactionTypeId: category.transactionTypeId
      });
    } else {
      setFormData({
        name: '',
        transactionTypeId: transactionTypes.length > 0 ? transactionTypes[0].id : 0
      });
    }
  }, [category, transactionTypes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (category) {
        await updateCategory(category.id, formData);
      } else {
        await createCategory(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {category ? 'Редактировать категорию' : 'Добавить категорию'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Название категории"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Тип транзакции</InputLabel>
            <Select
              name="transactionTypeId"
              value={formData.transactionTypeId}
              onChange={handleSelectChange}
              label="Тип транзакции"
            >
              {transactionTypes.map(type => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
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

export default CategoryForm;