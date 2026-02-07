import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  School, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import SuperAdminHeader from '@/components/super-admin/SuperAdminHeader';
import SuperAdminOverview from '@/components/super-admin/SuperAdminOverview';
import SchoolManagement from '@/components/super-admin/SchoolManagement';
import SchoolAdminManagement from '@/components/super-admin/SchoolAdminManagement';
import SuperAdminSettings from '@/components/super-admin/SuperAdminSettings';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'schools', label: 'Schools', icon: School },
  { id: 'school-admins', label: 'School Admins', icon: Users },
  { id: 'tutors', label: 'Tutors', icon: GraduationCap },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const tabTitles: Record<string, string> = {
  dashboard: 'Dashboard Overview',
  schools: 'School Management',
  'school-admins': 'School Admin Management',
  tutors: 'Tutor Management',
  marketplace: 'Product Marketplace',
  analytics: 'Profit Analytics',
  settings: 'Account Settings',
};

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading, isSuperAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isSuperAdmin)) {
      navigate('/auth');
    }
  }, [user, loading, isSuperAdmin, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SuperAdminOverview />;
      case 'schools':
        return <SchoolManagement />;
      case 'school-admins':
        return <SchoolAdminManagement />;
      case 'settings':
        return <SuperAdminSettings />;
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">{tabTitles[activeTab]}</h2>
              <p className="text-muted-foreground">This module is coming soon...</p>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar flex flex-col z-40 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
                <School className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-sidebar-foreground">Super Admin</span>
            </div>
          )}
          {collapsed && (
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center mx-auto">
              <School className="w-5 h-5 text-accent-foreground" />
            </div>
          )}
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-primary transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto scrollbar-thin">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full sidebar-item",
                  activeTab === item.id && "sidebar-item-active"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full sidebar-item",
              activeTab === 'settings' && "sidebar-item-active"
            )}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full sidebar-item text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "ml-20" : "ml-64"
      )}>
        <SuperAdminHeader title={tabTitles[activeTab]} />
        <main className="min-h-[calc(100vh-4rem)] bg-muted/30">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
