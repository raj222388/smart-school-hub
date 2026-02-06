import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Plus, 
  Download, 
  ChevronDown,
  CreditCard,
  Receipt,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeeRecord {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  totalFees: number;
  paidFees: number;
  remainingFees: number;
  lastPayment: string;
  status: "paid" | "partial" | "pending";
  feeTypes: { type: string; amount: number; paid: boolean }[];
}

const mockFees: FeeRecord[] = [
  {
    id: "1",
    studentName: "Arjun Sharma",
    rollNo: "2024001",
    class: "10-A",
    totalFees: 45000,
    paidFees: 45000,
    remainingFees: 0,
    lastPayment: "2024-01-15",
    status: "paid",
    feeTypes: [
      { type: "Tuition", amount: 35000, paid: true },
      { type: "Bus", amount: 8000, paid: true },
      { type: "Books", amount: 2000, paid: true },
    ],
  },
  {
    id: "2",
    studentName: "Priya Patel",
    rollNo: "2024002",
    class: "10-A",
    totalFees: 45000,
    paidFees: 0,
    remainingFees: 45000,
    lastPayment: "-",
    status: "pending",
    feeTypes: [
      { type: "Tuition", amount: 35000, paid: false },
      { type: "Bus", amount: 8000, paid: false },
      { type: "Books", amount: 2000, paid: false },
    ],
  },
  {
    id: "3",
    studentName: "Rahul Kumar",
    rollNo: "2024003",
    class: "10-B",
    totalFees: 37000,
    paidFees: 20000,
    remainingFees: 17000,
    lastPayment: "2024-02-01",
    status: "partial",
    feeTypes: [
      { type: "Tuition", amount: 35000, paid: false },
      { type: "Books", amount: 2000, paid: true },
    ],
  },
];

const FeesModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const totalCollected = mockFees.reduce((sum, f) => sum + f.paidFees, 0);
  const totalPending = mockFees.reduce((sum, f) => sum + f.remainingFees, 0);
  const totalFees = mockFees.reduce((sum, f) => sum + f.totalFees, 0);

  const filteredFees = mockFees.filter((fee) => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fee.rollNo.includes(searchQuery);
    const matchesStatus = selectedStatus === "All" || fee.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Fees Management</h2>
          <p className="text-muted-foreground">Track and manage student fees</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="default">
            <Plus className="w-4 h-4" />
            Record Payment
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Fees</p>
              <p className="text-2xl font-bold text-foreground">₹{(totalFees / 100000).toFixed(1)}L</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Collected</p>
              <p className="text-2xl font-bold text-accent">₹{(totalCollected / 100000).toFixed(1)}L</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="mt-3 w-full h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-gradient-accent rounded-full"
              style={{ width: `${(totalCollected / totalFees) * 100}%` }}
            />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl font-bold text-destructive">₹{(totalPending / 100000).toFixed(1)}L</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Pending</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </Card>
      
      {/* Fees List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Class</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Fees</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Paid</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Remaining</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Payment</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredFees.map((fee, index) => (
                <motion.tr
                  key={fee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="table-row-hover"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{fee.studentName}</p>
                      <p className="text-sm text-muted-foreground">Roll: {fee.rollNo}</p>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{fee.class}</td>
                  <td className="p-4 font-medium text-foreground">₹{fee.totalFees.toLocaleString()}</td>
                  <td className="p-4 text-accent font-medium">₹{fee.paidFees.toLocaleString()}</td>
                  <td className="p-4 text-destructive font-medium">₹{fee.remainingFees.toLocaleString()}</td>
                  <td className="p-4 text-muted-foreground">{fee.lastPayment}</td>
                  <td className="p-4">
                    <Badge 
                      variant="outline"
                      className={
                        fee.status === "paid" ? "badge-success" :
                        fee.status === "pending" ? "badge-danger" :
                        "badge-warning"
                      }
                    >
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Receipt className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Pay Now
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default FeesModule;
