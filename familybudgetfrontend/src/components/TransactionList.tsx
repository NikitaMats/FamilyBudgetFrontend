import React, { useEffect, useState } from 'react';
import { Transaction } from '../types/types';
import { getTransactions, deleteTransaction } from '../api/transactions';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Button,
  Box,
  Typography
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import TransactionForm from './TransactionForm';

interface TransactionListProps {
  transactionType?: 'all' | 'income' | 'expense';
  searchQuery?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  categoryFilter?: number | null;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactionType = 'all',
  searchQuery = '',
  startDate = null,
  endDate = null,
  categoryFilter = null
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTransactions({
          type: transactionType !== 'all' ? transactionType : undefined,
          search: searchQuery,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          categoryId: categoryFilter || undefined
        });
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionType, searchQuery, startDate, endDate, categoryFilter]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setCurrentTransaction(null);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleSave = () => {
    setFormOpen(false);
    fetchTransactions();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h5">Транзакции</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Добавить транзакцию
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell 
                  sx={{ 
                    color: transaction.amount >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {transaction.amount.toLocaleString('ru-RU', { 
                    style: 'currency', 
                    currency: 'RUB' 
                  })}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.user?.name}</TableCell>
                <TableCell>{transaction.category?.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(transaction)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(transaction.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TransactionForm 
        open={formOpen} 
        onClose={handleClose} 
        onSave={handleSave} 
        transaction={currentTransaction} 
      />
    </Box>
  );
};

export default TransactionList;