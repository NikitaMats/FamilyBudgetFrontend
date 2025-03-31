import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const UsersPage: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<number | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (user: any) => {
    setCurrentUser(user.id);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setCurrentUser(undefined);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleSave = () => {
    setFormOpen(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <h1>Пользователи</h1>
      <UserList onEdit={handleEdit} onCreate={handleCreate} refreshTrigger={refreshTrigger}/>
      <UserForm 
        open={formOpen} 
        onClose={handleClose} 
        onSave={handleSave} 
        userId={currentUser} 
      />
    </div>
  );
};

export default UsersPage;