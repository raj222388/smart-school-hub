-- Create learning_videos table
CREATE TABLE public.learning_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  age_group TEXT NOT NULL DEFAULT 'All Ages',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create marketplace_products table
CREATE TABLE public.marketplace_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  minimum_order INTEGER NOT NULL DEFAULT 1,
  stock INTEGER NOT NULL DEFAULT 0,
  cod_available BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

-- Learning videos policies
CREATE POLICY "Super admins can manage all videos"
  ON public.learning_videos FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Everyone can view videos"
  ON public.learning_videos FOR SELECT
  USING (true);

-- Marketplace products policies
CREATE POLICY "Super admins can manage all products"
  ON public.marketplace_products FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Everyone can view active products"
  ON public.marketplace_products FOR SELECT
  USING (is_active = true);

-- Triggers for updated_at
CREATE TRIGGER update_learning_videos_updated_at
  BEFORE UPDATE ON public.learning_videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_marketplace_products_updated_at
  BEFORE UPDATE ON public.marketplace_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();