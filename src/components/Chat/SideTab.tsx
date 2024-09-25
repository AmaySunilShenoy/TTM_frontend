import { helveticaBlack, helveticaBold, helveticaLight } from "@/app/fonts";
import instance from "@/constants/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbles, IoSettings } from "react-icons/io5";
import { RiHomeFill } from "react-icons/ri";

const SideTab = () => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const router = useRouter(); 


  useEffect(() => {
    fetchAllChats();
  }, []);


  const fetchAllChats = () => {
    instance.get("/chat").then((res) => {
      setChats(res.data.chats);
    });
  }
  return (
    <>
    <div></div>
    <div
      className="flex flex-col justify-between bg-lightBlack items-center w-[3%] p-3"
      onMouseEnter={() => setOpen(true)}
    >
      <div className="flex flex-col gap-10 py-2 pt-7">
        <RiHomeFill size={25} className="cursor-pointer" onClick={() => router.push('/home')}/>
        <IoChatbubbles size={25} onClick={() => setOpen(true)} />
      </div>
      <div className="py-2">
        <CgProfile size={25} className="" />
      </div>
      
    </div>
    <div
    className={`absolute top-0 left-0 p-3 pt-8 flex flex-col justify-between w-[20%] z-50 bg-lightGray backdrop-blur-md h-full transition-all ${
      open ? `translate-x-0` : `-translate-x-[400px]`
    }`}
    onMouseLeave={() => setOpen(false)}
  >
    <div className={`flex flex-col gap-10 py-2 ${helveticaBold.className}`}>
      <div className="flex gap-3 cursor-pointer" onClick={() => router.push('/home')}>
        <RiHomeFill size={25} />
        <p>Home</p>
      </div>
      <div>
      <div className="flex gap-3">
        <IoChatbubbles size={25} onClick={() => setOpen(!open)} />
        <p>Chats</p>
      </div>
      <div className="flex flex-col gap-3 p-3 mt-2">
        {chats.map((chat : any) => (
          <div key={chat.id} className="flex gap-3">
            <Image
            src={`/assets/chat/${chat.poi.image}`}
            alt="Albert Einstein"
            width="0"
            height="0"
            sizes="100vw"
            className="z-20 w-10 h-auto object-cover rounded-full"
          />
          <div className="relative group cursor-pointer" onClick={() => router.push(`/chat/${chat.id}`)}>
            <p>{chat.poi.name}</p>
            <span className="absolute h-[3px] bg-white -bottom-1 left-1/2 transform -translate-x-1/2 w-0 transition-all origin-center group-hover:w-full"></span>
            </div>
          </div>
        ))}
        </div>

      </div>
    </div>
    <div className="py-2">
      <div className="flex gap-3">
        <CgProfile size={25} className="" />
        <p>Profile</p>
      </div>
    </div>
  </div>
  </>
  );
};

export default SideTab;
