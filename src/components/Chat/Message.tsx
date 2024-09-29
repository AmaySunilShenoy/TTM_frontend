import React from "react";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";

const Message = ({
  image,
  content,
  key=2,
  role=undefined
}: {
  image: string;
  content: string;
  key?: any;
  role?: string | undefined;
}) => {
  const {user} = useUser();
  return (
    <div
      key={key}
      className={`flex items-center gap-3 ${
        role === "user" ? "flex-row-reverse ml-auto" : "flex-row mr-auto"
      }`}
    >
      <div className="w-10 h-10">
        {role === "user" ? (

<div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"> 
<p className='text-sm mr-[1px]'>{user ? user.username.charAt(0).toUpperCase() + user.username.charAt(1).toUpperCase(): 'GU'}</p>
</div>
        ) : 
        <img
          src={image}
          alt={"profile image"}
          className="w-full h-full object-cover rounded-full"
        />}
      </div>
      <div
        key={key}
        className={`bg-[rgb(15,15,15)] w-fit rounded-[20px] p-4 px-5 ${
          role === "user" ? "rounded-br-none" : "rounded-bl-none"
        }`}
      >
        <p>{content || "message content no available"}</p>
      </div>
    </div>
  );
};

export default Message;
