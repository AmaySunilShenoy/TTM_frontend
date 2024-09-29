import React from "react";

const LoadingPoiCard = () => {
  return (
    <div className="relative w-32 h-52 sm:w-40 sm:h-64 md:w-52 md:h-80 bg-gray-700 rounded-[30px] animate-pulse flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shine"></div>
    </div>
  );
};

export default LoadingPoiCard;
