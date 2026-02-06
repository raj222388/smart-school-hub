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
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const tutors = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    subject: "Mathematics",
    classes: "9th - 12th",
    location: "Delhi",
    rating: 4.9,
    reviews: 120,
    experience: "15+ years",
    price: "₹500/hr",
    verified: true,
    plan: "Lifetime",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    bio: "PhD in Mathematics with expertise in competitive exam preparation. Specializes in IIT-JEE and board exams.",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    subject: "Physics",
    classes: "11th - 12th",
    location: "Mumbai",
    rating: 4.8,
    reviews: 95,
    experience: "12 years",
    price: "₹450/hr",
    verified: true,
    plan: "Yearly",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Former IIT professor with passion for making physics simple and fun for students.",
  },
  {
    id: "3",
    name: "Anita Gupta",
    subject: "English",
    classes: "1st - 8th",
    location: "Bangalore",
    rating: 4.9,
    reviews: 150,
    experience: "10 years",
    price: "₹350/hr",
    verified: true,
    plan: "Monthly",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    bio: "Certified English language trainer with focus on spoken English and grammar fundamentals.",
  },
  {
    id: "4",
    name: "Vikram Singh",
    subject: "Chemistry",
    classes: "9th - 12th",
    location: "Chennai",
    rating: 4.7,
    reviews: 80,
    experience: "8 years",
    price: "₹400/hr",
    verified: true,
    plan: "Yearly",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Chemistry enthusiast who makes organic and inorganic chemistry easy to understand.",
  },
  {
    id: "5",
    name: "Meera Reddy",
    subject: "Biology",
    classes: "11th - 12th",
    location: "Hyderabad",
    rating: 4.8,
    reviews: 110,
    experience: "14 years",
    price: "₹450/hr",
    verified: true,
    plan: "Lifetime",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Medical doctor turned educator, specializing in NEET preparation and medical entrance exams.",
  },
  {
    id: "6",
    name: "Arjun Menon",
    subject: "Computer Science",
    classes: "9th - 12th",
    location: "Kochi",
    rating: 4.9,
    reviews: 75,
    experience: "6 years",
    price: "₹500/hr",
    verified: true,
    plan: "Monthly",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    bio: "Software engineer from top tech company, teaching programming and computer fundamentals.",
  },
];

const subjects = ["All Subjects", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
const locations = ["All Locations", "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kochi"];

const TutorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

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
