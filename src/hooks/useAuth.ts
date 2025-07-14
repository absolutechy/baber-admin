import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.types';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
//custom hook? allows users to create reusuable logic using useContext
//The AuthProvider you showed earlier provides the context

//This useAuth hook consumes the context

//They work together to make authentication state available throughout your app 