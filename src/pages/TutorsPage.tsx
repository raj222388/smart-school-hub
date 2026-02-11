import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  BookOpen, 
  Phone,
  ChevronDown,
  GraduationCap
} from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Tutor {
  id: string;
  name: string;
  subject: string;
  classes: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  verified: boolean;
  plan: string;
  image: string | null;
  bio: string | null;
}

const TutorsPage = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  useEffect(() => {
    const fetchTutors = async () => {
      const { data } = await supabase
        .from('tutors')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });
      if (data) setTutors(data);
    };
    fetchTutors();
  }, []);

  const subjects = ["All Subjects", ...new Set(tutors.map(t => t.subject))];
  const locations = ["All Locations", ...new Set(tutors.map(t => t.location))];

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All Subjects" || tutor.subject === selectedSubject;
    const matchesLocation = selectedLocation === "All Locations" || tutor.location === selectedLocation;
    return matchesSearch && matchesSubject && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Find Your Perfect Tutor
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8">
              Connect with verified, experienced tutors for personalized learning. 
              Browse by subject, location, and experience.
            </p>
            
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tutors by name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                />
              </div>
              <Button variant="hero" size="lg" className="shrink-0">
                Search Tutors
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Filters and Content */}
      <section className="py-12">
        <div className="container px-4">
          {/* Filters */}
          <Card className="p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
              
              <div className="relative flex-1">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
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
          
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <strong className="text-foreground">{filteredTutors.length}</strong> tutors
            </p>
          </div>
          
          {/* Tutors grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="card-interactive overflow-hidden h-full flex flex-col">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={tutor.image}
                          alt={tutor.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />
                        {tutor.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                            <Star className="w-3 h-3 text-accent-foreground fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground">{tutor.name}</h3>
                          <Badge variant="outline" className="badge-success text-xs">
                            {tutor.plan}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-primary mt-1">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm font-medium">{tutor.subject}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-sm">{tutor.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tutor.bio}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-secondary fill-current" />
                        <span className="font-medium text-foreground">{tutor.rating}</span>
                        <span className="text-muted-foreground">({tutor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        {tutor.experience}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">Classes: {tutor.classes}</span>
                      <span className="font-semibold text-primary">{tutor.price}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-auto p-4 pt-0 flex gap-3">
                    <Button variant="outline" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="default" className="flex-1">
                      <Phone className="w-4 h-4" />
                      Contact
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TutorsPage;
