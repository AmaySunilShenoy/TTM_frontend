import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import "./styles.css";
import {helveticaBold, helveticaLight } from "@/fonts";
import Image from "next/image";
import instance from "@/constants/axios";
import { NewPoi } from "@/app/home/page";
import TransitionLink from "../TransitionLink";

type PropType = {
  slides: NewPoi[];
  options?: EmblaOptionsType;
};

const PoiCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 6000 }),
  ]);

  const handleClick = async (id: string) => {
    try {
      console.log("ID:", id);
      console.log("poi", slides);
      const response = await instance.post(`/chat/`, {
        poi_id: id,
      });
      const chatId: string = response.data.id;
      console.log("Chat ID:", chatId);
      return chatId;
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  return (
    <section
      className="embla md:bg-spotlight-mini xl:bg-spotlight mt-40px mb-40px ml-auto mr-auto xl:mt-[80px] xl:mr-[50px] xl:mb-[0px] xl:ml-[auto]"
      dir="rtl"
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container w-full xl:w-fit">
          {slides.map(
            (
              poi: {
                about: string;
                poi: { id: string; name: string };
                image: string;
              },
              index: number
            ) => (
              <div className="embla__slide text-white flex-col justify-center" key={`${index}_${poi.about.charAt(0)}`}>
                <div className="flex flex-col-reverse items-center md:flex-row gap-10 xl:gap-0">
                <div className="flex flex-col items-center md:items-start justify-center xl:gap-10 text-left ">
                  <div className="p-2 flex flex-col gap-4">
                    <p className={`text-[30px] ${helveticaBold.className}`}>
                      {poi.poi.name}
                    </p>
                    <p className={`text-[18px] ${helveticaLight.className}`}>
                      {poi.about}
                    </p>
                  </div>
                  <div className={`${helveticaBold.className} w-[98%] text-left xl:text-right`}>
                    <TransitionLink
                      href={`/chat`}
                      before={async () => {
                        const id = await handleClick(poi.poi.id);
                        return id;
                      }}
                    >
                      <button className="bg-white text-black w-full xl:w-full md:w-[50%] py-2 shadow-lg rounded-2xl transition-all hover:-translate-y-2 hover:text-white hover:bg-slate-900">
                        Chat
                      </button>
                    </TransitionLink>
                  </div>
                </div>
                <Image
                  className="w-[80%] md:w-[525px]"
                  src={`/assets/${poi.image}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt=""
                />
                </div>
              </div>
              
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PoiCarousel;
