# PostgreSQL Setup Guide for Windows

This guide will help you install and configure PostgreSQL on Windows for the EasyioLabs CMS.

## Step 1: Install PostgreSQL

### Option A: Download from Official Website (Recommended)

1. **Download PostgreSQL**
   - Go to https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Download the latest version (15.x or 16.x)

2. **Run the Installer**
   - Run the downloaded `.exe` file as Administrator
   - Follow the installation wizard:
     - Choose installation directory (default is fine)
     - Select components (keep all selected)
     - Choose data directory (default is fine)
     - **Set a password for the postgres user** (remember this!)
     - Set port to 5432 (default)
     - Choose locale (default is fine)

3. **Complete Installation**
   - Let the installer finish
   - When prompted, you can skip Stack Builder for now

### Option B: Using Chocolatey (if you have it)

```powershell
# Run PowerShell as Administrator
choco install postgresql
```

## Step 2: Verify PostgreSQL Installation

1. **Check if PostgreSQL is running**
   ```powershell
   # Open PowerShell and run:
   Get-Service postgresql*
   ```
   You should see a service running.

2. **Test connection**
   ```powershell
   # Open Command Prompt or PowerShell
   psql -U postgres
   ```
   Enter the password you set during installation.

## Step 3: Create the Database

1. **Connect to PostgreSQL**
   ```bash
   psql -U postgres
   ```

2. **Create the database**
   ```sql
   CREATE DATABASE easyiolabs_cms;
   \q
   ```

## Step 4: Update Environment Variables

Update your `.env.local` file with the correct password:

```env
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/easyiolabs_cms
DB_HOST=localhost
DB_PORT=5432
DB_NAME=easyiolabs_cms
DB_USER=postgres
DB_PASSWORD=YOUR_ACTUAL_PASSWORD

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Admin Configuration
ADMIN_EMAIL=admin@easyiolabs.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_EMAIL=admin@easyiolabs.com

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Replace `YOUR_ACTUAL_PASSWORD` with the password you set during PostgreSQL installation.**

## Step 5: Run Database Setup

1. **Navigate to your project directory**
   ```bash
   cd D:\ATL\easyio.atl\easyio-atl-electronics
   ```

2. **Run the database setup script**
   ```bash
   psql -U postgres -d easyiolabs_cms -f database/setup.sql
   ```
   Enter your PostgreSQL password when prompted.

## Step 6: Test the Connection

```bash
npm run test-db
```

You should see:
```
🔍 Testing database connection...
✅ Database connection successful
📋 Checking database tables...
   ✅ categories table exists
   ✅ pages table exists
   ✅ site_settings table exists
   ✅ tutorials table exists
   ✅ users table exists
```

## Troubleshooting

### Issue 1: "psql is not recognized"
**Solution:** Add PostgreSQL to your PATH
1. Find your PostgreSQL installation (usually `C:\Program Files\PostgreSQL\15\bin`)
2. Add this path to your Windows PATH environment variable
3. Restart your terminal

### Issue 2: "Connection refused"
**Solution:** Start PostgreSQL service
```powershell
# Run as Administrator
Start-Service postgresql-x64-15  # or similar service name
```

### Issue 3: "Authentication failed"
**Solution:** Check your password
- Make sure you're using the correct password set during installation
- Try resetting the postgres user password:
  ```bash
  # As Administrator
  psql -U postgres
  ALTER USER postgres PASSWORD 'newpassword';
  ```

### Issue 4: "Database does not exist"
**Solution:** Create the database
```bash
psql -U postgres
CREATE DATABASE easyiolabs_cms;
\q
```

### Issue 5: "Permission denied"
**Solution:** Run as Administrator
- Open Command Prompt or PowerShell as Administrator
- Try the commands again

## Alternative: Using pgAdmin (GUI Tool)

If you prefer a graphical interface:

1. **Install pgAdmin** (usually included with PostgreSQL)
2. **Connect to PostgreSQL**
   - Server: localhost
   - Port: 5432
   - Username: postgres
   - Password: [your password]
3. **Create database** using the GUI
4. **Run SQL script** by opening `database/setup.sql` in pgAdmin

## Quick Commands Reference

```bash
# Connect to PostgreSQL
psql -U postgres

# Connect to specific database
psql -U postgres -d easyiolabs_cms

# List databases
\l

# List tables in current database
\dt

# Exit psql
\q

# Run SQL file
psql -U postgres -d easyiolabs_cms -f database/setup.sql
```

## Next Steps

Once PostgreSQL is set up and the database test passes:

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Admin: http://localhost:3000/admin/login
   - Credentials: admin@easyiolabs.com / admin123

3. **Migrate sample content**
   ```bash
   npm run migrate
   ```

## Need Help?

If you're still having issues:
1. Check the PostgreSQL service is running
2. Verify your password is correct
3. Make sure the database exists
4. Check Windows Firewall isn't blocking PostgreSQL
5. Try connecting with pgAdmin first to verify basic connectivity
