import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tutors = [
  {
    name: "Dr. Priya Sharma",
    subject: "Mathematics",
    classes: "9th - 12th",
    location: "Delhi",
    rating: 4.9,
    students: 120,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Rajesh Kumar",
    subject: "Physics",
    classes: "11th - 12th",
    location: "Mumbai",
    rating: 4.8,
    students: 95,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Anita Gupta",
    subject: "English",
    classes: "1st - 8th",
    location: "Bangalore",
    rating: 4.9,
    students: 150,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Vikram Singh",
    subject: "Chemistry",
    classes: "9th - 12th",
    location: "Chennai",
    rating: 4.7,
    students: 80,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
];

const TutorPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-secondary/10 to-transparent blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              Tutor Marketplace
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">
              Find Expert Tutors
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Connect with verified tutors for personalized learning. Browse, compare, and contact directly.
            </p>
          </div>
          <Button variant="outline" size="lg" asChild className="shrink-0">
            <Link to="/tutors">
              View All Tutors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
        
        {/* Tutors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-interactive p-6 text-center group"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-background shadow-lg group-hover:ring-primary/20 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center shadow-md">
                  <Star className="w-4 h-4 text-accent-foreground fill-current" />
                </div>
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{tutor.name}</h3>
              
              <div className="flex items-center justify-center gap-1 text-primary mb-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{tutor.subject}</span>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Classes: {tutor.classes}</p>
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {tutor.location}
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="flex items-center gap-1 text-secondary">
                    <Star className="w-3 h-3 fill-current" />
                    {tutor.rating}
                  </span>
                  <span className="text-border">•</span>
                  <span>{tutor.students} students</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorPreview;
