import { cormorant } from "@/app/layout";
import { Cormorant_Garamond } from "next/font/google";

const Hero = () => {
  return (
    <div className="max-w-xl mx-auto bg-linear-to-br from-[#ead8c9] text-center pt-20 pb-4">
      <div className="bg-[#c5856a] w-fit mx-auto text-white py-2 px-4 rounded-2xl">
        <p className="uppercase tracking-wide text-sm">✦ New Arrivals</p>
      </div>
      <div>
        <p className={`text-3xl mb-2 font-bold mt-2 ${cormorant.className} `}>
          Crafted with care,
          <br /> <span className="italic text-[#a85c3f]"> made for you </span>
        </p>
      </div>
      <div>
        <p className="text-[#8a6b58] text-xs">
          Handmade accessories & artisan goods,
          <br /> shipped across India
        </p>
      </div>
    </div>
  );
};
export default Hero;
