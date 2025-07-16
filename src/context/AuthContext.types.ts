import { createContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;//Role-Based Access: The role field could control what admin features are visible


}
//what a user looks like or what properties they have 

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
// login nhi hoga tou current user ka object null hoga 
//logout to clear authentication 
export const AuthContext = createContext<AuthContextType | undefined>(undefined); 