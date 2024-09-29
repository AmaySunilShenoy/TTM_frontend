"use client";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGlitch, GlitchHandle } from 'react-powerglitch';
import { onest } from "../fonts";
import LoginForm from "@/components/Authenticate/LoginForm"
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Authenticate = () => {
  const { id } = useParams();
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('user', user);
    if (user) {
      router.push('/home');
    }
  }, [user]);

  const glitch: GlitchHandle = useGlitch({
    hideOverflow: true,
    timing: {
      duration: 5000
    },
    shake: {
      velocity: 5,
      amplitudeX: 0.05,
      amplitudeY: 0.05
    },
    slice: {
      count: 3
    }
  });

  const glitchText: GlitchHandle = useGlitch({
    hideOverflow: true,
    timing: {
      duration: 5000
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.15,
      amplitudeY: 0.15
    },
    slice: {
      count: 1
    }
  });



  return (
    <div className={`flex ${onest.className}`}>
      <div className="flex-1 h-screen">
        <Image
        ref={glitch.ref}
          src="/assets/authBack.png"
          alt="Chat Background"
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full scale-105 object-cover"
        />
      </div>
      <div className="flex-[1.5] h-screen flex-col overflow-hidden bg-background text-lightWhite">
        <div className="text-center">
        <p className={`text-[30px] ml-4 font-bold`}>Welcome to the </p>
        <p className={`text-[50px] ml-4 font-bold`} ref={glitchText.ref}>Talking Time Machine</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Authenticate;
