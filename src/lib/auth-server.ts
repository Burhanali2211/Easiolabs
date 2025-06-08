import { query } from './supabase';
import type { User } from './types';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export class AuthServerService {
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.error('Password hashing error:', error);
      throw new Error('Failed to hash password');
    }
  }

  static generateToken(user: AuthUser): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const options: SignOptions = { expiresIn: '7d' };

    return jwt.sign(payload, secret as Secret, options);
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      return null;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await query(
        'SELECT id, email, password_hash, role FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const result = await query(
        'SELECT id, email, password_hash, role FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static getTokenFromRequest(request: NextRequest): string | null {
    // Try to get token from cookie first
    const cookieToken = request.cookies.get('auth_token')?.value;
    if (cookieToken) {
      return cookieToken;
    }

    // Fallback to Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return null;
  }

  static async authenticateRequest(request: NextRequest): Promise<AuthUser | null> {
    const token = this.getTokenFromRequest(request);
    if (!token) {
      return null;
    }

    return this.verifyToken(token);
  }
}
