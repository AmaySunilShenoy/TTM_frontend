import React from "react";
import { helvetica, helveticaBlack } from "@/app/fonts";
import instance from "@/constants/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PoiCardProps {
  id: string;
  name: string;
  image: string;
  profession: string;
  isNew?: boolean;
}

const PoiCard = ({ id, name, image, profession, isNew = false }: PoiCardProps) => {
  const router = useRouter();
  const handleClick = ({poi_id} : {poi_id : string}) => {
    instance.post(`/chat/`, {
      poi_id: poi_id
    }).then(response => {
      router.push(`/chat/${response.data.id}`)
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <div className="relative w-52 h-80 transition-all hover:scale-105 cursor-pointer group" onClick={() => handleClick({ poi_id: id })}>
      <div className="relative w-full h-full bg-spotlight brightness-50 overflow-hidden rounded-[30px] group-hover:border-4 group-hover:border-white flex flex-col items-center shadow-lg">
        {/* Profile Image */}
        <Image
          className="w-full h-full object-cover rounded-[30px] transition-all scale-110 group-hover:scale-100"
          src={`/assets/${image}`}
          alt={name}
          width="0"
          height="0"
          sizes="100vw"
        />

        
      </div>
      {/* "New" Icon */}
      {isNew && (
          <div className={`absolute top-3 right-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full ${helvetica.className}`}>
            New
          </div>
        )}

      {/* Name and Profession */}
      <div className={`absolute bottom-0 p-4 brightness-100 leading-tight ${helveticaBlack.className}`}>
        <h3 className="text-white text-[25px] font-semibold">{name}</h3>
        <p className="text-gray-400 text-lg">{profession}</p>
      </div>
    </div>
  );
};

export default PoiCard;
