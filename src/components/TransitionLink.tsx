import React from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "../contexts/TransitionContext";

interface TransitionLinkProps {
  href: string;
  before?: (value?: any) => Promise<string>; // This now returns a Promise with the ID
  returns?: boolean;
  children: React.ReactNode;
}

const TransitionLink = ({ href, before, children }: TransitionLinkProps) => {
  const router = useRouter();
  const { setAnimationStage } = useTransition();

  const handleClick = async () => {
    let result = '';

    if (before) {
      result = await before(); // Wait for the result from `before`
      console.log('Result from before:', result);
    }

    setAnimationStage('exit');

    setTimeout(() => {
      const finalHref = result ? `${href}/${result}` : href;
      router.push(finalHref);
    }, 750);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export default TransitionLink;
