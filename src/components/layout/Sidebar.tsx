import { Clock, Home, Calendar, FileText, Settings, Users, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import arvooLogo from '@/assets/arvoo-logo.png';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'admin' | 'employee';
  onLogout: () => void;
}

const Sidebar = ({ activeTab, onTabChange, userRole, onLogout }: SidebarProps) => {
const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'employee'] },
    { id: 'punch', label: 'Registrar Ponto', icon: Clock, roles: ['employee'] },
    { id: 'records', label: userRole === 'admin' ? 'Registros Gerais' : 'Meus Registros', icon: Calendar, roles: ['admin', 'employee'] },
    { id: 'reports', label: 'Relatórios', icon: FileText, roles: ['admin', 'employee'] },
    { id: 'employees', label: 'Funcionários', icon: Users, roles: ['admin'] },
    { id: 'settings', label: 'Configurações', icon: Settings, roles: ['admin'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="h-full flex flex-col bg-sidebar-background border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={arvooLogo} alt="Arvoo Ponto" className="w-8 h-8 rounded-lg" />
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Arvoo Ponto</h1>
            <p className="text-xs text-sidebar-foreground/60">Gestão Inteligente</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">João Silva</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{userRole}</p>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/30 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;