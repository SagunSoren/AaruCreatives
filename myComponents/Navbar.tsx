import { cormorant } from "@/app/layout";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between fixed bg-white w-full p-2 z-100">
      <div className="flex items-center gap-1">
        <div className="bg-[#bc785d] text-white w-10 h-10 rounded-full flex items-center justify-center">
          A
        </div>
        <div className="">
          <p
            className={`font-bold text-xl ${cormorant.className} tracking-wide`}
          >
            Aaru Creatives
          </p>
          <p className="uppercase font-light text-xs text-[#8a6b58]">
            Handmade with love
          </p>
        </div>
      </div>
      <a
        href={"https://www.instagram.com/aarucreatives.0?igsh=aW9hZHhhN3FkdHdx"}
        target="_blank"

        className="flex items-center  gap-2 text-[#8a6b58]"
      >
        <FaInstagram />
        <p className="text-sm">@aarucreatives.O</p>
      </a>
    </div>
  );
};
export default Navbar;
