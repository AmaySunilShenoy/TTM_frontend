'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { redirect } from 'next/navigation';

const withAuth = (WrappedComponent : any) => {
  return (props : any) => {
    const { user } = useUser();
    
    useEffect(() => {
      console.log(user)
      if (user !== undefined) {
        if (!user) {
          redirect('/authenticate');  // Redirect to login if not authenticated
        }
      }
    }, [user]);
    if (!user) {
      return null; // Or a loading state
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
