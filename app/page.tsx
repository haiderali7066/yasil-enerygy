'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── scroll-reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.4);
  useEffect(() => {
    if (!visible) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); }
      else setCount(n);
    }, 18);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── stat card ─── */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#EFECE5] rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 duration-300">
      <h4 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tighter">{value}</h4>
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold leading-snug">{label}</p>
    </div>
  );
}

/* ─── sector / service photo card ─── */
function SectorCard({ title, sub, img }: { title: string; sub: string; img: string }) {
  return (
    <div className="bg-[#EFECE5] rounded-3xl relative overflow-hidden group" style={{ minHeight: 260 }}>
      <div className="absolute top-5 left-5 z-20">
        <p className="text-[9px] font-bold text-white/75 uppercase tracking-widest mb-1 drop-shadow-md">Division</p>
        <p className="text-sm font-bold text-white drop-shadow-lg leading-snug">{title}</p>
        <p className="text-[10px] text-white/65 mt-0.5 drop-shadow">{sub}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/25 z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        loading="lazy"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */
export default function Home() {
  const { ref: heroRef, visible: heroVisible } = useReveal(0.01);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-gray-900 font-sans selection:bg-[#2E7D32] selection:text-white">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════ */}
      <header className="relative w-full h-[90vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop"
          alt="Oil & Gas Operations"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
          style={{ animation: 'kenBurns 24s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        {/* green accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2E7D32] via-[#66BB6A] to-transparent" />

        <div
          ref={heroRef}
          className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-16 pb-24 max-w-6xl"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <p className="text-[#66BB6A] text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Yasil Energy Group — Abu Dhabi, UAE
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tighter mb-8 max-w-4xl">
            Powering Industry.<br />
            Fuelling Growth.<br />
            <span className="text-[#66BB6A]">Built on Integrity.</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#2E7D32] hover:bg-[#388E3C] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg cursor-pointer transition-colors duration-300">
              Our Services
            </span>
            <button className="bg-transparent border border-white/50 backdrop-blur-sm text-white px-8 py-2.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest">
              Contact Us
            </button>
          </div>
        </div>

        <style>{`
          @keyframes kenBurns {
            from { transform: scale(1.05) translateX(0px); }
            to   { transform: scale(1.13) translateX(-20px); }
          }
        `}</style>
      </header>

      {/* ══ BENTO / WHO WE ARE ══════════════════════════════ */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-bold text-[#2E7D32] tracking-widest uppercase mb-3">Multi-Sector Business Group</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            Three Companies.<br />One Standard.
          </h3>
          <p className="text-gray-500 mt-5 max-w-2xl text-base leading-relaxed">
            Yasil Energy Group operates across energy, trading, and maintenance — delivering reliable, high-performance solutions from our UAE base to industries across the region.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ gridAutoRows: '270px' }}>
          <StatCard value="10+" label="Years of Industry Experience" />

          <SectorCard
            title="Yasil Energy"
            sub="Oil & Gas Equipment & Services"
            img="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
          />
          <SectorCard
            title="Quick Clean Trading"
            sub="Appliances & Cleaning Equipment"
            img="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop"
          />
          <SectorCard
            title="Perfect Maintenance"
            sub="Building & Facility Services"
            img="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
          />

          <SectorCard
            title="Onshore & Offshore"
            sub="Field Equipment & Facilities"
            img="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"
          />
          <StatCard value="100+" label="Satisfied Clients Across UAE" />
          <StatCard value="3" label="Specialised Group Companies" />
          <SectorCard
            title="Quality & Compliance"
            sub="Regulatory Standards Met"
            img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
          />
        </div>

        <div className="mt-16 flex justify-center">
          <button className="bg-[#111827] hover:bg-[#1F2937] text-white px-10 py-3.5 rounded-full text-sm font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            Explore Our Group
          </button>
        </div>
      </section>

      {/* ══ SECTORS GRID ════════════════════════════════════ */}
      <section className="bg-[#F0EFEB] py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">Our Sectors</h2>
          <p className="text-gray-600 mb-12 max-w-2xl text-base">
            Three distinct business areas, each specialist-led and built to deliver at scale.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[450px]">
            {[
              { title: 'Energy & Oil · Gas', img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop' },
              { title: 'General Trading', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop' },
              { title: 'Maintenance Services', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop' },
            ].map((s, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md">
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2E7D32] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <h3 className="absolute bottom-8 left-8 text-2xl font-bold text-white tracking-wide">{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS BAND ══════════════════════════════════════ */}
      <section className="bg-[#0A1A0B] py-20 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)',
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { target: 10, suffix: '+', label: 'Years Experience' },
            { target: 3,  suffix: '',  label: 'Group Companies' },
            { target: 100, suffix: '+', label: 'Satisfied Clients' },
            { target: 5,  suffix: '',  label: 'UAE Sectors Served' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-extrabold text-white tracking-tighter mb-2">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#66BB6A] font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PARTNER CTA ═════════════════════════════════════ */}
      <section className="bg-[#050505] py-28 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop"
          alt="Energy Operations"
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Partner With Us</h2>
          <p className="text-gray-400 max-w-lg mb-10 text-base leading-relaxed">
            Yasil Energy Group is your long-term partner in energy, trading, and maintenance. Let's build efficient, scalable solutions tailored to your operational needs.
          </p>
          <button
            className="bg-[#2E7D32] hover:bg-[#388E3C] text-white px-10 py-4 rounded-full text-sm font-bold transition-all"
            style={{ boxShadow: '0 0 20px rgba(46,125,50,0.35)' }}
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* ══ LATEST NEWS ═════════════════════════════════════ */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
          Latest News<br />
          <span className="text-gray-400">and Updates</span>
        </h2>
        <p className="text-gray-500 mb-12 max-w-2xl text-base">
          Stay informed with announcements and insights from Yasil Energy Group.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Yasil Energy expands oil & gas equipment portfolio for offshore operations',
              img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop',
            },
            {
              title: 'Quick Clean Trading launches new commercial cooling & refrigeration line in UAE',
              img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop',
            },
            {
              title: 'Perfect General Maintenance reaches 100+ client milestone across Abu Dhabi',
              img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
            },
          ].map((news, i) => (
            <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer relative h-[380px] shadow-md">
              <img
                src={news.img}
                alt={news.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[#66BB6A] transition-colors duration-300">
                  {news.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ NEWSLETTER ══════════════════════════════════════ */}
      <section className="bg-[#0D1B0E] py-28 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Subscribe To<br />
              <span className="text-[#66BB6A]">Our Newsletter</span>
            </h2>
            <p className="text-gray-400 max-w-md text-base">
              Receive the latest updates, project milestones, and industry insights from Yasil Energy Group.
            </p>
          </div>
          <div className="w-full md:w-auto flex max-w-lg bg-white/5 p-2 rounded-full border border-white/10 shadow-2xl focus-within:border-[#2E7D32]/60 transition-colors">
            <input
              type="email"
              placeholder="Your Email Address"
              className="bg-transparent text-white px-6 py-3 w-full md:w-72 focus:outline-none placeholder-gray-500 text-sm"
            />
            <button className="bg-[#2E7D32] hover:bg-[#388E3C] text-white px-8 py-3 rounded-full text-sm font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES BAR ══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-2xl font-extrabold text-black tracking-tight whitespace-nowrap">Industries We Serve</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Trusted by businesses across the UAE</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-10 lg:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
            {['Oil & Gas', 'Commercial', 'Industrial', 'Residential', 'Facilities'].map((label) => (
              <div key={label} className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUICK LINKS ═════════════════════════════════════ */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-extrabold text-black mb-10 tracking-tight">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* HQ contact card */}
          <div className="bg-[#EFECE5] rounded-[32px] p-10 flex items-center gap-8 group cursor-pointer hover:bg-[#E5E1D8] transition-colors">
            <div
              className="w-20 h-28 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white text-xs font-bold text-center p-2 leading-tight transform group-hover:-rotate-3 group-hover:scale-105 transition-all duration-500 shrink-0"
              style={{ background: 'linear-gradient(135deg,#2E7D32,#1B5E20)' }}
            >
              <span className="text-2xl mb-1">🏢</span>
              YEGroup<br />HQ
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black mb-2 tracking-tight">Headquarters</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                P.O. Box 91800, Musaffah 43<br />Abu Dhabi, UAE
              </p>
              <p className="text-sm text-[#2E7D32] font-semibold mt-2">+971 2 565 6023</p>
            </div>
          </div>

          {/* Action cards */}
          <div className="space-y-5">
            {['Become A Partner', 'Request a Service'].map((label) => (
              <div
                key={label}
                className="bg-[#EFECE5] rounded-[32px] p-8 flex items-center justify-between group cursor-pointer hover:bg-[#E5E1D8] transition-colors"
              >
                <h3 className="text-xl font-bold text-black tracking-tight">{label}</h3>
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                  <span className="font-bold text-base">↗</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}