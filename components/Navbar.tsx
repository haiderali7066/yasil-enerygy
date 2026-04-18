'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── companies dropdown data ─── */
const companies = [
  {
    tag: 'YASIL ENERGY',
    name: 'Oil Field Equipment Trading',
    sub: 'Oil & gas equipment, onshore & offshore support',
    href: '/companies/yasil-energy',
    icon: '⚡',
  },
  {
    tag: 'QUICK CLEAN',
    name: 'General Trading L.L.C',
    sub: 'Appliances, cleaning & cooling equipment',
    href: '/companies/quick-clean',
    icon: '🏪',
  },
  {
    tag: 'PERFECT MAINTENANCE',
    name: 'Reliable Maintenance Solutions',
    sub: 'Building & facility maintenance services',
    href: '/companies/perfect-maintenance',
    icon: '🔧',
  },
];

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'News',     href: '/news' },
];

export default function Navbar() {
  /* ── scroll state: becomes solid after scrolling down ── */
  const [scrolled, setScrolled]       = useState(false);
  /* ── companies dropdown open ── */
  const [dropOpen, setDropOpen]       = useState(false);
  /* ── mobile menu open ── */
  const [mobileOpen, setMobileOpen]   = useState(false);
  /* ── mobile companies accordion ── */
  const [mobileCoOpen, setMobileCoOpen] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <style>{`
        @keyframes dropIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideDown {
          from { opacity:0; max-height:0; }
          to   { opacity:1; max-height:600px; }
        }
        .dropdown-enter { animation: dropIn 0.2s ease forwards; }
        .mobile-menu-enter { animation: slideDown 0.3s ease forwards; }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent border-b border-white/15 py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            {/*
              Place your logo file at: /public/logo.png
              Then this <Image> will render it automatically.
            */}
            <div className="relative w-20 h-20 overflow-hidden rounded-sm">
              <Image
                src="/logo.jpeg"
                alt="Yasil Energy Group"
                fill
                className="object-contain"
                onError={(e) => {
                  // fallback orange block if logo not found
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Fallback block — hidden once image loads */}
              
            </div>
            <div className="leading-none">
              <p className="text-white font-extrabold text-base tracking-tight">Yasil</p>
              <p className="text-orange-400 font-extrabold text-base tracking-tight -mt-0.5">Energy</p>
              <p className="text-white/50 font-bold text-[10px] uppercase tracking-[0.15em]">Group</p>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-2 py-2 gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200 text-sm font-semibold"
              >
                {link.label}
              </Link>
            ))}

            {/* Companies Dropdown trigger */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200 text-sm font-semibold ${dropOpen ? 'bg-white/10 text-white' : ''}`}
              >
                Companies
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {dropOpen && (
                <div className="dropdown-enter absolute top-full right-0 mt-3 w-[360px] bg-[#111827]/98 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div className="p-3">
                    <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.25em] px-4 py-2">
                      Our Group Companies
                    </p>
                    {companies.map((co) => (
                      <Link
                        key={co.href}
                        href={co.href}
                        onClick={() => setDropOpen(false)}
                        className="flex items-start gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/8 transition-all duration-200 group"
                        style={{ '--tw-bg-opacity': 1 } as React.CSSProperties}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-all duration-200">
                          {co.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] text-orange-400 font-bold uppercase tracking-[0.2em] mb-0.5">{co.tag}</p>
                          <p className="text-white font-bold text-sm leading-tight group-hover:text-orange-300 transition-colors">{co.name}</p>
                          <p className="text-white/40 text-[11px] mt-0.5 leading-snug">{co.sub}</p>
                        </div>
                        <span className="text-white/20 group-hover:text-orange-400 transition-colors text-lg mt-0.5">↗</span>
                      </Link>
                    ))}
                  </div>
                  {/* footer row */}
                  <div className="border-t border-white/8 px-5 py-3.5 flex items-center justify-between bg-white/[0.02]">
                    <span className="text-white/30 text-xs">Yasil Energy Group</span>
                    <Link
                      href="/companies"
                      onClick={() => setDropOpen(false)}
                      className="text-orange-400 hover:text-orange-300 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      View All →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── DESKTOP CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_16px_rgba(249,115,22,0.25)] hover:shadow-[0_0_24px_rgba(249,115,22,0.4)]"
            >
              Contact Us
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-xl hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="mobile-menu-enter md:hidden bg-black/98 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/8 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  {link.label}
                </Link>
              ))}

              {/* Companies accordion */}
              <button
                onClick={() => setMobileCoOpen((v) => !v)}
                className="flex items-center justify-between text-white/80 hover:text-white hover:bg-white/8 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full text-left"
              >
                Companies
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileCoOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileCoOpen && (
                <div className="ml-4 border-l-2 border-orange-500/30 pl-4 flex flex-col gap-2">
                  {companies.map((co) => (
                    <Link
                      key={co.href}
                      href={co.href}
                      onClick={() => { setMobileOpen(false); setMobileCoOpen(false); }}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <span className="text-xl">{co.icon}</span>
                      <div>
                        <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest">{co.tag}</p>
                        <p className="text-white text-sm font-semibold leading-tight">{co.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 mt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-full text-sm font-bold transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}