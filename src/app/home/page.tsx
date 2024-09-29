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
  chat_image: string;
  type: string;
  field: string;
  contributions: string;
  period: string;
}

export interface NewPoi {
  about: string;
  image: string;
  poi: PoI;
}


function Home() {
  const [showMain, setShowMain] = useState(true);
  const {user} = useUser();
  const [NewPoiList, setNewPoiList] = useState<NewPoi[]>([]);

  
  useEffect(() => {
    if(user){
      console.log('User:', user)
    }
  }, [user])

  
  useEffect(() => {
    instance.get("/newpoi/").then((response) => {
      setNewPoiList(response.data.pois);
    });
  },[]);


  return (
    <>
    {!showMain && <Landing setShowMain={setShowMain}/>}

      <div className={`opacity-0 transition-all duration-500 ${showMain ? `opacity-100` : ''}`}>
    {/* Top Section */}
    <div className="w-full bg-background relative" id="Home">
      {/* Navbar */}
      <Navbar />
      {/* About */}
      <div className="flex flex-col-reverse xl:flex-col">
      <div className={`text-white ${helveticaThin.className} xl:px-11 xl:py-12 xl:absolute px-10 py-6 xl:top-20`}>
        <h1 className={`text-[28px] mb-5 ${helveticaBold.className}`}>Converse with History&apos;s Greatest Minds</h1>
        <p className="text-[18px] xl:w-[35%] 0.5xl:w-full">Step into the past and engage in conversations with the greatest minds in history. 
          Our AI-powered platform lets you talk directly with iconic figures like Albert Einstein, 
          Marie Curie, and others. Whether you&apos;re seeking knowledge, inspiration, or just a chat with someone who changed the world, 
          this immersive experience brings history to life in ways never before possible. Ask questions, 
          learn from their wisdom, and dive into the stories that shaped our world—right from the comfort of your screen.</p>
      </div>
      {/* New People Carousel */}
      <PoiCarousel slides={NewPoiList} options={{ direction: 'rtl', loop: true }}/>
      </div>
    </div>
    <div className="relative p-4 w-full bg-background" id='Chat-container'>
    {/* Person Grid Area*/}
    <PoiGrid NewPoiList={NewPoiList}/>
    </div>
    </div>
    </>
  );
}

// export default Home;
export default withAuth(Home);