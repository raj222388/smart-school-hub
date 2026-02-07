import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  School,
  Brain,
  QrCode,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "teachers", label: "Teachers", icon: GraduationCap },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck },
  { id: "fees", label: "Fees", icon: CreditCard },
  { id: "exams", label: "Exams & Results", icon: FileText },
  { id: "expenses", label: "Expenses", icon: BarChart3 },
  { id: "ai-entry", label: "AI Data Entry", icon: Brain },
  { id: "qr-codes", label: "QR Codes", icon: QrCode },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
];

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
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
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <School className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sidebar-foreground">SmartSchool</span>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto">
            <School className="w-5 h-5 text-primary-foreground" />
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
          onClick={() => setActiveTab("settings")}
          className={cn(
            "w-full sidebar-item",
            activeTab === "settings" && "sidebar-item-active"
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button 
          onClick={onLogout}
          className="w-full sidebar-item text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
