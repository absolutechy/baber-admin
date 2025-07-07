import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext.types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  // Check for existing user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // In a real app, this would make an API call
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - in a real app, this would be an API call
      if (email === 'admin@barber.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin'
        };
        setUser(userData);
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 