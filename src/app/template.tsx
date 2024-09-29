'use client';

import { motion } from 'framer-motion';
import { useTransition } from '../contexts/TransitionContext';
import { useEffect, useRef, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const { animationStage, setAnimationStage } = useTransition();
  const motionDivRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (animationStage === 'exit') {
      setTimeout(() => {
        setAnimationStage('enter');
        motionDivRef.current?.style.setProperty('height', '100vh');
      }, 650);
    }
    if (animationStage === 'enter') {
      setTimeout(() => {
        motionDivRef.current?.style.setProperty('height', 'fit-content');
      }, 650);
    }
  }, [animationStage, setAnimationStage]);
  return (
    <motion.div
    className='motion-div'
      initial={{ clipPath: 'inset(50% 50% 50% 50%)', backgroundColor: 'black' }}
      animate={animationStage === 'enter' ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(50% 50% 50% 50%)' }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
      ref={motionDivRef}
      style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: 100, overflow: animationStage === 'exit' ? 'hidden' : 'visible' }}
    >
      {children}
    </motion.div>
  );
}
