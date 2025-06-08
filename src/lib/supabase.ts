// Re-export types from separate file to avoid client-side imports
export type { Tutorial, Category, Page, SiteSettings, User } from './types';

// Only import pg on the server side
let pool: any = null;
let db: any = null;

// Check if we're on the server side and not during build phase
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  try {
    // Dynamic import for server-side only
    const { Pool } = require('pg');

    // Only create database connection if we have database configuration
    const hasDbConfig = process.env.DATABASE_URL ||
                       (process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER);

    if (hasDbConfig) {
      // Database connection pool
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'easyiolabs_cms',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'admin',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000, // Increased timeout
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
          ca: process.env.DB_CA_CERT || undefined
        } : false,
      });

      db = pool;
    } else {
      console.log('Database configuration not found, skipping database initialization');
    }
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    db = null;
  }
}

export { db };

// Database query helper functions
export async function query(text: string, params?: any[]) {
  // Skip database operations during build time or on client side
  if (typeof window !== 'undefined') {
    console.log('Skipping database query on client side:', text);
    return { rows: [] };
  }

  // Skip database operations during build time if no database URL is provided
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    console.log('Skipping database query in production build without DATABASE_URL:', text);
    return { rows: [] };
  }

  // Skip database operations during Next.js build process
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.log('Skipping database query during build phase:', text);
    return { rows: [] };
  }

  // Check if database is available
  if (!db) {
    console.log('Database not available, skipping query:', text);
    return { rows: [] };
  }

  try {
    const client = await db.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database query error:', error);
    // Return empty result instead of throwing during build
    return { rows: [] };
  }
}

export async function getClient() {
  if (!db) {
    console.log('Database not available');
    return null;
  }
  return await db.connect();
}
