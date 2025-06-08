@echo off
echo ========================================
echo EasyioLabs CMS - Database Setup Helper
echo ========================================
echo.

echo Step 1: Checking if PostgreSQL is installed...
where psql >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL not found in PATH
    echo.
    echo Please install PostgreSQL first:
    echo 1. Download from: https://www.postgresql.org/download/windows/
    echo 2. Run the installer and remember your password
    echo 3. Add PostgreSQL to your PATH
    echo.
    pause
    exit /b 1
)

echo ✅ PostgreSQL found
echo.

echo Step 2: Testing PostgreSQL connection...
psql -U postgres -c "SELECT version();" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Cannot connect to PostgreSQL
    echo.
    echo Please check:
    echo 1. PostgreSQL service is running
    echo 2. You have the correct password
    echo 3. Try: psql -U postgres
    echo.
    pause
    exit /b 1
)

echo ✅ PostgreSQL connection successful
echo.

echo Step 3: Creating database...
psql -U postgres -c "CREATE DATABASE easyiolabs_cms;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Database 'easyiolabs_cms' created successfully
) else (
    echo ℹ️ Database 'easyiolabs_cms' may already exist
)
echo.

echo Step 4: Running database setup script...
if not exist "database\setup.sql" (
    echo ❌ setup.sql not found
    echo Make sure you're running this from the project root directory
    pause
    exit /b 1
)

psql -U postgres -d easyiolabs_cms -f database\setup.sql
if %errorlevel% neq 0 (
    echo ❌ Failed to run setup script
    echo Please check the error messages above
    pause
    exit /b 1
)

echo ✅ Database setup completed successfully!
echo.

echo Step 5: Testing Node.js database connection...
call npm run test-db
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start the development server: npm run dev
echo 2. Visit: http://localhost:3000
echo 3. Admin login: http://localhost:3000/admin/login
echo 4. Credentials: admin@easyiolabs.com / admin123
echo 5. Migrate content: npm run migrate
echo.
pause
