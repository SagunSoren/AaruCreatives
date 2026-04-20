import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const ImageCard = ({ data }) => {
  return (
    <Drawer>
      {/* The Card acts as the Trigger */}
      <DrawerTrigger asChild>
        <div className="shadow-md rounded-2xl h-54 overflow-hidden bg-white cursor-pointer active:scale-95 transition-transform">
          <div className="h-40 w-full relative group">
            <Image
              src={data?.image}
              alt={data.title}
              fill
              loading="eager"
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-300 group-hover:scale-110"
            />
            {data.isNew && (
              <div className="absolute text-white rounded-xl top-2 bg-[#c5856a] left-2 px-2 uppercase text-xs py-1 tracking-wide">
                <p>NEW</p>
              </div>
            )}
          </div>
          <div className="p-2">
            <p className="text-sm font-medium">{data.title}</p>
            <p className="text-[#b97358] text-sm">₹{data.price}</p>
          </div>
        </div>
      </DrawerTrigger>

      {/* The Actual Drawer Pop-up */}
      <DrawerContent className="bg-[#f8f0e8] border-none ">
        <div className="mx-auto w-full max-w-sm px-6">
          <div className="relative w-full">
            <div className="relative w-full h-60 overflow-hidden rounded-3xl shadow-sm">
              <Image
                src={data?.image}
                alt={data.title}
                fill
                priority // Ensures this image loads fast when drawer opens
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-xl text-left font-cormorant font-semibold text-gray-800">
              {data.title}
            </DrawerTitle>
            <DrawerDescription className="text-[#b97358] text-lg text-left font-medium">
              ₹{data.price}
            </DrawerDescription>
          </DrawerHeader>

          <div className="">
            <p className="text-gray-600 italic leading-relaxed">
              {data.description ||
                "Handcrafted with precision and love. Each piece is unique and made to order."}
            </p>
          </div>

          <DrawerFooter className="px-0 pt-4">
            <a
              href={`https://wa.me/+919111270747?text=Hi, I'm interested in the ${data.title}`}
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
            >
              Order on WhatsApp
            </a>
            <DrawerClose asChild>
              <button className="w-full py-2 text-sm text-gray-400">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ImageCard;
