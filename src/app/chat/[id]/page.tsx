"use client";
import { helveticaBold, helveticaLight } from "@/fonts";
import Profile from "@/components/Chat/Profile";
import SideTab from "@/components/Chat/SideTab";
import ChatArea from "@/components/Chat/ChatArea";
import withAuth from "@/app/withAuth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import instance from "@/constants/axios";
import { PoI } from "@/app/home/page";
import { useRouter } from "next/navigation";

export interface Message {
  role: string;
  content: string;
}

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const [poi, setPoi] = useState<PoI | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    instance.get(`/chat/${id}`).then((response) => {
      if (!response.data.chat) {
        router.push("/home");
      }
      setPoi(response.data.chat.poi);
      setMessages(response.data.chat.messages);
    });
  }, [id]);

  if (!poi) {
    return null
  }

  return (
    <div className="flex">
      {/* Side navigation tab */}
      <SideTab />
      <div className="relative flex-[4] h-screen w-full flex-col overflow-hidden bg-black">
        <div className="flex">
          {/* Character Info */}
          <Profile poi={poi}/>
          {/* Main Chat Area */}
          <ChatArea chat_id={id} poi={poi} messages={messages} setMessages={setMessages}/>
        </div>
      </div>
    </div>
  );
};

// export default Chat

export default withAuth(Chat);
