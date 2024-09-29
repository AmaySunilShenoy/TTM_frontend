"use client";
import React, { useEffect, useRef, useState } from "react";
import TextArea from "./TextArea";
import { BiSend } from "react-icons/bi";
import { helveticaLight } from "@/app/fonts/index";
import instance from "@/constants/axios";
import { PoI } from "@/app/home/page";
import Message from "./Message";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/contexts/UserContext";

interface Message {
  role: string;
  content: string;
}

const ChatArea = ({ chat_id, poi, messages, setMessages }: { chat_id: string, poi : PoI, messages: any, setMessages: (value : any) => void }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const { user } = useUser();
  const socketRef = useRef<Socket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage]);

  useEffect(() => {
    // Socket connection setup
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3002', {
        autoConnect: false,
        path: '/chat-io',
        withCredentials: true,
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        transports: ['websocket'],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
        auth: {
          token: user?.token
        }
      });

      // Connect the socket
      socketRef.current.connect();

      // Handle socket events
      socketRef.current.on("connect", () => {
        console.log("Socket connected");
        if (chat_id) {
          console.log("Initializing chat with ID:", chat_id);
          socketRef.current?.emit("init chat", chat_id);
        }
      });

      socketRef.current.on("chat stream", (data) => {
        setMessageLoading(false);
        console.log("chat stream from AI", data.content);
        setCurrentMessage((prev) => prev + data.content);
      });

      socketRef.current.on("chat message end", (data) => {
        console.log("chat message end", data.role, data.content);
        setMessages((prev: Message[]): Message[] => [
          ...prev,
          { role: data.role, content: data.content },
        ]);
        setCurrentMessage("");
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [chat_id, user?.token]);

  const sendMessage = () => {
    if (userInput.trim() && socketRef.current?.connected) {
      console.log("Sending message", userInput);
      instance
        .post("/message", {
          chat_id: chat_id,
          content: userInput,
          role: "user",
        })
        .then((res) => {
          if (res.status === 201) {
            setMessageLoading(true);
            console.log("Emitting chat message");
            socketRef.current?.emit("chat message", chat_id, userInput);
            setMessages((prev : Message[]) => [
              ...prev,
              { role: "user", content: userInput },
            ]);
            setUserInput("");
          }
        });
    } else {
      console.log("Socket not connected or input empty");
    }
  };

  return (
    <div className="relative flex h-screen w-[80%] overflow-x-hidden overflow-y-scroll bg-lightBlack rounded-[20px]">
      <div className="p-4 flex h-full w-full flex-1 flex-col md:px-2 ">
        <div className="w-full h-[94%] p-3 px-4 flex flex-col gap-5 overflow-scroll">
          {messages.map((msg : {role : string, content : string}, index : number) => (
            <Message key={index} role={msg.role} content={msg.content} image={poi.chat_image} />
          ))}
          {currentMessage && (
            <Message image={poi.image} content={currentMessage} />
          )}
          {messageLoading && (
            <Message image={poi.image} content={'Typing...'} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="absolute flex items-center gap-3 bottom-5 left-7 mx-auto w-full pt-6">
          <TextArea
            value={userInput}
            setValue={setUserInput}
            onSubmit={sendMessage}
            className={`w-[90%] px-4 py-2 rounded-2xl border-none bg-[rgb(15,15,15)] text-white resize-none ${helveticaLight.className} outline-none border-0`}
            placeholder="Type message here ..."
          />
          <BiSend
            size={25}
            className="cursor-pointer mr-4 transition-all hover:-rotate-90"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
