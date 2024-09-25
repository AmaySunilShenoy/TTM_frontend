"use client";
import React, { useEffect, useRef, useState } from "react";
import TextArea from "./Chat/TextArea";
import { BiSend } from "react-icons/bi";
import { helvetica, helveticaLight, helveticaThin } from "@/app/fonts/index";
import instance from "@/constants/axios";
import { PoI } from "@/app/home/page";
import {socket} from "../socket.js"
import Image from "next/image";
import Message from "./Chat/Message";

interface Message {
  role: string;
  content: string;
}

const ChatArea = ({ chat_id, poi, messages, setMessages }: { chat_id: string, poi : PoI, messages: any, setMessages: (value : any) => void }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage]);

  useEffect(() => {
    // Socket connection setup
    console.log("Connecting to socket");
    socket.connect();

    // Handle socket events
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("chat stream", (data) => {
      setMessageLoading(false);
      console.log("chat stream from AI", data.content);
      setCurrentMessage((prev) => prev + data.content);
    });

    socket.on("chat message end", (data) => {
      console.log("chat message end", data.role, data.content);
      setMessages((prev: Message[]): Message[] => [
        ...prev,
        { role: data.role, content: data.content },
      ]);
      setCurrentMessage("");
    });

    return () => {
      socket.off("chat stream");
      socket.off("chat message end");
    };
  }, []);

  useEffect(() => {
    if (chat_id) {
      console.log("Initializing chat with ID:", chat_id);
      socket.emit("init chat", chat_id);
    }
  }, [chat_id]);

  const sendMessage = () => {

    if (userInput.trim()) {
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
            socket?.emit("chat message",chat_id, userInput);
            setMessages((prev : Message[]) => [
              ...prev,
              { role: "user", content: userInput },
            ]);
            setUserInput("");
          }
        });
    }
  };

  return (
    <div className="relative flex h-screen w-[80%] overflow-x-hidden overflow-y-scroll bg-lightBlack rounded-[20px]">
      <div className="p-4 flex h-full w-full flex-1 flex-col md:px-2 ">
        <div className="w-full h-[94%] p-3 px-4 flex flex-col gap-5 overflow-scroll">
          {messages.map((msg : {role : string, content : string}, index : number) => (
            <Message key={index} role={msg.role} content={msg.content} image={poi.image} />
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
