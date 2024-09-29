import { helveticaBlack, helveticaBold, helveticaBoldItalic, helveticaLight } from "@/app/fonts";
import instance from "@/constants/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbles, IoSettings } from "react-icons/io5";
import { RiHomeFill } from "react-icons/ri";
import TransitionLink from "../TransitionLink";
import { useUser } from "@/contexts/UserContext";
import { BiLogOut } from "react-icons/bi";

const SideTab = () => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const router = useRouter(); 
  const { user } = useUser();


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
      <div
            className="w-8 min-h-8 h-fit text-sm bg-white text-black rounded-full shadow-xl flex flex-col items-center justify-center transition-all duration-500"
          >
            {user ? user.username.charAt(0).toUpperCase() +
                    user.username.charAt(1).toUpperCase() : ''}
      </div>
      
    </div>
    <div
    className={`absolute top-0 left-0 p-3 pt-8 flex flex-col justify-between w-[20%] z-50 bg-lightGray backdrop-blur-md h-full transition-all ${
      open ? `translate-x-0` : `-translate-x-[400px]`
    }`}
    onMouseLeave={() => setOpen(false)}
  >
    <div className={`flex flex-col gap-10 py-2 ${helveticaBold.className}`}>
        <TransitionLink href="/home">
      <div className="flex gap-3 cursor-pointer">
        <RiHomeFill size={25} />
        <p>Home</p>
      </div>
        </TransitionLink>
      <div>
      <div className="flex gap-3">
        <IoChatbubbles size={25} onClick={() => setOpen(!open)} />
        <p>Chats</p>
      </div>
      <div className="flex flex-col gap-3 p-3 mt-2">
        {chats.map((chat : any) => (
          <div key={chat.id} className="flex gap-3">
            <img
            src={chat.poi?.chat_image}
            alt="Albert Einstein"
            width="0"
            height="0"
            sizes="100vw"
            className="z-20 w-10 h-auto object-cover rounded-full"
          />
          <div className="relative group cursor-pointer" onClick={() => router.push(`/chat/${chat.id}`)}>
            <p>{chat.poi?.name}</p>
            <span className="absolute h-[3px] bg-white -bottom-1 left-1/2 transform -translate-x-1/2 w-0 transition-all origin-center group-hover:w-full"></span>
            </div>
          </div>
        ))}
        </div>

      </div>
    </div>
    <div className="py-2">
      <div className="flex flex-col items-center justify-center bg-white text-black w-full min-h-8 h-fit rounded-xl shadow-xl">
      <div
            className={` p-2 flex flex-col items-center justify-center transition-all duration-500 ${helveticaBold.className}`}
          >
            {user ? user.username : ''}
      </div>
        <div className={`flex gap-7 cursor-pointer items-center justify-center hover:bg-slate-100 w-full p-2 ${helveticaLight.className}`}>
          <p>Account</p>
        </div>
        <div className={`  flex gap-7 cursor-pointer items-center justify-center hover:bg-slate-100 w-full p-2 ${helveticaLight.className}`} onClick={() => router.push('/logout')}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  </div>
  </>
  );
};

export default SideTab;
