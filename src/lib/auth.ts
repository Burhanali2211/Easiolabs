'use client';

import { useState, useEffect } from 'react';
import type { User } from './types';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export class AuthService {
  static async signIn(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { user: null, error: data.error || 'Sign in failed' };
      }

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Sign in failed' };
    }
  }

  static async signOut() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Sign out failed' };
    }
  }

  static async getCurrentUser() {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!response.ok) {
        return { user: null, error: null };
      }

      const data = await response.json();
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to get user' };
    }
  }

  static async getSession() {
    const { user } = await this.getCurrentUser();
    return { session: user ? { user } : null, error: null };
  }

  static onAuthStateChange(callback: (event: string, session: any) => void) {
    // For client-side auth state changes, we'll use a simple event system
    const checkAuth = async () => {
      const { user } = await this.getCurrentUser();
      callback('SIGNED_IN', user ? { user } : null);
    };

    checkAuth();

    // Return a subscription-like object
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            // Cleanup if needed
          }
        }
      }
    };
  }

  static async isAdmin(): Promise<boolean> {
    const { user } = await this.getCurrentUser();
    return user?.role === 'admin' || false;
  }
}

// Hook for client-side authentication state
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    AuthService.getSession().then(({ session }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    signIn: AuthService.signIn,
    signOut: AuthService.signOut,
    isAdmin: AuthService.isAdmin,
  };
}

// Server-side auth check function
export async function checkAdminAuth(request: Request) {
  try {
    const response = await fetch('/api/auth/me', {
      headers: request.headers,
    });

    if (!response.ok) {
      return { error: 'Authentication failed', status: 401 };
    }

    const data = await response.json();

    if (data.user?.role !== 'admin') {
      return { error: 'Admin access required', status: 403 };
    }

    return { user: data.user, error: null };
  } catch (error) {
    return { error: 'Authentication error', status: 500 };
  }
}


