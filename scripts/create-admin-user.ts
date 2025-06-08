/**
 * Create Admin User Script
 * 
 * This script creates an admin user for testing the authentication system.
 */

import { config } from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Load environment variables
config({ path: '.env.local' });

async function createAdminUser() {
  console.log('🔧 Creating admin user...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'easyiolabs_cms',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
  });

  try {
    // Check if users table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('📋 Users table does not exist. Creating...');
      await pool.query(`
        CREATE TABLE users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      console.log('✅ Users table created');
    }

    // Check if admin user already exists
    const existingUser = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [process.env.ADMIN_EMAIL || 'admin@easyiolabs.com']
    );

    if (existingUser.rows.length > 0) {
      console.log(`✅ Admin user already exists: ${existingUser.rows[0].email}`);
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'admin123',
        10
      );

      await pool.query(`
        INSERT INTO users (email, password_hash, role)
        VALUES ($1, $2, $3)
      `, [
        process.env.ADMIN_EMAIL || 'admin@easyiolabs.com',
        hashedPassword,
        'admin'
      ]);

      console.log(`✅ Admin user created: ${process.env.ADMIN_EMAIL || 'admin@easyiolabs.com'}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    }

    // List all users
    const allUsers = await pool.query('SELECT email, role, created_at FROM users ORDER BY created_at');
    console.log('\n📋 Current users:');
    allUsers.rows.forEach((user: any) => {
      console.log(`   - ${user.email} (${user.role}) - Created: ${user.created_at.toISOString().split('T')[0]}`);
    });

    console.log('\n🎉 Admin user setup completed!');
    console.log('\nNext steps:');
    console.log('1. Visit http://localhost:3001/admin/login');
    console.log(`2. Login with: ${process.env.ADMIN_EMAIL || 'admin@easyiolabs.com'}`);
    console.log(`3. Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await pool.end();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  createAdminUser();
}

export { createAdminUser };
