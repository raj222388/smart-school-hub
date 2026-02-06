import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Total Students",
    value: "1,248",
    change: "+12%",
    isPositive: true,
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Teachers",
    value: "86",
    change: "+3",
    isPositive: true,
    icon: GraduationCap,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Fees Collected",
    value: "₹24.5L",
    change: "+8%",
    isPositive: true,
    icon: CreditCard,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    label: "Net Profit",
    value: "₹8.2L",
    change: "-2%",
    isPositive: false,
    icon: TrendingUp,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const recentActivities = [
  { action: "New admission", student: "Rahul Sharma", class: "Class 5", time: "2 min ago" },
  { action: "Fee payment", student: "Priya Patel", class: "Class 8", time: "15 min ago" },
  { action: "Attendance marked", class: "Class 10A", count: 42, time: "30 min ago" },
  { action: "Exam result added", subject: "Mathematics", class: "Class 12", time: "1 hour ago" },
];

const DashboardOverview = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 card-elevated">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? "text-accent" : "text-destructive"}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.student && `${activity.student} - `}
                      {activity.class}
                      {activity.count && ` (${activity.count} students)`}
                      {activity.subject && ` - ${activity.subject}`}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: "Add New Student", icon: Users, color: "bg-primary" },
                { label: "Mark Attendance", icon: Calendar, color: "bg-accent" },
                { label: "Record Fee Payment", icon: CreditCard, color: "bg-secondary" },
                { label: "Upload AI Entry", icon: GraduationCap, color: "bg-primary" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Today's Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Today's Attendance Summary</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Present", value: "1,156", percent: "93%", color: "text-accent" },
              { label: "Absent", value: "72", percent: "6%", color: "text-destructive" },
              { label: "Late", value: "20", percent: "1%", color: "text-secondary" },
              { label: "On Leave", value: "12", percent: "1%", color: "text-muted-foreground" },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 rounded-xl bg-muted/50">
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className={`text-xs font-medium ${item.color} mt-1`}>{item.percent}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
