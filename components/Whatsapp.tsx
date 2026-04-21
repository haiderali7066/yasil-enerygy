"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = "97125656023";
  const message = "Hello, I want to inquire about your services";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-10 right-5 z-50"
    >
      <div className="relative w-14 h-14">
        
        {/* Logo Circle */}
        <div className="w-full h-full rounded-full bg-white shadow-lg border flex items-center justify-center overflow-hidden hover:scale-105 transition">
          <Image
            src="/wlogo.jpeg" // replace with your logo
            alt="Company Logo"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>

        {/* WhatsApp Dot */}
        <div className="absolute top-0 right-0 bg-green-500 rounded-full p-1 shadow border-2 border-white">
          <FaWhatsapp size={15} className="text-white" />
        </div>

      </div>
    </button>
  );
};

export default WhatsappButton;