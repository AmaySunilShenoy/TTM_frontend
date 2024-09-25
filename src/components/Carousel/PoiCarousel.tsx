import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import "./styles.css";
import { helvetica, helveticaBold, helveticaLight } from "@/app/fonts";
import Image from "next/image";

type PropType = {
  slides: { image: string; name: string; desc: string }[];
  options?: EmblaOptionsType;
};

const PoiCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 6000 }),
  ]);

  return (
    <section className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide text-white flex" key={index}>
              <div className="flex flex-col gap-10 text-left">
                <div className="p-2 flex flex-col gap-4">
                  <p className={`text-[30px] ${helveticaBold.className}`}>
                    {slide.name}
                  </p>
                  <p className={`text-[18px] ${helveticaLight.className}`}>
                    {slide.desc}
                  </p>
                </div>
                <div className={`${helveticaBold.className} text-right`}>
                  <button className="bg-white text-black w-full py-2 shadow-lg rounded-2xl transition-all hover:-translate-y-2 hover:text-white hover:bg-slate-900">
                    Chat
                  </button>
                </div>
              </div>
              <Image
                className="w-[525px]"
                src={`/assets/${slide.image}`}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoiCarousel;
