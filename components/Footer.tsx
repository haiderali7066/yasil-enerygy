"use client";

import Link from "next/link";

const footerLinks = {
  Home: "/",
  About: "/about",
  Platform: "/platform",
  Contact: "/contact",
};

const footerLinks2 = {
  Speakers: "/speakers",
  Partners: "/partners",
  Schedule: "/schedule",
  News: "/news",
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo + Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M10 20 Q15 10 20 20 Q25 30 30 20" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                  <path d="M10 20 Q15 30 20 20 Q25 10 30 20" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-[0.15em] uppercase leading-tight">WORLD</p>
                <p className="text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase leading-tight">SPORTS</p>
                <p className="text-white text-[9px] tracking-widest uppercase leading-tight">SUMMIT</p>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              The premier global platform bringing together elite decision makers, athletes, and visionaries to shape the future of sports.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-widest uppercase mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {Object.entries(footerLinks).map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-widest uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {Object.entries(footerLinks2).map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            Copyright 2025 World Sports Summit
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/30 hover:text-[#C9A84C] text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/30 hover:text-[#C9A84C] text-xs transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}