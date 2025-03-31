import React from 'react';
import { Box, Typography } from '@mui/material';
import CategoryList from '../components/CategoryList';

const CategoriesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Управление категориями
      </Typography>
      <CategoryList />
    </Box>
  );
};

export default CategoriesPage;