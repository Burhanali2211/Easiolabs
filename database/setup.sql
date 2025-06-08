-- EasyioLabs CMS Database Setup Script
-- Run this script in your PostgreSQL database to set up the complete CMS

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS tutorials CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(50) DEFAULT 'bg-blue-500',
  icon VARCHAR(50) DEFAULT 'BookOpen',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutorials table
CREATE TABLE tutorials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  author VARCHAR(255) DEFAULT 'EasyioLabs',
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  difficulty VARCHAR(20) DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  duration VARCHAR(50),
  published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages table (for static pages like About, Contact, etc.)
CREATE TABLE pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tutorials_category_id ON tutorials(category_id);
CREATE INDEX idx_tutorials_published ON tutorials(published);
CREATE INDEX idx_tutorials_slug ON tutorials(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutorials_updated_at BEFORE UPDATE ON tutorials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (email, password_hash, role) VALUES 
('admin@easyiolabs.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon, order_index) VALUES 
('Electronics 101', 'electronics-101', 'Complete beginner? Start here! Step-by-step lessons from absolute basics to building your first circuits.', 'bg-green-500', 'BookOpen', 0),
('Arduino', 'arduino', 'If this is your first experience tinkering with electronics, Arduino is the best platform you can start playing with.', 'bg-blue-500', 'Cpu', 1),
('ESP32', 'esp32', 'Building a sensor network? Want to create a BLE device? ESP32 is your one-stop-solution for many IoT apps.', 'bg-indigo-500', 'Wifi', 2),
('ESP8266', 'esp8266', 'The ESP8266 is the easiest point of entry to basic IoT. It is great for beginners and advanced users alike.', 'bg-purple-500', 'Zap', 3),
('Basic Electronics', 'basic-electronics', 'Fundamental electronic concepts, components, and circuit theory.', 'bg-orange-500', 'CircuitBoard', 4);

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES 
('site_title', 'EasyioLabs - Learn Electronics the Easy Way', 'Main site title'),
('site_description', 'Quick, easy and to the point electronics tutorials for Arduino, ESP32, ESP8266, and basic electronics.', 'Site meta description'),
('contact_email', 'contact@easyiolabs.com', 'Contact email address'),
('social_twitter', '@easyiolabs', 'Twitter handle'),
('social_github', 'https://github.com/easyiolabs', 'GitHub URL'),
('analytics_id', '', 'Google Analytics ID'),
('featured_tutorial_count', '6', 'Number of featured tutorials to show on homepage');

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutorial_id UUID NOT NULL REFERENCES tutorials(id) ON DELETE CASCADE,
  user_ip VARCHAR(45) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tutorial_id, user_ip)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutorial_id UUID NOT NULL REFERENCES tutorials(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create bookmarks table (using IP for anonymous users)
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutorial_id UUID NOT NULL REFERENCES tutorials(id) ON DELETE CASCADE,
  user_ip VARCHAR(45) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tutorial_id, user_ip)
);

-- Create tutorial progress table
CREATE TABLE IF NOT EXISTS tutorial_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutorial_id UUID NOT NULL REFERENCES tutorials(id) ON DELETE CASCADE,
  user_ip VARCHAR(45) NOT NULL,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed BOOLEAN DEFAULT false,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tutorial_id, user_ip)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_ratings_tutorial_id ON ratings(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_comments_tutorial_id ON comments(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_bookmarks_tutorial_id ON bookmarks(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_ip ON bookmarks(user_ip);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_tutorial_id ON tutorial_progress(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user_ip ON tutorial_progress(user_ip);

-- Add rating statistics to tutorials table
ALTER TABLE tutorials ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0;
ALTER TABLE tutorials ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;

-- Success message
SELECT 'Database setup completed successfully!' as message;
-- Analytics tables
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_url VARCHAR(500) NOT NULL,
    page_title VARCHAR(200),
    user_ip INET NOT NULL,
    user_agent TEXT,
    referrer VARCHAR(500),
    session_id VARCHAR(100),
    duration INTEGER, -- in seconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    user_ip INET NOT NULL,
    user_agent TEXT,
    page_url VARCHAR(500) NOT NULL,
    referrer VARCHAR(500),
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content versioning tables
CREATE TABLE IF NOT EXISTS content_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL, -- 'tutorial', 'page', 'category'
    content_id UUID NOT NULL,
    version_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_id, version_number)
);

-- Scheduled content table
CREATE TABLE IF NOT EXISTS scheduled_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'publish', 'unpublish', 'delete'
    scheduled_for TIMESTAMP NOT NULL,
    executed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content approval workflow
CREATE TABLE IF NOT EXISTS content_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    reviewer_id UUID REFERENCES users(id),
    reviewer_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Internationalization tables
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL, -- 'en', 'es', 'fr', etc.
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language_id UUID REFERENCES languages(id) ON DELETE CASCADE,
    translation_key VARCHAR(200) NOT NULL,
    translation_value TEXT NOT NULL,
    context VARCHAR(100), -- 'ui', 'content', 'meta'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(language_id, translation_key)
);

CREATE TABLE IF NOT EXISTS content_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    language_id UUID REFERENCES languages(id) ON DELETE CASCADE,
    title VARCHAR(200),
    content TEXT,
    description TEXT,
    metadata JSONB,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_type, content_id, language_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tutorials_published ON tutorials(published);
CREATE INDEX IF NOT EXISTS idx_tutorials_category ON tutorials(category_id);
CREATE INDEX IF NOT EXISTS idx_tutorials_slug ON tutorials(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_comments_tutorial ON comments(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_ip);
CREATE INDEX IF NOT EXISTS idx_progress_user ON tutorial_progress(user_ip);
CREATE INDEX IF NOT EXISTS idx_ratings_tutorial ON ratings(tutorial_id);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_date ON analytics_events(created_at);

-- Content management indexes
CREATE INDEX IF NOT EXISTS idx_content_versions_content ON content_versions(content_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_content_time ON scheduled_content(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_content_approvals_status ON content_approvals(status);

-- i18n indexes
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(translation_key);
CREATE INDEX IF NOT EXISTS idx_content_translations_content ON content_translations(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_content_translations_lang ON content_translations(language_id);

-- Insert default language
INSERT INTO languages (code, name, native_name, enabled, is_default)
VALUES ('en', 'English', 'English', true, true)
ON CONFLICT (code) DO NOTHING;

SELECT 'Default admin user created: admin@easyiolabs.com / admin123' as admin_info;
SELECT 'You can now run the migration script to add sample content.' as next_step;
