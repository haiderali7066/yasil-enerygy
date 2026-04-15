'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

export default function About() {
  const { ref: heroRef, visible: heroVis } = useReveal(0.01);

  const values = [
    { icon: '⚖️', title: 'Integrity', desc: 'We uphold honesty and transparency in every interaction and decision we make.' },
    { icon: '💡', title: 'Innovation', desc: 'We embrace new ideas and technologies to deliver forward-thinking solutions.' },
    { icon: '✅', title: 'Quality', desc: 'Strict adherence to regulatory standards and quality benchmarks across all sectors.' },
    { icon: '🔒', title: 'Reliability', desc: 'Clients depend on us for consistent, high-performance delivery every time.' },
    { icon: '🤝', title: 'Customer Commitment', desc: 'Building lasting partnerships through dedication to client success and satisfaction.' },
  ];

  const advantages = [
    { title: 'Industry-Specific Expertise', desc: 'Specialized knowledge across multiple sectors enables tailored and effective solutions.' },
    { title: 'Quality & Compliance', desc: 'Strict adherence to regulatory standards and quality benchmarks at every level.' },
    { title: 'Trusted Reputation', desc: 'A growing client base across the UAE reflects our trust and reliability over 10+ years.' },
    { title: 'Scalable Solutions', desc: 'Services designed to adapt and grow with client needs as their operations expand.' },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05) translateX(0); }
          to   { transform: scale(1.13) translateX(-20px); }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <header className="relative w-full h-[70vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="About Yasil Energy"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ animation: 'kenBurns 22s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

        <div
          ref={heroRef}
          className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-12 pb-20 max-w-6xl"
          style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(32px)', transition: 'all 1s ease' }}
        >
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">About Us</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tighter mb-6 max-w-3xl">
            A Legacy of Trust.<br /><span className="text-orange-400">A Future of Growth.</span>
          </h1>
          <p className="text-white/70 max-w-xl text-base leading-relaxed">
            Yasil Energy Group is a multi-disciplinary business group headquartered in the UAE, delivering reliable and high-performance solutions across energy, trading, and maintenance.
          </p>
        </div>
      </header>

      {/* ═══ OVERVIEW ═══ */}
      <OverviewSection />

      {/* ═══ STATS BAND ═══ */}
      <section className="bg-[#0A0A0A] py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { target: 10, suffix: '+', label: 'Years Experience' },
            { target: 3,  suffix: '',  label: 'Group Companies' },
            { target: 100, suffix: '+', label: 'Satisfied Clients' },
            { target: 50, suffix: '+', label: 'Countries Sourced' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-extrabold text-white tracking-tighter mb-2">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-orange-400 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VISION & MISSION ═══ */}
      <VisionMissionSection />

      {/* ═══ VALUES ═══ */}
      <section className="bg-[#F0EFEB] py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ValuesHeader />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-12" style={{ gridAutoRows: '220px' }}>
            {values.map((v, i) => (
              <ValueCard key={i} v={v} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPETITIVE ADVANTAGES ═══ */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <AdvantagesSection advantages={advantages} />
      </section>

      {/* ═══ TEAM / CULTURE CTA ═══ */}
      <section className="bg-[#050505] py-28 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Join Our Network</h2>
          <p className="text-gray-400 max-w-lg mb-10 text-base leading-relaxed">
            Whether you're a client, partner, or industry professional — Yasil Energy Group welcomes long-term relationships built on trust, quality, and mutual growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-400 text-white px-10 py-4 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
              Contact Us
            </button>
            <button className="bg-transparent border border-white/40 text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all duration-300">
              Our Services
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ── sub-components ── */

function OverviewSection() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}
      >
        <div>
          <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">Who We Are</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-6">
            Built on expertise.<br />Driven by results.
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Yasil Energy Group (YEGroup) is a multi-disciplinary business group headquartered in the United Arab Emirates. The company operates with a strong foundation built on integrity, innovation, and industry expertise.
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Strategically positioned in the UAE, YEGroup delivers reliable and high-performance solutions across the energy, trading, and maintenance sectors — serving clients ranging from oil & gas companies to residential property owners.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Integrity', 'Innovation', 'Quality', 'Reliability'].map((tag) => (
              <span key={tag} className="bg-[#EFECE5] text-gray-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl overflow-hidden h-52 relative group shadow-md">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop" alt="Energy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest">Energy</p>
          </div>
          <div className="rounded-3xl overflow-hidden h-52 relative group shadow-md mt-6">
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop" alt="Trading" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest">Trading</p>
          </div>
          <div className="rounded-3xl overflow-hidden h-52 relative group shadow-md col-span-2">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop" alt="Maintenance" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest">Maintenance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}
      >
        <div className="bg-[#111827] rounded-3xl p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">Our Vision</p>
          <h3 className="text-2xl font-extrabold text-white tracking-tight mb-4 leading-snug">
            A Leading Multi-Disciplinary Business Group
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To be a leading multi-disciplinary business group recognized for delivering high-quality, reliable, and innovative solutions across energy, trading, and maintenance sectors.
          </p>
        </div>
        <div className="bg-[#EFECE5] rounded-3xl p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-sm">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Our Mission</p>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4 leading-snug">
            Efficient, Scalable, Industry-Focused Solutions
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To provide efficient, scalable, and industry-focused solutions while maintaining high standards of quality, compliance, and customer satisfaction across all our business sectors.
          </p>
        </div>
      </div>
    </section>
  );
}

function ValuesHeader() {
  const { ref, visible } = useReveal(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
      <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">What Drives Us</h2>
      <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">Our Core Values</h3>
    </div>
  );
}

function ValueCard({ v, delay }: { v: any; delay: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `all 0.7s ease ${delay}ms` }}
      className="bg-white rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      <span className="text-3xl">{v.icon}</span>
      <div>
        <h4 className="text-lg font-extrabold text-gray-900 tracking-tight mb-2">{v.title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
      </div>
    </div>
  );
}

function AdvantagesSection({ advantages }: { advantages: any[] }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
      <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">Why Choose Us</h2>
      <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-12">Competitive Advantages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {advantages.map((a, i) => (
          <div key={i} className="bg-[#EFECE5] rounded-3xl p-8 flex gap-5 items-start hover:bg-[#E5E1D8] transition-colors hover:-translate-y-0.5 duration-300 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-gray-900 tracking-tight mb-2">{a.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}