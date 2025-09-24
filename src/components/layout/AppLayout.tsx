import { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import PunchSystem from '../pages/PunchSystem';
import Records from '../pages/Records';
import Reports from '../pages/Reports';
import Employees from '../pages/Employees';
import Settings from '../pages/Settings';

interface AppLayoutProps {
  userRole?: 'admin' | 'employee';
  onLogout: () => void;
}

const AppLayout = ({ userRole = 'employee', onLogout }: AppLayoutProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'punch':
        return <PunchSystem />;
      case 'records':
        return <Records />;
      case 'reports':
        return <Reports userRole={userRole} />;
      case 'employees':
        return userRole === 'admin' ? <Employees /> : <Dashboard userRole={userRole} />;
      case 'settings':
        return userRole === 'admin' ? <Settings /> : <Dashboard userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <div className="w-64 flex-shrink-0">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userRole={userRole}
          onLogout={onLogout}
        />
      </div>
      
      <main className="flex-1 overflow-auto">
        <div className="gradient-bg min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;