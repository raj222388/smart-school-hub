import { motion } from "framer-motion";
import { 
  School, 
  Users, 
  QrCode, 
  Brain, 
  CreditCard, 
  ClipboardCheck, 
  FileText, 
  BarChart3, 
  ShoppingBag,
  Play 
} from "lucide-react";

const features = [
  {
    icon: School,
    title: "Multi-School Management",
    description: "Manage unlimited schools from one platform. Each school has isolated data with dedicated admin access.",
    color: "from-primary to-primary/80",
  },
  {
    icon: Users,
    title: "Student & Teacher Profiles",
    description: "Complete profiles with photos, class details, contact info. Auto-grouped by class for easy management.",
    color: "from-accent to-accent/80",
  },
  {
    icon: QrCode,
    title: "QR Code Access",
    description: "Every student and teacher gets a unique QR code. Parents scan to view profiles - no login required.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: Brain,
    title: "AI Image-to-Data",
    description: "Upload admission forms or registers. AI extracts names, classes, and details automatically.",
    color: "from-primary to-accent",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    description: "Take photo of attendance register. AI reads marks and saves attendance with one click.",
    color: "from-accent to-secondary",
  },
  {
    icon: CreditCard,
    title: "Fees Management",
    description: "Track school, bus, and book fees. Generate PDF receipts with complete payment history.",
    color: "from-secondary to-primary",
  },
  {
    icon: FileText,
    title: "Exam & Results",
    description: "Manage subject marks, auto-calculate percentages and grades. Generate printable marksheets.",
    color: "from-primary to-secondary",
  },
  {
    icon: BarChart3,
    title: "Expense & Profit",
    description: "Track salaries, maintenance costs. Auto-calculate net profit per school.",
    color: "from-accent to-primary",
  },
  {
    icon: ShoppingBag,
    title: "Product Marketplace",
    description: "Internal marketplace for schools. Order supplies with invoice generation.",
    color: "from-secondary to-accent",
  },
  {
    icon: Play,
    title: "Learning Videos",
    description: "Cartoon-based educational videos. Category and age-wise organization for students.",
    color: "from-primary to-accent",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Complete Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Everything Your School Needs
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive platform designed for schools with zero technical knowledge. 
            Simple, powerful, and fully automated.
          </p>
        </motion.div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card-interactive p-6 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
