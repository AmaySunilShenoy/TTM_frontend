import React from "react";
import { helvetica, helveticaBlack } from "@/fonts";
import instance from "@/constants/axios";
import TransitionLink from "../TransitionLink";

interface PoiCardProps {
  id: string;
  name: string;
  image: string;
  profession: string;
  isNew?: boolean;
  imageUrl?: boolean;
  disableDefaultClick?: boolean;
  onClick?: () => void;
}


const PoiCard = ({ id, name, image, profession, isNew = false, disableDefaultClick=false, onClick=() => {} }: PoiCardProps) => {
  const handleClick = async () => {
    try {
      const response = await instance.post(`/chat/`, {
        poi_id: id
      });
      const chatId: string = response.data.id;
      console.log('Chat ID:', chatId);
      return chatId;
    } catch (err) {
      console.log(err);
      return '';
    }
  };

  return (
    disableDefaultClick ? 
    <div onClick={onClick}>
    <div className="relative w-36 h-60 sm:w-40 sm:h-64 md:w-52 md:h-80 transition-all hover:scale-105 cursor-pointer group">
      <div className="relative w-full h-full bg-spotlight brightness-50 overflow-hidden rounded-[30px] group-hover:border-4 group-hover:border-white flex flex-col items-center shadow-lg">
        {/* Profile Image */}
        {image ? <img
          className="w-full h-full object-cover rounded-[30px] transition-all sm:scale-110 group-hover:scale-100"
          src={image}
          alt={name}
        /> : <div className="w-full h-full bg-black rounded-[30px]"></div>}

        
      </div>
      {/* "New" Icon */}
      {isNew && (
          <div className={`absolute top-3 right-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full ${helvetica.className}`}>
            New
          </div>
        )}

      {/* Name and Profession */}
      <div className={`absolute bottom-0 p-4 brightness-100 leading-tight ${helveticaBlack.className}`}>
        <h3 className="text-white text-[16px] sm:text-[20px] md:text-[25px] font-semibold">{name}</h3>
        <p className="text-gray-400 text-sm sm:text-lg">{profession}</p>
      </div>
    </div>
    </div>
     : 
    <TransitionLink href={`/chat`} before={handleClick}>
      <div className="relative w-36 h-60 sm:w-40 sm:h-64 md:w-52 md:h-80 transition-all hover:scale-105 cursor-pointer group">
      <div className="relative w-full h-full bg-spotlight brightness-50 overflow-hidden rounded-[30px] group-hover:border-4 group-hover:border-white flex flex-col items-center shadow-lg">
        {/* Profile Image */}
        {image ? <img
          className="w-full h-full object-cover rounded-[30px] transition-all sm:scale-110 group-hover:scale-100"
          src={image}
          alt={name}
        /> : <div className="w-full h-full bg-black rounded-[30px]"></div>}

        
      </div>
      {/* "New" Icon */}
      {isNew && (
          <div className={`absolute top-3 right-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full ${helvetica.className}`}>
            New
          </div>
        )}

      {/* Name and Profession */}
      <div className={`absolute bottom-0 p-4 brightness-100 leading-tight ${helveticaBlack.className}`}>
        <h3 className="text-white text-[16px] sm:text-[20px] md:text-[25px] font-semibold">{name}</h3>
        <p className="text-gray-400 text-sm sm:text-lg">{profession}</p>
      </div>
    </div>
    </TransitionLink>
  );
};

export default PoiCard;
