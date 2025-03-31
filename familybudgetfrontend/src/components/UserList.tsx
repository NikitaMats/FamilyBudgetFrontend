import React, { useEffect, useState } from 'react';
import { User } from '../types/types';
import { getUsers, deleteUser } from '../api/users';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Button 
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface UserListProps {
  onEdit: (user: User) => void;
  onCreate: () => void;
  refreshTrigger?: number;
}

const UserList: React.FC<UserListProps> = ({ onEdit, onCreate, refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  
  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={onCreate} style={{ marginBottom: '20px' }}>
        Добавить пользователя
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;