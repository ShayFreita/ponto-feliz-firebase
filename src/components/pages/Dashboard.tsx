import AdminDashboard from '../dashboard/AdminDashboard';
import EmployeeDashboard from '../dashboard/EmployeeDashboard';

interface DashboardProps {
  userRole: 'admin' | 'employee';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  if (userRole === 'admin') {
    return <AdminDashboard />;
  }
  
  return <EmployeeDashboard />;
};

export default Dashboard;