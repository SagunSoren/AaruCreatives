const Carousel = () => {
  return (
    <div className="flex overflow-x-auto gap-3 px-4 pb-6 no-scrollbar text-[#8a6b58] bg-[#faf6f1]">
      <div className="flex-none px-5 py-2 bg-white border rounded-full text-sm   border-[#b97358]/40 whitespace-nowrap">
        🇮🇳 Pan-India Delivery
      </div>

      <div className="flex-none px-5 py-2 bg-white border rounded-full text-sm border-[#b97358]/40 whitespace-nowrap">
        💳 Secure UPI Payments
      </div>

      <div className="flex-none px-5 py-2 bg-white border rounded-full text-sm border-[#b97358]/40 whitespace-nowrap">
        ✨ 100% Handmade
      </div>

      <div className="flex-none px-5 py-2 bg-white border rounded-full text-sm border-[#b97358]/40 whitespace-nowrap">
        💬 Whatsapp Orders
      </div>
    </div>
  );
};
export default Carousel;
