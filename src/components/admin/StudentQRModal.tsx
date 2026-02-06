import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  fatherName: string;
  motherName: string;
  image: string;
}

interface StudentQRModalProps {
  student: Student;
  onClose: () => void;
}

const StudentQRModal = ({ student, onClose }: StudentQRModalProps) => {
  const qrValue = `https://smartschool.app/student/${student.id}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-card rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Student QR Code</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 text-center">
          {/* Student info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-muted/50 rounded-xl">
            <img
              src={student.image}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-background"
            />
            <div className="text-left">
              <h3 className="font-semibold text-foreground">{student.name}</h3>
              <p className="text-sm text-muted-foreground">Roll No: {student.rollNo}</p>
              <p className="text-sm text-muted-foreground">Class {student.class}-{student.section}</p>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="bg-white p-6 rounded-2xl inline-block mb-6 shadow-lg">
            <QRCodeSVG
              value={qrValue}
              size={200}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: student.image,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Scan this QR code to view student profile, attendance, fees, and results.
          </p>
          
          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button variant="default">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentQRModal;
