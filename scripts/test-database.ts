/**
 * Database Connection Test Script
 *
 * This script tests the database connection and basic functionality.
 * Run this to verify your PostgreSQL setup is working correctly.
 *
 * Usage: npx tsx scripts/test-database.ts
 */

import { config } from 'dotenv';
import { query } from '../src/lib/supabase';

// Load environment variables
config({ path: '.env.local' });

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  console.log('📋 Environment check:');
  console.log(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   DB_PORT: ${process.env.DB_PORT || '5432'}`);
  console.log(`   DB_NAME: ${process.env.DB_NAME || 'easyiolabs_cms'}`);
  console.log(`   DB_USER: ${process.env.DB_USER || 'postgres'}`);
  console.log(`   DB_PASSWORD: ${process.env.DB_PASSWORD ? `[${process.env.DB_PASSWORD}]` : '[NOT SET]'}`);
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '[SET]' : '[NOT SET]'}`);
  console.log('');

  try {
    // Test basic connection
    const result = await query('SELECT NOW() as current_time');
    console.log('✅ Database connection successful');
    console.log(`   Current time: ${result.rows[0].current_time}`);

    // Test tables exist
    console.log('\n📋 Checking database tables...');
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const expectedTables = ['categories', 'pages', 'site_settings', 'tutorials', 'users'];
    const existingTables = tables.rows.map((row: { table_name: string }) => row.table_name);

    expectedTables.forEach(table => {
      if (existingTables.includes(table)) {
        console.log(`   ✅ ${table} table exists`);
      } else {
        console.log(`   ❌ ${table} table missing`);
      }
    });

    // Test data exists
    console.log('\n📊 Checking sample data...');

    const userCount = await query('SELECT COUNT(*) as count FROM users');
    console.log(`   Users: ${userCount.rows[0].count}`);

    const categoryCount = await query('SELECT COUNT(*) as count FROM categories');
    console.log(`   Categories: ${categoryCount.rows[0].count}`);

    const tutorialCount = await query('SELECT COUNT(*) as count FROM tutorials');
    console.log(`   Tutorials: ${tutorialCount.rows[0].count}`);

    // Test admin user exists
    const adminUser = await query('SELECT email, role FROM users WHERE role = $1', ['admin']);
    if (adminUser.rows.length > 0) {
      console.log(`   ✅ Admin user found: ${adminUser.rows[0].email}`);
    } else {
      console.log('   ❌ No admin user found');
    }

    // Test categories
    if (categoryCount.rows[0].count > 0) {
      const categories = await query('SELECT name, slug FROM categories ORDER BY order_index LIMIT 3');
      console.log('   Sample categories:');
      categories.rows.forEach((cat: { name: string, slug: string }) => {
        console.log(`     - ${cat.name} (${cat.slug})`);
      });
    }

    console.log('\n🎉 Database test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Visit http://localhost:3000');
    console.log('3. Login to admin: http://localhost:3000/admin/login');
    console.log('4. Use credentials: admin@easyiolabs.com / admin123');

  } catch (error) {
    console.error('❌ Database test failed:', error);

    if (error instanceof Error) {
      if (error.message.includes('SCRAM-SERVER-FIRST-MESSAGE')) {
        console.log('\n🔧 Password Authentication Issue:');
        console.log('1. Check your PostgreSQL password in .env.local');
        console.log('2. Make sure DB_PASSWORD matches your PostgreSQL installation password');
        console.log('3. If you forgot your password, reset it:');
        console.log('   psql -U postgres');
        console.log('   ALTER USER postgres PASSWORD \'newpassword\';');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.log('\n🔧 Connection Refused:');
        console.log('1. Make sure PostgreSQL is installed and running');
        console.log('2. Check if PostgreSQL service is started');
        console.log('3. Verify port 5432 is not blocked');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.log('\n🔧 Database Missing:');
        console.log('1. Create the database: createdb easyiolabs_cms');
        console.log('2. Or use psql: CREATE DATABASE easyiolabs_cms;');
      }
    }

    console.log('\n📚 General Troubleshooting:');
    console.log('1. Follow the setup guide: POSTGRESQL_SETUP_WINDOWS.md');
    console.log('2. Make sure PostgreSQL is running');
    console.log('3. Check your .env.local configuration');
    console.log('4. Verify the database exists: easyiolabs_cms');
    console.log('5. Run the setup script: psql -U postgres -d easyiolabs_cms -f database/setup.sql');
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDatabaseConnection();
}

export { testDatabaseConnection };
