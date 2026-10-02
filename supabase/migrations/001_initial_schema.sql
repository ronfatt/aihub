-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '打开演示页面，亲自探索与体验',
  url TEXT NOT NULL,
  cover_image TEXT,
  category TEXT DEFAULT '待分类',
  tags TEXT[] DEFAULT '{}',
  screenshots JSONB DEFAULT '[]'::jsonb, -- Array of { url: string, alt: string }
  suitable_for TEXT[] DEFAULT '{}',     -- 适合哪些老师或服务场景
  custom_directions TEXT[] DEFAULT '{}', -- 可讨论的定制方向
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  accent_color TEXT DEFAULT '#173D35',
  cover_pattern TEXT DEFAULT 'wave',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create site_settings table for brand info and WhatsApp
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for projects
-- Public visitors can only view published/visible projects
CREATE POLICY "Public can view visible projects"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (visible = true);

-- Authenticated admins can perform all actions
CREATE POLICY "Admins have full access to projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 5. RLS Policies for site_settings
-- Public can read site_settings
CREATE POLICY "Public can view site settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated admins can update site_settings
CREATE POLICY "Admins have full access to site settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 6. Storage bucket setup (for covers and screenshots)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read media
CREATE POLICY "Public can view project media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'project-media');

-- Authenticated users can upload media
CREATE POLICY "Admins can upload project media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-media');

-- Authenticated users can update media
CREATE POLICY "Admins can update project media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-media');

-- Authenticated users can delete media
CREATE POLICY "Admins can delete project media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-media');
