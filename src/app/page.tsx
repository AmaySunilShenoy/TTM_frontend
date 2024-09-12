"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket.js";
import PoiCard from "@/components/PoiCard";
import { helvetica, helveticaBold, helveticaLight, helveticaThin } from "./fonts/index";
import PoiCarousel from "@/components/Carousel/PoiCarousel";
import Landing from "@/components/Landing";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMain, setShowMain] = useState(false);

  const navitems = ['Home', 'Explore', 'Chat', 'Sign Up', 'Login']

  const NewPoiList = [
    {name: 'Albert Einstein', image: 'albert-bg1.png', desc: 'The visionary physicist who redefined our understanding of space, time, and energy'},
    {name: 'MLK', image: 'martin-bg.png', desc: 'The civil rights leader who championed equality and justice through nonviolence'},
    {name: 'Isaac Newton', image: 'newton-bg.png', desc: 'The groundbreaking physicist and mathematician who laid the foundation for classical mechanics'},
  ]

  const PoiList = [
    {name: 'Albert Einstein', image: 'albert1.png', profession: 'Scientist'},
    {name: 'MLK', image: 'mlk.png', profession: 'Freedom Fighter'},
    {name: 'Isaac Newton', image: 'newton.png', profession: 'Scientist'},
    {name: 'Shakespeare', image: 'shake.png', profession: 'Poet'},
    {name: 'Marie Curie', image: 'marie.png', profession: 'Scientist'},
    {name: 'Nelson Mandela', image: 'mandela.png', profession: 'Freedom Fighter'},
    {name: 'Elizabeth I', image: 'queen.png', profession: 'Former Queen'},
    {name: 'Charles Darwin', image: 'darwin.png', profession: 'Scientist'},
    {name: 'Elvis Presley', image: 'elvis.png', profession: 'Singer'},
    {name: 'Abraham Lincoln', image: 'lincoln.png', profession: 'Former President'},
    {name: 'Gandhi', image: 'gandhi.png', profession: 'Freedom Fighter'},
    {name: 'Julius Caesar', image: 'caesar.png', profession: 'Ruler '},
  ]

  // Temporary chat functionality
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
      const poi = {
        name: 'Albert Einstein',
        period: 'Early 20th Century',
        field: 'Theories of Relativity, Scientific Research',
        contributions: 'E=mc², General and Special Relativity, Nobel Prize in Physics 1921',
        traits: 'Thoughtful, Intellectual, Curious, Open-Minded'  
      }

      socket.emit("init chat", poi)
    }

    socket.on("chat stream", (response: {user: string, message: string}) => {
      console.log(response)
    })

    socket.on("chat message end", (response: {user: string, message: string}) => {
      console.log('done')
    })


    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const filteredPoiList = PoiList.filter(poi =>
    poi.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
    {!showMain && <Landing setShowMain={setShowMain}/>}

      <div className={`opacity-0 transition-all duration-500 ${showMain ? `opacity-100` : ''}`}>
    {/* Top Section */}
    <div className="w-full bg-spotlight relative">
      {/* Navbar */}
      <nav className={`relative text-white p-5 ${helveticaBold.className}`}>
        <p className="text-[50px] ml-4">Talking Time Machine</p>
        <div className="flex justify-between absolute right-4 text-lg top-6 w-[30%]">
          {navitems.map((item, index) => (
          <p key={index} className="relative group cursor-pointer">
            {item}
          <span className="absolute h-[3px] bg-white -bottom-1 left-1/2 transform -translate-x-1/2 w-0 transition-all origin-center group-hover:w-full"></span>
          </p>
        ))}
        </div>
      </nav>
      {/* About */}
      <div className={`text-white ${helveticaThin.className} px-11 py-12 absolute bottom-10`}>
        <h1 className={`text-[28px] mb-5 ${helveticaBold.className}`}>Converse with History's Greatest Minds</h1>
        <p className="text-[18px] w-[35%]">Step into the past and engage in conversations with the greatest minds in history. 
          Our AI-powered platform lets you talk directly with iconic figures like Albert Einstein, 
          Marie Curie, and others. Whether you’re seeking knowledge, inspiration, or just a chat with someone who changed the world, 
          this immersive experience brings history to life in ways never before possible. Ask questions, 
          learn from their wisdom, and dive into the stories that shaped our world—right from the comfort of your screen.</p>
      </div>
      {/* New People Carousel */}
      <PoiCarousel slides={NewPoiList} options={{ direction: 'rtl', loop: true }}/>
    </div>
    <div className="relative p-4 w-full">
    {/* Person Grid Area*/}
    <div className="absolute w-[98%] -top-2 glass-effect">
    <div className="flex justify-between my-2 p-7">
      {/* Title */}
      <p className={`text-[34px] text-white ml-1 ${helveticaBold.className}`}>Our Minds</p>
      {/* Search bar */}
      <div className={`bg-background rounded-full mr-10 ${helveticaLight.className}`}>
        <input type="text" placeholder="Search for a person" className="py-3 px-4 rounded-full w-[400px] text-white bg-background border-none outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
    </div>

    {/* Person Grid with Live Filtering */}
    <div className="grid grid-cols-6 gap-3 p-10">
     {filteredPoiList.map((poi, index) => (
       <PoiCard key={index} name={poi.name} image={poi.image} profession={poi.profession} isNew={NewPoiList.map(poi => poi.name).includes(poi.name)}/>
      ))}
    </div> 
    </div>
    </div>
    </div>
    </>
  );
}