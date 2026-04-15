'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ════════════════════════════════════════════════════
   SHARED UTILITIES
════════════════════════════════════════════════════ */

/** Fires once when the element enters the viewport */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/** Animated number counter */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.4);
  useEffect(() => {
    if (!visible) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 55));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); }
      else setCount(n);
    }, 18);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ════════════════════════════════════════════════════
   REUSABLE CARDS  (identical style to WSS)
════════════════════════════════════════════════════ */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#EFECE5] rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h4 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tighter">{value}</h4>
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold leading-snug">{label}</p>
    </div>
  );
}

function DivisionCard({ title, sub, img }: { title: string; sub: string; img: string }) {
  return (
    <div className="rounded-3xl relative overflow-hidden group cursor-pointer">
      {/* label */}
      <div className="absolute top-5 left-5 z-20">
        <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest mb-1 drop-shadow-md">Division</p>
        <p className="text-sm font-bold text-white drop-shadow-lg leading-snug">{title}</p>
        <p className="text-[10px] text-white/60 mt-0.5">{sub}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/30 z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      <img
        src={img} alt={title}
        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        loading="lazy"
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════ */
export default function Home() {
  const { ref: heroRef, visible: heroVis } = useReveal(0.01);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* ── GLOBAL KEYFRAMES ── */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05) translateX(0); }
          to   { transform: scale(1.13) translateX(-20px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity:0; transform:translateX(-40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <header className="relative w-full h-[90vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop"
          alt="Energy Operations"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
          style={{ animation: 'kenBurns 22s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
        {/* orange accent line — matching WSS */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

        <div
          ref={heroRef}
          className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-12 pb-24 max-w-6xl"
          style={{
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Yasil Energy Group — Abu Dhabi, UAE
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tighter mb-8 max-w-4xl">
            Powering Industry.<br />
            Fuelling Growth.<br />
            <span className="text-orange-400">Built on Integrity.</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300">
              Our Services
            </span>
            <button className="bg-transparent border border-white/50 backdrop-blur-sm text-white px-8 py-2.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest">
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          WHO WE ARE — BENTO GRID
      ═══════════════════════════════════════ */}
      <BentoSection />

      {/* ═══════════════════════════════════════
          OUR COMPANIES
      ═══════════════════════════════════════ */}
      <CompaniesSection />

      {/* ═══════════════════════════════════════
          SECTORS
      ═══════════════════════════════════════ */}
      <SectorsSection />

      {/* ═══════════════════════════════════════
          PARTNER CTA
      ═══════════════════════════════════════ */}
      <PartnerCTA />

      {/* ═══════════════════════════════════════
          LATEST NEWS
      ═══════════════════════════════════════ */}
      <NewsSection />

      {/* ═══════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════ */}
      <NewsletterSection />

      {/* ═══════════════════════════════════════
          QUICK LINKS
      ═══════════════════════════════════════ */}
      <QuickLinksSection />

      <Footer />
    </main>
  );
}

/* ─────────────────────────────────────────────────── */

function BentoSection() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div
        ref={ref}
        className="mb-16"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}
      >
        <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">Multi-Sector Business Group</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">Three Companies.<br />One Standard.</h3>
        <p className="text-gray-500 mt-5 max-w-2xl text-base leading-relaxed">
          Yasil Energy Group operates across energy, trading, and maintenance — delivering reliable, high-performance solutions from our UAE base to industries across the region.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ gridAutoRows: '270px' }}>
        <StatCard value="10+" label="Years of Industry Experience" />
        <DivisionCard title="Yasil Energy" sub="Oil & Gas Equipment" img="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop" />
        <DivisionCard title="Quick Clean Trading" sub="Appliances & Equipment" img="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop" />
        <DivisionCard title="Perfect Maintenance" sub="Building & Facility Services" img="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" />
        <DivisionCard title="Onshore & Offshore" sub="Field Operations Support" img="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop" />
        <StatCard value="100+" label="Satisfied Clients Across UAE" />
        <StatCard value="3" label="Specialised Group Companies" />
        <DivisionCard title="Quality & Compliance" sub="Regulatory Standards" img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" />
      </div>

      <div className="mt-16 flex justify-center">
        <button className="bg-[#111827] hover:bg-[#1F2937] text-white px-10 py-3.5 rounded-full text-sm font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
          Explore Our Group
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */

function CompaniesSection() {
  const { ref, visible } = useReveal(0.1);

  const companies = [
    {
      tag: 'YASIL ENERGY',
      name: 'Oil Field Equipment Trading',
      desc: 'Yasil Energy is the core pillar of YEGroup, serving the oil and gas sector with an extensive portfolio of high-quality equipment and specialized services.',
      services: ['Oil & gas field equipment trading', 'Onshore & offshore facilities support', 'Electrical, mechanical & safety equipment wholesale', 'Import and general trading'],
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
      accent: 'bg-orange-500',
    },
    {
      tag: 'QUICK CLEAN',
      name: 'General Trading L.L.C – O.P.C',
      desc: 'Quick Clean General Trading focuses on high-demand household and commercial products, including electronics, home appliances, and vehicle care equipment.',
      services: ['General trading of home & electronic appliances', 'Car wash and cleaning equipment', 'Cooling systems and refrigeration units'],
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop',
      accent: 'bg-orange-500',
    },
    {
      tag: 'PERFECT GENERAL MAINTENANCE',
      name: 'Reliable Maintenance Solutions',
      desc: 'Perfect General Maintenance specializes in high-quality facility and building maintenance solutions for both residential and commercial properties.',
      services: ['Complete building & facility maintenance solutions', 'Routine maintenance services', 'On-demand professional repair services'],
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
      accent: 'bg-orange-500',
    },
  ];

  return (
    <section className="bg-[#F0EFEB] py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={ref}
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}
          className="mb-16"
        >
          <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">Group Structure</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">Our Companies</h3>
          <p className="text-gray-600 mt-5 max-w-2xl text-base leading-relaxed">
            Our group consists of three distinct yet complementary companies, each specialized in its field and aligned with our mission to serve diverse markets with excellence and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((co, i) => (
            <CompanyCard key={i} co={co} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({ co, delay }: { co: any; delay: number }) {
  const { ref, visible } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className={`rounded-3xl overflow-hidden shadow-sm cursor-pointer group transition-all duration-500 ${hovered ? 'shadow-2xl -translate-y-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={co.img}
          alt={co.tag}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">{co.tag}</span>
          <p className="text-base font-extrabold text-white tracking-tight leading-snug mt-0.5">{co.name}</p>
        </div>
        {/* orange bottom accent bar on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Body */}
      <div className="bg-[#EFECE5] p-7 flex flex-col gap-5">
        <p className="text-sm text-gray-600 leading-relaxed">{co.desc}</p>
        <div>
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Key Services</p>
          <ul className="space-y-2">
            {co.services.map((s: string, j: number) => (
              <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <button className="mt-2 self-start bg-[#111827] hover:bg-orange-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
          Visit Website ↗
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────── */

function SectorsSection() {
  const { ref, visible } = useReveal(0.1);
  const themes = [
    { title: 'Energy & Oil · Gas', img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop' },
    { title: 'General Trading',     img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop' },
    { title: 'Maintenance Services',img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop' },
  ];
  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">Our Sectors</h2>
        <p className="text-gray-600 mb-12 max-w-2xl text-base">
          Three distinct business areas — each specialist-led, each built to deliver at scale across the UAE.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[450px]">
          {themes.map((t, i) => (
            <div key={i} className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md">
              <img src={t.img} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <h3 className="absolute bottom-8 left-8 text-2xl font-bold text-white tracking-wide">{t.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */

function PartnerCTA() {
  return (
    <section className="bg-[#050505] py-28 relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Partner With Us</h2>
        <p className="text-gray-400 max-w-lg mb-10 text-base leading-relaxed">
          Yasil Energy Group is your long-term partner in energy, trading, and maintenance. Let's build efficient, scalable solutions tailored to your operational needs.
        </p>
        <button className="bg-orange-500 hover:bg-orange-400 text-white px-10 py-4 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
          Get In Touch
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */

function NewsSection() {
  const { ref, visible } = useReveal(0.1);
  const news = [
    { title: 'Yasil Energy expands oil & gas equipment portfolio for offshore operations in the UAE', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop' },
    { title: 'Quick Clean Trading launches new commercial cooling & refrigeration product line', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop' },
    { title: 'Perfect General Maintenance reaches 100+ client milestone across Abu Dhabi', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop' },
  ];
  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
          Latest News<br /><span className="text-gray-400">and Updates</span>
        </h2>
        <p className="text-gray-500 mb-12 max-w-2xl text-base">
          Stay informed with announcements and insights from Yasil Energy Group.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer relative h-[380px] shadow-md">
              <img src={n.img} alt={n.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-orange-400 transition-colors duration-300">{n.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */

function NewsletterSection() {
  return (
    <section className="bg-[#14120E] py-28 relative overflow-hidden">
      <div className="absolute right-0 top-0 opacity-20 w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop')" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Subscribe To<br /><span className="text-orange-500">Our Newsletter</span></h2>
          <p className="text-gray-400 max-w-md text-base">Receive the latest updates, project milestones, and industry insights directly to your inbox.</p>
        </div>
        <div className="w-full md:w-auto flex max-w-lg bg-white/5 p-2 rounded-full border border-white/10 shadow-2xl focus-within:border-orange-500/50 transition-colors">
          <input type="email" placeholder="Your Email Address" className="bg-transparent text-white px-6 py-3 w-full md:w-80 focus:outline-none placeholder-gray-500 text-sm" />
          <button className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-3 rounded-full text-sm font-bold transition-colors">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */

function QuickLinksSection() {
  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-extrabold text-black mb-10 tracking-tight">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HQ Card */}
        <div className="bg-[#EFECE5] rounded-[32px] p-10 flex items-center gap-8 group cursor-pointer hover:bg-[#E5E1D8] transition-colors shadow-sm">
          <div className="w-20 h-28 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white text-xs font-bold text-center p-2 leading-tight transform group-hover:-rotate-3 group-hover:scale-105 transition-all duration-500 shrink-0">
            <span className="text-2xl mb-1">🏢</span>YEGroup<br />HQ
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black mb-2 tracking-tight">Headquarters</h3>
            <p className="text-sm text-gray-500 leading-relaxed">P.O. Box 91800, Musaffah 43<br />Abu Dhabi, UAE</p>
            <p className="text-sm text-orange-500 font-semibold mt-2">+971 2 565 6023</p>
          </div>
        </div>
        {/* Action Cards */}
        <div className="space-y-5">
          {['Become A Partner', 'Request a Service'].map((label) => (
            <div key={label} className="bg-[#EFECE5] rounded-[32px] p-8 flex items-center justify-between group cursor-pointer hover:bg-[#E5E1D8] transition-colors shadow-sm">
              <h3 className="text-xl font-bold text-black tracking-tight">{label}</h3>
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <span className="font-bold text-base">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}