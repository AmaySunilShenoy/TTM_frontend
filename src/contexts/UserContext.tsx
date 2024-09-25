import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import instance from '@/constants/axios';


export const useUser = () => useContext(UserContext);

export interface User {
  userid: string;
  email: string;
}

export interface UserContextProps {
  user: User | null | undefined;
  login: (credentials : {email : string, password: string}) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({ user: undefined, login: async () => {}, logout: () => {} });

export const UserProvider = ({ children } : {children : ReactNode}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await instance.get('/auth/current');
      
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null)
        localStorage.removeItem('token');
        redirect('/authenticate');
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      redirect('/authenticate');
    }
  };

  const login = async (credentials : {email : string, password: string}) => {
    const response = await instance.post('/auth/login', credentials);
    if (response.data) {
      console.log('response', response.data.user);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      redirect('/');
    } else {
      throw new Error(response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    redirect('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
