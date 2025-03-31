import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getByCategories, getByUsers } from '../api/transactions';
import { CategoryReportDto, UserReportDto } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsPage: React.FC = () => {
  const [categoryReport, setCategoryReport] = useState<CategoryReportDto[]>([]);
  const [userReport, setUserReport] = useState<UserReportDto[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const categories = await getByCategories(
        startDate || undefined, 
        endDate || undefined
      );
      const users = await getByUsers();
      
      setCategoryReport(categories);
      setUserReport(users);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = () => {
    fetchReports();
  };

  const prepareChartData = () => {
    return categoryReport.map(item => ({
      name: item.category,
      value: item.total,
      type: item.type
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Отчеты
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 4,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <DatePicker
          label="Начальная дата"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 200 }
            }
          }}
        />
        <DatePicker
          label="Конечная дата"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 200 }
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleDateChange}
          sx={{ height: '40px' }}
        >
          Применить фильтр
        </Button>
      </Box>

      {loading ? (
        <Typography>Загрузка отчетов...</Typography>
      ) : (
        <>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Распределение по категориям
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareChartData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      fill="#8884d8" 
                      name="Сумма"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default ReportsPage;