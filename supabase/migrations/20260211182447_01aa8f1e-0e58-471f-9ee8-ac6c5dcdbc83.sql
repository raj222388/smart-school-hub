
CREATE TABLE public.tutors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  classes text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  rating numeric NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  experience text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  verified boolean NOT NULL DEFAULT false,
  plan text NOT NULL DEFAULT 'Monthly',
  image text DEFAULT NULL,
  bio text DEFAULT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active tutors" ON public.tutors
FOR SELECT USING (is_active = true);

CREATE POLICY "Super admins can manage all tutors" ON public.tutors
FOR ALL USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE TRIGGER update_tutors_updated_at
BEFORE UPDATE ON public.tutors
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed initial tutors
INSERT INTO public.tutors (name, subject, classes, location, rating, reviews, experience, price, verified, plan, image, bio) VALUES
('Dr. Priya Sharma', 'Mathematics', '9th - 12th', 'Delhi', 4.9, 120, '15+ years', '₹500/hr', true, 'Lifetime', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 'PhD in Mathematics with expertise in competitive exam preparation.'),
('Rajesh Kumar', 'Physics', '11th - 12th', 'Mumbai', 4.8, 95, '12 years', '₹450/hr', true, 'Yearly', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', 'Former IIT professor with passion for making physics simple and fun.'),
('Anita Gupta', 'English', '1st - 8th', 'Bangalore', 4.9, 150, '10 years', '₹350/hr', true, 'Monthly', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face', 'Certified English language trainer with focus on spoken English.'),
('Vikram Singh', 'Chemistry', '9th - 12th', 'Chennai', 4.7, 80, '8 years', '₹400/hr', true, 'Yearly', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', 'Chemistry enthusiast who makes organic and inorganic chemistry easy.'),
('Meera Reddy', 'Biology', '11th - 12th', 'Hyderabad', 4.8, 110, '14 years', '₹450/hr', true, 'Lifetime', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', 'Medical doctor turned educator, specializing in NEET preparation.'),
('Arjun Menon', 'Computer Science', '9th - 12th', 'Kochi', 4.9, 75, '6 years', '₹500/hr', true, 'Monthly', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face', 'Software engineer teaching programming and computer fundamentals.');
