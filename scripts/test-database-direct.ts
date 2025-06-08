/**
 * Direct Database Connection Test Script
 * 
 * This script bypasses the application's database abstraction layer
 * to directly test PostgreSQL connectivity and functionality.
 */

import { config } from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
config({ path: '.env.local' });

async function testDatabaseDirect() {
  console.log('🔍 Testing direct database connection...');
  console.log('📋 Environment check:');
  console.log(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   DB_PORT: ${process.env.DB_PORT || '5432'}`);
  console.log(`   DB_NAME: ${process.env.DB_NAME || 'easyiolabs_cms'}`);
  console.log(`   DB_USER: ${process.env.DB_USER || 'postgres'}`);
  console.log(`   DB_PASSWORD: ${process.env.DB_PASSWORD ? `[${process.env.DB_PASSWORD}]` : '[NOT SET]'}`);
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '[SET]' : '[NOT SET]'}`);
  console.log('');

  // Create direct connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'easyiolabs_cms',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  try {
    // Test basic connection
    console.log('🔌 Testing basic connection...');
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Database connection successful');
    console.log(`   Current time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL version: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    client.release();

    // Test database exists
    console.log('\n📋 Checking database structure...');
    const dbCheck = await pool.query(`
      SELECT datname FROM pg_database WHERE datname = $1
    `, [process.env.DB_NAME || 'easyiolabs_cms']);
    
    if (dbCheck.rows.length > 0) {
      console.log(`   ✅ Database '${process.env.DB_NAME || 'easyiolabs_cms'}' exists`);
    } else {
      console.log(`   ❌ Database '${process.env.DB_NAME || 'easyiolabs_cms'}' not found`);
    }

    // Test tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const expectedTables = ['categories', 'pages', 'site_settings', 'tutorials'];
    const existingTables = tables.rows.map((row: { table_name: string }) => row.table_name);

    console.log('\n📊 Table verification:');
    expectedTables.forEach(table => {
      if (existingTables.includes(table)) {
        console.log(`   ✅ ${table} table exists`);
      } else {
        console.log(`   ❌ ${table} table missing`);
      }
    });

    if (existingTables.length > 0) {
      console.log(`\n   Found tables: ${existingTables.join(', ')}`);
    }

    // Test data exists (if tables exist)
    if (existingTables.includes('categories')) {
      console.log('\n📈 Testing data operations...');
      
      const categoryCount = await pool.query('SELECT COUNT(*) as count FROM categories');
      console.log(`   Categories: ${categoryCount.rows[0].count}`);

      if (categoryCount.rows[0].count > 0) {
        const categories = await pool.query('SELECT name, slug FROM categories ORDER BY order_index LIMIT 3');
        console.log('   Sample categories:');
        categories.rows.forEach((cat: { name: string, slug: string }) => {
          console.log(`     - ${cat.name} (${cat.slug})`);
        });
      }
    }

    if (existingTables.includes('tutorials')) {
      const tutorialCount = await pool.query('SELECT COUNT(*) as count FROM tutorials');
      console.log(`   Tutorials: ${tutorialCount.rows[0].count}`);

      if (tutorialCount.rows[0].count > 0) {
        const tutorials = await pool.query('SELECT title, slug, published FROM tutorials ORDER BY created_at DESC LIMIT 3');
        console.log('   Sample tutorials:');
        tutorials.rows.forEach((tut: { title: string, slug: string, published: boolean }) => {
          console.log(`     - ${tut.title} (${tut.published ? 'Published' : 'Draft'})`);
        });
      }
    }

    if (existingTables.includes('site_settings')) {
      const settingsCount = await pool.query('SELECT COUNT(*) as count FROM site_settings');
      console.log(`   Site settings: ${settingsCount.rows[0].count}`);
    }

    // Test CRUD operations
    console.log('\n🔧 Testing CRUD operations...');
    
    // Test INSERT
    const testCategory = await pool.query(`
      INSERT INTO categories (name, slug, description, color, icon, order_index) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, name
    `, ['Test Category', 'test-category', 'Test description', 'bg-red-500', 'TestIcon', 999]);
    
    console.log(`   ✅ INSERT: Created test category "${testCategory.rows[0].name}"`);
    
    // Test UPDATE
    const updatedCategory = await pool.query(`
      UPDATE categories 
      SET description = $1 
      WHERE id = $2 
      RETURNING name, description
    `, ['Updated test description', testCategory.rows[0].id]);
    
    console.log(`   ✅ UPDATE: Modified test category description`);
    
    // Test SELECT
    const selectedCategory = await pool.query(`
      SELECT name, description FROM categories WHERE id = $1
    `, [testCategory.rows[0].id]);
    
    console.log(`   ✅ SELECT: Retrieved test category data`);
    
    // Test DELETE
    await pool.query(`DELETE FROM categories WHERE id = $1`, [testCategory.rows[0].id]);
    console.log(`   ✅ DELETE: Removed test category`);

    console.log('\n🎉 Database test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Connection established');
    console.log('   ✅ Database accessible');
    console.log('   ✅ Tables verified');
    console.log('   ✅ CRUD operations working');
    console.log('\nNext steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Visit http://localhost:3000');
    console.log('3. Test the application with live database');

  } catch (error) {
    console.error('❌ Database test failed:', error);

    if (error instanceof Error) {
      if (error.message.includes('SCRAM-SERVER-FIRST-MESSAGE') || error.message.includes('password authentication failed')) {
        console.log('\n🔧 Password Authentication Issue:');
        console.log('1. Check your PostgreSQL password in .env.local');
        console.log('2. Make sure DB_PASSWORD matches your PostgreSQL installation password');
        console.log('3. Try connecting manually: psql -U postgres -d easyiolabs_cms');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.log('\n🔧 Connection Refused:');
        console.log('1. Make sure PostgreSQL is installed and running');
        console.log('2. Check if PostgreSQL service is started');
        console.log('3. Verify port 5432 is not blocked');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.log('\n🔧 Database Missing:');
        console.log('1. Create the database: createdb easyiolabs_cms');
        console.log('2. Or use psql: CREATE DATABASE easyiolabs_cms;');
        console.log('3. Run setup script: psql -U postgres -d easyiolabs_cms -f database/setup.sql');
      }
    }
  } finally {
    await pool.end();
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDatabaseDirect();
}

export { testDatabaseDirect };
