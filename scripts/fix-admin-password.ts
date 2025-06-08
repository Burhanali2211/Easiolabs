import { Pool } from 'pg';
import { config } from 'dotenv';
import bcrypt from 'bcryptjs';

config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function fixAdminPassword() {
  try {
    console.log('🔧 Fixing admin user password...');
    
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      10
    );
    
    const result = await pool.query(`
      UPDATE users 
      SET password_hash = $1 
      WHERE email = $2
      RETURNING email, role
    `, [hashedPassword, process.env.ADMIN_EMAIL || 'admin@easyiolabs.com']);
    
    if (result.rows.length > 0) {
      console.log(`✅ Password updated for: ${result.rows[0].email}`);
      console.log(`   Role: ${result.rows[0].role}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    } else {
      console.log('❌ Admin user not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

fixAdminPassword();
