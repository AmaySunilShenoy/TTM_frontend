"use client";

import { useEffect, useState } from "react";
import { helvetica, helveticaBold, helveticaLight, helveticaThin } from "../fonts/index";
import PoiCarousel from "@/components/Carousel/PoiCarousel";
import Landing from "@/components/Landing";
import Navbar from "@/components/Home/Navbar";
import withAuth from "../withAuth";
import instance from "@/constants/axios";
import { useUser } from "@/contexts/UserContext";
import PoiGrid from "@/components/Home/PoiGrid";

export interface PoI {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
}


function Home() {
  const [showMain, setShowMain] = useState(true);
  const {user} = useUser();

  const NewPoiList = [
    {name: 'Albert Einstein', image: 'albert-bg.png', desc: 'The visionary physicist who redefined our understanding of space, time, and energy'},
    {name: 'MLK', image: 'martin-bg.png', desc: 'The civil rights leader who championed equality and justice through nonviolence'},
    {name: 'Isaac Newton', image: 'newton-bg.png', desc: 'The groundbreaking physicist and mathematician who laid the foundation for classical mechanics'},
  ]

  
  useEffect(() => {
    if(user){
      console.log('User:', user)
    }
  }, [user])

  // Temporary chat functionality
  // useEffect(() => {
  //   if (socket.connected) {
  //     onConnect();
  //   }

    

  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on("upgrade", (transport: any) => {
  //       setTransport(transport.name);
  //     });
  //     const poi = {
  //       name: 'Albert Einstein',
  //       period: 'Early 20th Century',
  //       field: 'Theories of Relativity, Scientific Research',
  //       contributions: 'E=mc², General and Special Relativity, Nobel Prize in Physics 1921',
  //       traits: 'Thoughtful, Intellectual, Curious, Open-Minded'  
  //     }

  //     socket.emit("init chat", poi)
  //   }

  //   socket.on("chat stream", (response: {user: string, message: string}) => {
  //     console.log(response)
  //   })

  //   socket.on("chat message end", (response: {user: string, message: string}) => {
  //     console.log('done')
  //   })


  //   function onDisconnect() {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   }

  //   getPoIList()

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  return (
    <>
    {/* {!showMain && <Landing setShowMain={setShowMain}/>} */}

      <div className={`opacity-0 transition-all duration-500 ${showMain ? `opacity-100` : ''}`}>
    {/* Top Section */}
    <div className="w-full bg-spotlight relative">
      {/* Navbar */}
      <Navbar />
      {/* About */}
      <div className={`text-white ${helveticaThin.className} px-11 py-12 absolute bottom-10`}>
        <h1 className={`text-[28px] mb-5 ${helveticaBold.className}`}>Converse with History&apos;s Greatest Minds</h1>
        <p className="text-[18px] w-[35%]">Step into the past and engage in conversations with the greatest minds in history. 
          Our AI-powered platform lets you talk directly with iconic figures like Albert Einstein, 
          Marie Curie, and others. Whether you&apos;re seeking knowledge, inspiration, or just a chat with someone who changed the world, 
          this immersive experience brings history to life in ways never before possible. Ask questions, 
          learn from their wisdom, and dive into the stories that shaped our world—right from the comfort of your screen.</p>
      </div>
      {/* New People Carousel */}
      <PoiCarousel slides={NewPoiList} options={{ direction: 'rtl', loop: true }}/>
    </div>
    <div className="relative p-4 w-full">
    {/* Person Grid Area*/}
    <PoiGrid />
    </div>
    </div>
    </>
  );
}

// export default Home;
export default withAuth(Home);