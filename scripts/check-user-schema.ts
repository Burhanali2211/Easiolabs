import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function checkUserSchema() {
  try {
    console.log('🔍 Checking users table schema...');
    
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    console.log('📋 Users table columns:');
    result.rows.forEach((row: any) => {
      console.log(`  ${row.column_name}: ${row.data_type}`);
    });
    
    const userData = await pool.query('SELECT * FROM users LIMIT 1');
    console.log('\n📊 Sample user data:');
    if (userData.rows.length > 0) {
      const user = userData.rows[0];
      console.log(`  ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Password field: ${user.password ? 'password' : user.password_hash ? 'password_hash' : 'neither'}`);
      console.log(`  Created: ${user.created_at}`);
    } else {
      console.log('  No users found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

checkUserSchema();
