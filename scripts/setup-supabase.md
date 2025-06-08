# Supabase CMS Setup Guide

This guide will help you set up Supabase as the backend for your CMS.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `easyiolabs-cms`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

## Step 2: Get Project Credentials

1. Go to Project Settings → API
2. Copy the following values:
   - Project URL
   - Project API keys (anon/public key)
   - Service role key (keep this secret!)

## Step 3: Update Environment Variables

Update your `.env.local` file with the actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Admin Configuration
ADMIN_EMAIL=admin@easyiolabs.com
ADMIN_PASSWORD=your_secure_admin_password
```

## Step 4: Set Up Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to execute the schema

## Step 5: Seed Initial Data

1. In the SQL Editor, create a new query
2. Copy and paste the contents of `database/seed.sql`
3. Click "Run" to populate initial data

## Step 6: Create Admin User

1. Go to Authentication → Users in your Supabase dashboard
2. Click "Add user"
3. Enter:
   - Email: `admin@easyiolabs.com` (or your preferred admin email)
   - Password: Your secure admin password
   - Email Confirm: Check this box
4. Click "Create user"

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/admin/login`
3. Login with your admin credentials
4. You should see the admin dashboard

## Step 8: Migrate Existing Content

The seed data includes one sample tutorial. To migrate your existing content:

1. Use the admin interface to create categories
2. Create tutorials using the rich text editor
3. Or use the API to bulk import content

## Security Notes

- Never commit your `.env.local` file to version control
- The service role key has admin privileges - keep it secure
- Row Level Security (RLS) is enabled to protect your data
- Only authenticated admin users can modify content

## Troubleshooting

### Database Connection Issues
- Verify your Supabase URL and keys are correct
- Check that your project is not paused (free tier limitation)

### Authentication Issues
- Ensure the admin email in your environment matches the user in Supabase
- Check that email confirmation is enabled for the admin user

### Content Not Showing
- Verify that tutorials are marked as "published"
- Check the browser console for any JavaScript errors

## Next Steps

Once setup is complete, you can:

1. **Create Content**: Use `/admin/dashboard` to manage tutorials
2. **Customize Categories**: Add/edit categories to organize content
3. **Import Existing Content**: Migrate your current tutorials to the database
4. **Configure SEO**: Update meta descriptions and titles
5. **Add Features**: Implement additional CMS features as needed

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Supabase project is active
3. Ensure all environment variables are set correctly
4. Check the Supabase logs in your project dashboard
