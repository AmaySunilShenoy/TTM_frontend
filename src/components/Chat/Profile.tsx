import React from "react";
import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";
import { helveticaBold, helveticaThinItalic } from "@/fonts";
import { PoI } from "@/app/home/page";


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
          <img
            src={poi.chat_image}
            alt="Albert Einstein"
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
