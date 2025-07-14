import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext.types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
//state management tracking user if he or she is logged in or logged out 


  
  // Check for existing user on initial load
  //using local storage to remember login between page refreshes
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
    //makes all this avaiable to child compoenets 
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 
//this code is implementing an authentication system for our admin panel ! using context API 
// context in react ? is a way to share data that can be considered global ! 
//solves the problem of prop drilling where you have to pass props through many levels of components 
