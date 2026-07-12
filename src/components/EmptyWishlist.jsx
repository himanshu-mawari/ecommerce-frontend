import React from 'react';
import { Link } from 'react-router-dom';

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center border-t text-center px-4 py-12 md:py-20 lg:py-28 xl:py-36 min-h-[50vh] ">
      {/* Heading */}
      <div className="my-32 xl:my-16">

      <h2 className="text-black font-semibold text-2xl tracking-tight max-w-xs sm:max-w-md md:text-3xl lg:text-4xl  md:max-w-lg lg:max-w-2xl xl:max-w-3xl leading-snug">
        No items in your Favourites
      </h2>
      
      {/* Description */}
      <p className="text-gray-800 font-normal mt-3 max-w-[240px] text-sm sm:max-w-xs md:text-base lg:text-lg  md:mt-4 lg:mt-5 md:max-w-md lg:max-w-lg xl:max-w-xl leading-relaxed">
        Save your favourite items so you don’t lose sight of them.
      </p>
      
      {/* CTA Button */}
      <Link to="/">
      <button className="bg-neutral-900 text-white font-medium rounded-full transition-transform duration-200 active:scale-95 hover:bg-black mt-6 px-6 py-3 text-sm w-full max-w-65 sm:max-w-70 md:mt-8 md:px-8 md:py-4 md:text-base lg:mt-10 lg:text-lg  xl:max-w-[320px]">
        Be inspired by the latest
      </button>
      </Link>
      </div>
    </div>
  );
};

export default EmptyWishlist;