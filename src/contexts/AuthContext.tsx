'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, ADMIN_EMAILS, UserRole } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('partpulse_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save user to localStorage when it changes
    if (user) {
      localStorage.setItem('partpulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('partpulse_user');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // Mock implementation - in production, this would call Supabase
    // For now, determine role based on email
    const role: UserRole = ADMIN_EMAILS.includes(email) ? 'Admin' : 'Technician';
    
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      username: email.split('@')[0],
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
  };

  const signUp = async (email: string, password: string, username: string) => {
    // Mock implementation
    const role: UserRole = ADMIN_EMAILS.includes(email) ? 'Admin' : 'Technician';
    
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      username,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
  };

  const signOut = async () => {
    setUser(null);
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
