import React, { useEffect, useState } from 'react';
import { getBalance, getByCategories } from '../api/transactions';
import { 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Box,
  styled
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px'
});

const CardsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

const DashboardCard = styled(Card)({
  flex: 1,
  minWidth: 0
});

const DashboardPage: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [categoriesData, setCategoriesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceData = await getBalance();
        const categories = await getByCategories();
        
        setBalance(balanceData);
        
        const chartData = {
          labels: categories.map(c => c.category),
          datasets: [{
            data: categories.map(c => c.total),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ]
          }]
        };
        
        setCategoriesData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <CircularProgress />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Аналитика бюджета
      </Typography>

      <CardsRow>
        <DashboardCard>
          <CardContent>
            <Typography variant="h6" component="div">
              Текущий баланс
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                color: balance && balance >= 0 ? 'success.main' : 'error.main',
                mt: 2
              }}
            >
              {balance?.toLocaleString('ru-RU', { 
                style: 'currency', 
                currency: 'RUB' 
              })}
            </Typography>
          </CardContent>
        </DashboardCard>

        <DashboardCard>
          <CardContent>
            <Typography variant="h6" component="div">
              Распределение по категориям
            </Typography>
            {categoriesData && (
              <Box sx={{ height: '300px', mt: 2 }}>
                <Pie
                  data={categoriesData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }} 
                />
              </Box>
            )}
          </CardContent>
        </DashboardCard>
      </CardsRow>
    </DashboardContainer>
  );
};

export default DashboardPage;