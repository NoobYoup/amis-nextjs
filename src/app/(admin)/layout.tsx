'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar onLogout={handleLogout} />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--background)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
