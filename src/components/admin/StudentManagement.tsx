import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  QrCode, 
  Eye, 
  Edit, 
  Trash2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StudentQRModal from "./StudentQRModal";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  fatherName: string;
  motherName: string;
  phone: string;
  feeStatus: "paid" | "pending" | "partial";
  image: string;
  attendance: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    rollNo: "2024001",
    class: "10",
    section: "A",
    fatherName: "Rakesh Sharma",
    motherName: "Sunita Sharma",
    phone: "+91 98765 43210",
    feeStatus: "paid",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    attendance: 94,
  },
  {
    id: "2",
    name: "Priya Patel",
    rollNo: "2024002",
    class: "10",
    section: "A",
    fatherName: "Amit Patel",
    motherName: "Rekha Patel",
    phone: "+91 87654 32109",
    feeStatus: "pending",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    attendance: 88,
  },
  {
    id: "3",
    name: "Rahul Kumar",
    rollNo: "2024003",
    class: "10",
    section: "B",
    fatherName: "Vijay Kumar",
    motherName: "Anita Kumar",
    phone: "+91 76543 21098",
    feeStatus: "partial",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    attendance: 91,
  },
  {
    id: "4",
    name: "Sneha Gupta",
    rollNo: "2024004",
    class: "9",
    section: "A",
    fatherName: "Rajesh Gupta",
    motherName: "Meera Gupta",
    phone: "+91 65432 10987",
    feeStatus: "paid",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    attendance: 96,
  },
  {
    id: "5",
    name: "Vikram Singh",
    rollNo: "2024005",
    class: "9",
    section: "B",
    fatherName: "Harpal Singh",
    motherName: "Gurpreet Kaur",
    phone: "+91 54321 09876",
    feeStatus: "paid",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    attendance: 89,
  },
];

const classes = ["All Classes", "Class 9", "Class 10", "Class 11", "Class 12"];

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.includes(searchQuery);
    const matchesClass = selectedClass === "All Classes" || 
                         `Class ${student.class}` === selectedClass;
    return matchesSearch && matchesClass;
  });

  const groupedStudents = filteredStudents.reduce((acc, student) => {
    const key = `Class ${student.class}-${student.section}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  const handleShowQR = (student: Student) => {
    setSelectedStudent(student);
    setShowQRModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Students</h2>
          <p className="text-muted-foreground">Manage all students across classes</p>
        </div>
        <Button variant="default" size="lg">
          <Plus className="w-5 h-5" />
          Add Student
        </Button>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
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
          
          {/* Class filter */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </Card>
      
      {/* Students List */}
      <div className="space-y-6">
        {Object.entries(groupedStudents).map(([classSection, students]) => (
          <motion.div
            key={classSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-foreground">{classSection}</h3>
              <Badge variant="secondary">{students.length} students</Badge>
            </div>
            
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Roll No</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Parents</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Attendance</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Fee Status</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {students.map((student) => (
                      <tr key={student.id} className="table-row-hover">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.image}
                              alt={student.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-background"
                            />
                            <span className="font-medium text-foreground">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{student.rollNo}</td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="text-foreground">{student.fatherName}</p>
                            <p className="text-muted-foreground">{student.motherName}</p>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{student.phone}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full bg-gradient-accent rounded-full"
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm text-foreground">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant="outline"
                            className={
                              student.feeStatus === "paid" ? "badge-success" :
                              student.feeStatus === "pending" ? "badge-danger" :
                              "badge-warning"
                            }
                          >
                            {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleShowQR(student)}
                              className="text-primary"
                            >
                              <QrCode className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* QR Modal */}
      {showQRModal && selectedStudent && (
        <StudentQRModal 
          student={selectedStudent} 
          onClose={() => setShowQRModal(false)} 
        />
      )}
    </div>
  );
};

export default StudentManagement;
