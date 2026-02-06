import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import SchoolsPreview from "@/components/landing/SchoolsPreview";
import TutorPreview from "@/components/landing/TutorPreview";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <SchoolsPreview />
      <TutorPreview />
      <Footer />
    </div>
  );
};

export default Index;
