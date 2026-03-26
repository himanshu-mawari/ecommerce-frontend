import { assets } from "../assets/assets.js";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            {/* Made line thinner (1px) and label smaller */}
            <p className="font-medium text-xs md:text-sm tracking-widest uppercase">
              OUR BESTSELLERS
            </p>
          </div>

          {/* Reduced from 6xl to 4xl/5xl for laptop screens */}
          <h1 className="playfair-display text-3xl sm:py-3 lg:text-4xl xl:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-xs md:text-sm tracking-widest">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img
        className="w-full sm:w-1/2 object-cover"
        src={assets.heroImage}
        alt="Hero"
      />
    </div>
  );
};

export default Hero;
