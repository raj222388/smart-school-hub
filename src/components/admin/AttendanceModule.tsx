import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ChevronDown, 
  Check, 
  X, 
  Clock, 
  Download,
  Upload,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudentAttendance {
  id: string;
  name: string;
  rollNo: string;
  image: string;
  status: "present" | "absent" | "late" | null;
}

const mockAttendance: StudentAttendance[] = [
  { id: "1", name: "Arjun Sharma", rollNo: "2024001", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", status: "present" },
  { id: "2", name: "Priya Patel", rollNo: "2024002", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", status: "present" },
  { id: "3", name: "Rahul Kumar", rollNo: "2024003", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", status: "absent" },
  { id: "4", name: "Sneha Gupta", rollNo: "2024004", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", status: "late" },
  { id: "5", name: "Vikram Singh", rollNo: "2024005", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", status: null },
];

const AttendanceModule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [students, setStudents] = useState(mockAttendance);

  const handleStatusChange = (studentId: string, status: "present" | "absent" | "late") => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const stats = {
    present: students.filter(s => s.status === "present").length,
    absent: students.filter(s => s.status === "absent").length,
    late: students.filter(s => s.status === "late").length,
    unmarked: students.filter(s => !s.status).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Attendance</h2>
          <p className="text-muted-foreground">Mark and manage daily attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4" />
            AI Scan Register
          </Button>
          <Button variant="default">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      {/* Filters and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Date picker */}
        <Card className="p-4">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </Card>
        
        {/* Class selector */}
        <Card className="p-4">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Class</label>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none px-4 py-2 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option>Class 9-A</option>
              <option>Class 9-B</option>
              <option>Class 10-A</option>
              <option>Class 10-B</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </Card>
        
        {/* Stats */}
        <Card className="p-4 lg:col-span-2">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Today's Summary</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-foreground">Present: <strong>{stats.present}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-foreground">Absent: <strong>{stats.absent}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-sm text-foreground">Late: <strong>{stats.late}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-sm text-foreground">Unmarked: <strong>{stats.unmarked}</strong></span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* AI Scan Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-dashed border-2 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">AI Register Scan</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Take a photo of your attendance register. AI will automatically extract attendance data.
              </p>
              <Button variant="default" size="sm">
                <Upload className="w-4 h-4" />
                Upload Register Photo
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Attendance Grid */}
      <Card>
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">{selectedClass} - {new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</h3>
        </div>
        <div className="divide-y divide-border">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-8">{index + 1}</span>
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-background"
                />
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">Roll: {student.rollNo}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(student.id, "present")}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    student.status === "present" 
                      ? "bg-accent text-accent-foreground shadow-md scale-110" 
                      : "bg-muted text-muted-foreground hover:bg-accent/20"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleStatusChange(student.id, "absent")}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    student.status === "absent" 
                      ? "bg-destructive text-destructive-foreground shadow-md scale-110" 
                      : "bg-muted text-muted-foreground hover:bg-destructive/20"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleStatusChange(student.id, "late")}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    student.status === "late" 
                      ? "bg-secondary text-secondary-foreground shadow-md scale-110" 
                      : "bg-muted text-muted-foreground hover:bg-secondary/20"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Save button */}
        <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
          <Button variant="default" size="lg">
            Save Attendance
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceModule;
