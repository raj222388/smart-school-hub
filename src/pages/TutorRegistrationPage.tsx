import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, CheckCircle, Clock, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Computer Science", "Hindi", "Social Science",
];

const plans = [
  { id: "Monthly", price: "₹499/month", description: "Perfect for trying out the platform" },
  { id: "Yearly", price: "₹3,999/year", description: "Save 33% with annual billing" },
  { id: "Lifetime", price: "₹9,999 one-time", description: "Best value – pay once, teach forever" },
];

const TutorRegistrationPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    classes: "",
    location: "",
    experience: "",
    price: "",
    bio: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.subject || !form.phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (form.name.length > 100 || form.email.length > 255 || form.bio.length > 1000) {
      toast.error("Input exceeds maximum length");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("tutors").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject,
      classes: form.classes.trim(),
      location: form.location.trim(),
      experience: form.experience.trim(),
      price: form.price.trim(),
      bio: form.bio.trim(),
      image: form.image.trim() || null,
      plan: selectedPlan,
      status: "pending",
      is_active: false,
      verified: false,
      rating: 0,
      reviews: 0,
    });

    setLoading(false);
    if (error) {
      toast.error("Failed to submit application. Please try again.");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for applying as a tutor. Our admin team will review your application
              and get back to you soon. You'll be visible on the platform once approved.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Typical review time: 24-48 hours</span>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Become a Tutor
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Join our platform and connect with thousands of students. Choose a subscription plan and start teaching.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* Plan selection */}
          <h2 className="text-xl font-bold text-foreground mb-4">1. Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-5 cursor-pointer transition-all border-2 ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:border-muted-foreground/20"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={selectedPlan === plan.id ? "default" : "secondary"}>{plan.id}</Badge>
                  {plan.id === "Lifetime" && (
                    <Badge variant="outline" className="text-xs">Best Value</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xl font-bold text-foreground mb-1">
                  <IndianRupee className="w-4 h-4" />
                  {plan.price.replace("₹", "")}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </Card>
            ))}
          </div>

          {/* Registration form */}
          <h2 className="text-xl font-bold text-foreground mb-4">2. Your Details</h2>
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <Label>Full Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Dr. Priya Sharma"
                  maxLength={100}
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="priya@example.com"
                  maxLength={255}
                  required
                />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  maxLength={20}
                  required
                />
              </div>
              <div>
                <Label>Subject *</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Classes You Teach</Label>
                <Input
                  value={form.classes}
                  onChange={(e) => setForm({ ...form, classes: e.target.value })}
                  placeholder="e.g. 9th - 12th"
                  maxLength={50}
                />
              </div>
              <div>
                <Label>Location / City</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Delhi"
                  maxLength={100}
                />
              </div>
              <div>
                <Label>Experience</Label>
                <Input
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="e.g. 10 years"
                  maxLength={50}
                />
              </div>
              <div>
                <Label>Hourly Rate</Label>
                <Input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. ₹500/hr"
                  maxLength={30}
                />
              </div>
              <div className="col-span-2">
                <Label>Profile Image URL</Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  maxLength={500}
                />
              </div>
              <div className="col-span-2">
                <Label>About You</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell students about your teaching style, qualifications, and achievements..."
                  rows={4}
                  maxLength={1000}
                />
              </div>
              <div className="col-span-2">
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Your application will be reviewed by our admin team before going live.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TutorRegistrationPage;
