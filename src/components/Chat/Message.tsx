import React from "react";
import Image from "next/image";

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
  return (
    <div
      key={key}
      className={`flex items-center gap-3 ${
        role === "user" ? "flex-row-reverse ml-auto" : "flex-row mr-auto"
      }`}
    >
      <div className="w-10 h-10">
        <Image
          src={`${
            role === "user" ? `/assets/profile.jpg` : `/assets/chat/${image}`
          }`}
          width="0"
          height="0"
          sizes="100vw"
          alt={"profile image"}
          className="w-full h-full object-cover rounded-full"
        />
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
