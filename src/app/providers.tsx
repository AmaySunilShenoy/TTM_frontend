'use client';

import { TransitionProvider } from "@/contexts/TransitionContext";
import { UserProvider } from "@/contexts/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {
  return (
    // TrasnitionProvider is used to provide the transition context to the app for page transitions
    <TransitionProvider>
      {/* GoogleOAuthProvider provides google oauth login */}
      <GoogleOAuthProvider clientId={"842519739783-rj5rae12jb471vc8ulqnq2saaau1jjdk.apps.googleusercontent.com"}>
      {/* UserProvider provides the user context to the app */}
      <UserProvider>
        {children}
      </UserProvider>
      </GoogleOAuthProvider>
    </TransitionProvider>
  );
}