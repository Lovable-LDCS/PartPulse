'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, RoleContextType, ADMIN_EMAILS } from '@/types';
import { useAuth } from './AuthContext';

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [role, setRoleState] = useState<UserRole>('Technician');

  useEffect(() => {
    // Load role from localStorage on mount
    const storedRole = localStorage.getItem('partpulse_role');
    if (storedRole && (storedRole === 'Admin' || storedRole === 'Technician')) {
      setRoleState(storedRole as UserRole);
    }
  }, []);

  useEffect(() => {
    // Save role to localStorage when it changes
    localStorage.setItem('partpulse_role', role);
  }, [role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  // Determine if user is admin based on multiple criteria
  const isAdmin = 
    role === 'Admin' || 
    user?.role === 'Admin' || 
    (user?.email ? ADMIN_EMAILS.includes(user.email) : false);

  const resetSession = () => {
    localStorage.removeItem('partpulse_role');
    localStorage.removeItem('partpulse_user');
    setRoleState('Technician');
    window.location.reload();
  };

  return (
    <RoleContext.Provider value={{ role, setRole, isAdmin, resetSession }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
