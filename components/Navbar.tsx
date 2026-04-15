import React from 'react';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-8 py-6 text-white border-b border-white/20">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center font-bold text-xl">YE</div>
          <span className="font-bold text-lg tracking-tight leading-tight">Yasil<br/>Energy<br/>Pvt</span>
        </div>
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 space-x-8 text-sm font-medium">
          <a href="/about" className="hover:text-orange-400 transition">About</a>
          <a href="/contact" className="hover:text-orange-400 transition">Conatct</a>
          <a href="#" className="hover:text-orange-400 transition">Attendees</a>
          <a href="#" className="hover:text-orange-400 transition">News</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition">
            Contact Us
          </button>
        </div>
      </nav>
  );
}