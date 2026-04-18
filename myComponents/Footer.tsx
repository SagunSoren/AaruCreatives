import { cormorant } from "@/app/layout";

const Footer = () => {
  return (
    <div className={`bg-[#faf6f1] pt-10`}>
      <div className="h-0.5 bg-[#b97358]/20 w-full mb-4"></div>
      <div className="text-center ">
        <h1
          className={`text-2xl text-black ${cormorant.className} font-semibold`}
        >
          Aaru Creatives
        </h1>
        <p className="text-[#8a6b58] text-xs">
          Every piece tells a story — yours
        </p>
        {/* <p className="text-[#8a6b58] py-4">Contact Us</p> */}
        <p className="text-[#8a6b58] text-xs pb-2 pt-4">Powered by soren.in</p>
      </div>
    </div>
  );
};
export default Footer;
