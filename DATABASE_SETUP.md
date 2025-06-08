# EasyioLabs CMS - PostgreSQL Database Setup Guide

This guide will help you set up the local PostgreSQL database for the EasyioLabs CMS system.

## Prerequisites

1. **PostgreSQL Installation**
   - Download and install PostgreSQL from https://www.postgresql.org/download/
   - Make sure PostgreSQL service is running
   - Note your PostgreSQL username and password (default is usually `postgres`)

2. **Database Creation**
   ```bash
   # Connect to PostgreSQL as superuser
   psql -U postgres
   
   # Create the database
   CREATE DATABASE easyiolabs_cms;
   
   # Exit psql
   \q
   ```

## Environment Configuration

1. **Update .env.local**
   
   The `.env.local` file is already configured for local PostgreSQL. Update these values if your setup is different:
   
   ```env
   # PostgreSQL Database Configuration
   DATABASE_URL=postgresql://postgres:password@localhost:5432/easyiolabs_cms
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=easyiolabs_cms
   DB_USER=postgres
   DB_PASSWORD=password  # Change this to your actual PostgreSQL password
   
   # Admin Configuration
   ADMIN_EMAIL=admin@easyiolabs.com
   ADMIN_PASSWORD=admin123  # Change this to a secure password
   NEXT_PUBLIC_ADMIN_EMAIL=admin@easyiolabs.com
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Database Schema Setup

1. **Run the Setup Script**
   ```bash
   # Connect to your database
   psql -U postgres -d easyiolabs_cms
   
   # Run the setup script
   \i database/setup.sql
   
   # Exit psql
   \q
   ```

   This script will:
   - Create all necessary tables (users, categories, tutorials, pages, site_settings)
   - Set up indexes and triggers
   - Create a default admin user (admin@easyiolabs.com / admin123)
   - Insert default categories
   - Add default site settings

## Content Migration

1. **Run the Migration Script**
   ```bash
   npm run migrate
   ```

   This will populate the database with sample tutorials and content.

## Verification

1. **Check Database Tables**
   ```bash
   psql -U postgres -d easyiolabs_cms -c "\dt"
   ```

   You should see these tables:
   - categories
   - tutorials
   - pages
   - site_settings
   - users

2. **Check Sample Data**
   ```bash
   psql -U postgres -d easyiolabs_cms -c "SELECT name FROM categories;"
   psql -U postgres -d easyiolabs_cms -c "SELECT title FROM tutorials;"
   ```

## Starting the Application

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Access the Application**
   - Frontend: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login
   - Admin Dashboard: http://localhost:3000/admin/dashboard

3. **Default Admin Credentials**
   - Email: admin@easyiolabs.com
   - Password: admin123

## Production Deployment

When deploying to production, update these environment variables:

```env
# Production PostgreSQL (e.g., Railway, Heroku, AWS RDS)
DATABASE_URL=postgresql://username:password@host:port/database_name

# Secure JWT Secret
JWT_SECRET=your-production-jwt-secret-key

# Production URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Secure Admin Password
ADMIN_PASSWORD=your-secure-production-password
```

## Troubleshooting

1. **Connection Issues**
   - Ensure PostgreSQL is running: `sudo service postgresql status`
   - Check if database exists: `psql -U postgres -l`
   - Verify credentials in .env.local

2. **Permission Issues**
   - Make sure the PostgreSQL user has necessary permissions
   - Grant permissions: `GRANT ALL PRIVILEGES ON DATABASE easyiolabs_cms TO postgres;`

3. **Migration Errors**
   - Check if tables exist: `\dt` in psql
   - Re-run setup script if needed
   - Check console logs for specific errors

## Features Included

✅ **Phase 1 Complete:**
- Local PostgreSQL integration
- User authentication with JWT
- Admin interface
- Content management (CRUD operations)
- Dynamic routing for tutorials and categories
- Search functionality

✅ **Phase 2 Complete:**
- Content migration system
- Complete admin features
- SEO-friendly pages
- Responsive design
- Error handling

## Next Steps

1. Test all functionality in the admin interface
2. Create and publish your first tutorial
3. Customize categories and settings
4. Add your own content
5. Deploy to production when ready
