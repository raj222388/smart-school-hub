
-- Add status and contact fields to tutors table
ALTER TABLE public.tutors 
ADD COLUMN status text NOT NULL DEFAULT 'pending',
ADD COLUMN email text DEFAULT NULL,
ADD COLUMN phone text DEFAULT NULL;

-- Update existing tutors to approved status
UPDATE public.tutors SET status = 'approved' WHERE status = 'pending';

-- Drop existing SELECT policy and recreate to only show approved+active tutors
DROP POLICY IF EXISTS "Everyone can view active tutors" ON public.tutors;
CREATE POLICY "Everyone can view approved active tutors" ON public.tutors
FOR SELECT USING (is_active = true AND status = 'approved');

-- Allow anonymous INSERT for tutor applications
CREATE POLICY "Anyone can apply as tutor" ON public.tutors
FOR INSERT WITH CHECK (status = 'pending');
