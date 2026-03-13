-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  one_liner VARCHAR(80) NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  chains TEXT[] DEFAULT '{}',
  types TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'coming_soon',
  tags TEXT[] DEFAULT '{}',
  dev_slugs TEXT[] DEFAULT '{}',
  links JSONB DEFAULT '{}',
  media JSONB DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  trending_score INTEGER DEFAULT 0
);

-- Create developers table
CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  bio TEXT,
  roles TEXT[] DEFAULT '{}',
  chains TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  links JSONB DEFAULT '{}',
  avatar_url TEXT,
  featured_project_slugs TEXT[] DEFAULT '{}',
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure 'approved' column exists even if tables were already created
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='approved') THEN
    ALTER TABLE projects ADD COLUMN approved BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='developers' AND column_name='approved') THEN
    ALTER TABLE developers ADD COLUMN approved BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;

-- Create Policies (Fresh Start)
DROP POLICY IF EXISTS "Public Read Access" ON projects;
DROP POLICY IF EXISTS "Allow Public Submissions" ON projects;
DROP POLICY IF EXISTS "Public Read Access" ON developers;
DROP POLICY IF EXISTS "Allow Public Submissions" ON developers;

CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (approved = true);
CREATE POLICY "Public Read Access" ON developers FOR SELECT USING (approved = true);
CREATE POLICY "Allow Public Submissions" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Submissions" ON developers FOR INSERT WITH CHECK (true);

-- Admin Policies (Full access for now, can be restricted later with Auth)
CREATE POLICY "Admin Full Access" ON projects FOR ALL USING (true);
CREATE POLICY "Admin Full Access" ON developers FOR ALL USING (true);
