import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import AppLayout from '@/components/layout/AppLayout';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'employee'>('employee');

  const handleLogin = (role: 'admin' | 'employee') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('employee');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AppLayout userRole={userRole} onLogout={handleLogout} />;
};

export default Index;
