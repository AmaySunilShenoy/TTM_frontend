import Image from "next/image";
import React, { useEffect, useState } from "react";

const Landing = ({ setShowMain }: { setShowMain: (bool: boolean) => void }) => {
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const remote = document.getElementById("remote");
      const x = event.clientX;
      const y = event.clientY;

      if (!remote) return;

      remote.style.left = `${x}px`;
      remote.style.top = `${y}px`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    setOverlay(true);
    setTimeout(() => {
      setShowMain(true);
    }, 1000);
  };

  return (
    <div
      className="h-screen bg-white flex justify-center items-center relative overflow-hidden"
      onClick={handleClick}
    >
      <Image
        src="/assets/tv-full1.png"
        alt="Talking Time Machine"
        className="w-full object-cover"
        width="0"
        height="0"
        sizes="100vw"
      />
      <Image
        id="remote"
        src="/assets/remote.png"
        alt="Remote"
        className="absolute"
        width="0"
        height="0"
        sizes="100vw"
      />

      <div className={`overlay ${overlay ? "active" : ""}`} />
    </div>
  );
};

export default Landing;
