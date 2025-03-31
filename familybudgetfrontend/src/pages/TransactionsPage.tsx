import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Search, FilterList, Refresh } from '@mui/icons-material';
import TransactionList from '../components/TransactionList';
import { getByCategories } from '../api/transactions';
import { CategoryReportDto } from '../types/types';

interface TransactionListProps {
  transactionType: 'all' | 'income' | 'expense';
  searchQuery: string;
  startDate: Date | null;
  endDate: Date | null;
  categoryFilter: number | null;
}

const TransactionsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryReportDto[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getByCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
    setCategoryFilter(null);
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const transactionType: 'all' | 'income' | 'expense' = 
    tabValue === 1 ? 'income' : tabValue === 2 ? 'expense' : 'all';

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Транзакции
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ minHeight: 'auto' }}
            >
              <Tab label="Все транзакции" />
              <Tab label="Доходы" />
              <Tab label="Расходы" />
            </Tabs>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <Button 
                variant="outlined" 
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Фильтры
              </Button>

              <IconButton onClick={handleResetFilters}>
                <Refresh />
              </IconButton>
            </Box>
          </Box>

          {showFilters && (
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <DatePicker
                  label="С"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      size: 'small'
                    }
                  }}
                />
                <DatePicker
                  label="По"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      size: 'small'
                    }
                  }}
                />
                <TextField
                  select
                  size="small"
                  label="Категория"
                  value={categoryFilter || ''}
                  onChange={(e) => setCategoryFilter(Number(e.target.value) || null)}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value="">
                    <em>Все категории</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.category} value={category.category}>
                      {category.category} ({category.type})
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setShowFilters(false)}
                >
                  Отмена
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleApplyFilters}
                >
                  Применить
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <TransactionList 
        transactionType={transactionType}
        searchQuery={searchQuery}
        startDate={startDate}
        endDate={endDate}
        categoryFilter={categoryFilter}
      />
    </Box>
  );
};

export default TransactionsPage;