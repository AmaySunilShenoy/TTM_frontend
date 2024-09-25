'use client';

import { UserProvider } from "@/contexts/UserContext";

export function Providers({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}