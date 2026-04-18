import React from "react";
import { RiWhatsappLine } from "react-icons/ri";

const WhatsAppButton = () => {
  const phoneNumber = "919111270747"; // Replace with your phone number (include country code, no + or -)
  const message = "Hello! I'd like to chat about your products."; // Pre-filled message (optional)

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-100 pointer-events-auto flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 ease-in-out group"
      aria-label="Chat on WhatsApp"
    >
      {/* Icon */}
      <RiWhatsappLine size={32} />

      {/* Tooltip (Optional) */}
      <span className="absolute w-20 right-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
