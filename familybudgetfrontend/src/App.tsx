import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Семейный Бюджет
          </Typography>
          <nav>
            <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
              Главная
            </Link>
            <Link to="/transactions" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
              Транзакции
            </Link>
            <Link to="/categories" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
              Категории
            </Link>
            <Link to="/users" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
              Пользователи
            </Link>
            <Link to="/reports" style={{ color: 'white', textDecoration: 'none' }}>
              Отчеты
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Container>
    </Router>
    </LocalizationProvider>
  );
};

export default App;