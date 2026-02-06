import { motion } from "framer-motion";
import { MapPin, Users, GraduationCap } from "lucide-react";

const schools = [
  {
    name: "Sunrise International School",
    location: "New Delhi, India",
    students: 1250,
    classes: 12,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
  },
  {
    name: "Green Valley Academy",
    location: "Mumbai, India",
    students: 890,
    classes: 10,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
  },
  {
    name: "Little Stars Prep",
    location: "Bangalore, India",
    students: 450,
    classes: 8,
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&h=300&fit=crop",
  },
];

const SchoolsPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Network
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Schools Using Our Platform
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of schools already benefiting from smart management.
          </p>
        </motion.div>
        
        {/* Schools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {schools.map((school, index) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-interactive overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {school.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    {school.location}
                  </div>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">{school.students} Students</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span className="text-sm">{school.classes} Classes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolsPreview;
