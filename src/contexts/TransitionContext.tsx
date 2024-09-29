// context/TransitionContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type TransitionContextType = {
  animationStage: 'enter' | 'exit';
  setAnimationStage: (stage: 'enter' | 'exit') => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [animationStage, setAnimationStage] = useState<'enter' | 'exit'>('enter');

  return (
    <TransitionContext.Provider value={{ animationStage, setAnimationStage }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
