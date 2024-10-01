'use client';
import { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { redirect } from 'next/navigation';

const withAuth = (WrappedComponent : any) => {
  return (props : any) => {
    const { user } = useUser();
    
    useEffect(() => {
      if (user !== undefined) {
        if (!user) {
          redirect('/authenticate');
        }
      }
    }, [user]);
    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
