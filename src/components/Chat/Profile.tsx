import React, { useEffect } from "react";
import { BiBrain } from "react-icons/bi";
import { GiLightBulb } from "react-icons/gi";
import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";
import { helveticaBold, helveticaLight, helveticaLightItalic, helveticaThinItalic, helveticaUltraLightItalic } from "@/app/fonts";
import { PoI } from "@/app/home/page";
import Image from "next/image";


const Profile = ({poi} : {poi: PoI | null}) => {

    if (!poi) {
      return null
    }

  return (
    <div className="relative h-screen flex justify-center w-[50%]">
      <StarsBackground />
      <ShootingStars />
      <div className="relative flex flex-col">
        <div className="p-5 mx-5">
          <p className={`text-[50px] ${helveticaBold.className}`}>
            {poi.name}
          </p>
          <p className="text-2xl text-white">{poi.type}</p>
        </div>
        <div className="relative flex flex-col items-center">
        <div className="relative bg-lightBlack rounded-full pt-20 overflow-hidden w-[400px] h-[400px] flex justify-center items-center">
          {/* Einstein Image */}
          <Image
            src={`/assets/chat/${poi.image}`}
            alt="Albert Einstein"
            width="0"
  height="0"
  sizes="100vw"
            className="z-20 w-full h-full object-cover rounded-full"
          />
        </div>
        <div className={`p-5 text-base mx-16 ${helveticaThinItalic.className}`}>
          <p>
           {poi.description}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
