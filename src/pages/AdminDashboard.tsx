import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardOverview from "@/components/admin/DashboardOverview";
import StudentManagement from "@/components/admin/StudentManagement";
import AttendanceModule from "@/components/admin/AttendanceModule";
import FeesModule from "@/components/admin/FeesModule";

const tabTitles: Record<string, string> = {
  dashboard: "Dashboard",
  students: "Student Management",
  teachers: "Teacher Management",
  attendance: "Attendance",
  fees: "Fees Management",
  exams: "Exams & Results",
  expenses: "Expenses & Profit",
  "ai-entry": "AI Data Entry",
  "qr-codes": "QR Code Management",
  marketplace: "Product Marketplace",
  settings: "Settings",
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "students":
        return <StudentManagement />;
      case "attendance":
        return <AttendanceModule />;
      case "fees":
        return <FeesModule />;
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

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-20 lg:ml-64 transition-all duration-300">
        <AdminHeader title={tabTitles[activeTab]} />
        
        <main className="min-h-[calc(100vh-4rem)] bg-muted/30">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
