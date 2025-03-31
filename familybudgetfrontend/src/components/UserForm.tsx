import React, { useState, useEffect } from 'react';
import { User, UserUpdateDto } from '../types/types';
import { createUser, updateUser, getUser } from '../api/users';
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from '@mui/material';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  userId?: number;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, onSave, userId }) => {
  const [user, setUser] = useState<UserUpdateDto>({ name: '', email: '' });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const data = await getUser(userId);
        setUser({ name: data.name, email: data.email });
      };
      fetchUser();
    } else {
      setUser({ name: '', email: '' });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (userId) {
      await updateUser(userId, user);
    } else {
      await createUser({ ...user, id: 0 }); 
    }
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{userId ? 'Редактировать пользователя' : 'Добавить пользователя'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Имя"
          type="text"
          fullWidth
          variant="standard"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={user.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;