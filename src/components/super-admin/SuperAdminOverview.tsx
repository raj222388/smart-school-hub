import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { School, Users, DollarSign, TrendingUp, Building, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SuperAdminOverview = () => {
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalAdmins: 0,
    totalRevenue: 0,
    activeSchools: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Fetch schools count
    const { count: schoolsCount } = await supabase
      .from('schools')
      .select('*', { count: 'exact', head: true });

    // Fetch school admins count
    const { count: adminsCount } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'school_admin');

    setStats({
      totalSchools: schoolsCount || 0,
      totalAdmins: adminsCount || 0,
      totalRevenue: 125000, // Mock data
      activeSchools: schoolsCount || 0,
    });
  };

  const statCards = [
    {
      title: 'Total Schools',
      value: stats.totalSchools,
      icon: School,
      color: 'bg-primary/10 text-primary',
      trend: '+12%',
    },
    {
      title: 'School Admins',
      value: stats.totalAdmins,
      icon: Users,
      color: 'bg-accent/10 text-accent',
      trend: '+8%',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500/10 text-green-600',
      trend: '+23%',
    },
    {
      title: 'Active Schools',
      value: stats.activeSchools,
      icon: Building,
      color: 'bg-blue-500/10 text-blue-600',
      trend: '+5%',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-medium">{stat.trend}</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left">
              <School className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-foreground">Add School</p>
              <p className="text-sm text-muted-foreground">Register new school</p>
            </button>
            <button className="p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors text-left">
              <Users className="w-6 h-6 text-accent mb-2" />
              <p className="font-medium text-foreground">Add Admin</p>
              <p className="text-sm text-muted-foreground">Create school admin</p>
            </button>
            <button className="p-4 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors text-left">
              <GraduationCap className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-foreground">Manage Tutors</p>
              <p className="text-sm text-muted-foreground">Approve registrations</p>
            </button>
            <button className="p-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-left">
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-foreground">View Analytics</p>
              <p className="text-sm text-muted-foreground">Revenue reports</p>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New school registered', school: 'Delhi Public School', time: '2 hours ago' },
              { action: 'School admin added', school: 'St. Mary\'s High School', time: '5 hours ago' },
              { action: 'Tutor approved', school: 'Mathematics Expert', time: '1 day ago' },
              { action: 'Payment received', school: 'Green Valley Academy', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.school}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
