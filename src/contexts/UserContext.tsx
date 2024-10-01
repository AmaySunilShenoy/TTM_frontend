import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import instance from '@/constants/axios';


export const useUser = () => useContext(UserContext);

export interface User {
  userid: string;
  username: string;
  role: string;
  email: string;
  token: string;
}

export interface UserContextProps {
  user: User | null | undefined;
  login: (credentials : {email : string, password: string, usingGoogle: boolean}) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({ user: undefined, login: async () => {}, logout: () => {} });

export const UserProvider = ({ children } : {children : ReactNode}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

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
        setUser({...response.data.user, token: localStorage.getItem('token')});
      } else {
        setUser(null)
        localStorage.removeItem('token');
        router.push('/authenticate');
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      router.push('/authenticate');
    }
  };

  const login = async (credentials : {email : string, password: string, usingGoogle: boolean}) => {
    const response = await instance.post('/auth/login', credentials);
    if (response.data) {
      console.log('response', response.data.user);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      router.push('/');
    } else {
      throw new Error(response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/authenticate');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
