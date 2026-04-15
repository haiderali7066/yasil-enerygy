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

export default function Contact() {
  const { ref: heroRef, visible: heroVis } = useReveal(0.01);
  const [formState, setFormState] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: '📍', label: 'Headquarters', value: 'P.O. Box 91800, Musaffah 43\nAbu Dhabi, UAE' },
    { icon: '📞', label: 'Phone', value: '+971 2 565 6023\n+971 50 820 6545' },
    { icon: '✉️', label: 'Email', value: 'info@yasilenergy.com' },
  ];

  const services = ['Oil & Gas Equipment', 'Onshore / Offshore Support', 'General Trading', 'Home & Electronic Appliances', 'Car Wash & Cleaning Equipment', 'Building Maintenance', 'Facility Management', 'Other'];

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05) translateX(0); }
          to   { transform: scale(1.13) translateX(-20px); }
        }
        .form-input {
          background: #EFECE5;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 14px 18px;
          font-size: 14px;
          color: #111827;
          width: 100%;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          font-family: inherit;
        }
        .form-input::placeholder { color: #9CA3AF; }
        .form-input:focus {
          border-color: #F97316;
          background: #fff;
        }
        select.form-input { cursor: pointer; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <header className="relative w-full h-[65vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
          alt="Contact"
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
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tighter mb-6 max-w-3xl">
            Let's Build Something<br /><span className="text-orange-400">Together.</span>
          </h1>
          <p className="text-white/70 max-w-lg text-base leading-relaxed">
            Whether you need energy solutions, trading support, or maintenance services — our team is ready to help.
          </p>
        </div>
      </header>

      {/* ═══ CONTACT INFO BENTO ═══ */}
      <ContactInfoSection contactInfo={contactInfo} />

      {/* ═══ FORM + MAP ═══ */}
      <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — 3 cols */}
          <FormCard
            formState={formState}
            setFormState={setFormState}
            submitted={submitted}
            handleSubmit={handleSubmit}
            services={services}
          />
          {/* Sidebar — 2 cols */}
          <ContactSidebar />
        </div>
      </section>

      {/* ═══ COMPANIES ROW ═══ */}
      <CompaniesRow />

      {/* ═══ CTA DARK ═══ */}
      <section className="bg-[#050505] py-24 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Ready to get started?</h2>
          <p className="text-gray-400 max-w-md mb-8 text-base">Our team responds within 24 hours on business days. We look forward to hearing from you.</p>
          <a href="mailto:info@yasilenergy.com" className="inline-block bg-orange-500 hover:bg-orange-400 text-white px-10 py-4 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
            Email Us Directly
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ── sub-components ── */

function ContactInfoSection({ contactInfo }: { contactInfo: any[] }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
        style={{ gridAutoRows: '180px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}
      >
        {contactInfo.map((item, i) => (
          <div
            key={i}
            className="bg-[#EFECE5] rounded-3xl p-8 flex flex-col justify-between hover:bg-[#E5E1D8] hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <p className="text-[10px] text-orange-500 uppercase tracking-[0.2em] font-bold mb-1">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 whitespace-pre-line leading-relaxed">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormCard({ formState, setFormState, submitted, handleSubmit, services }: any) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="lg:col-span-3"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-24px)', transition: 'all 0.8s ease' }}
    >
      <div className="bg-[#EFECE5] rounded-[32px] p-10">
        <h2 className="text-3xl font-extrabold text-black tracking-tight mb-2">Send Us a Message</h2>
        <p className="text-gray-500 text-sm mb-8">Fill out the form and a member of our team will be in touch within 24 hours.</p>

        {submitted ? (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
            <span className="text-4xl block mb-4">✅</span>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 text-sm">Thank you for reaching out. We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Full Name *</label>
                <input
                  required
                  className="form-input"
                  placeholder="Ahmed Al Mansoori"
                  value={formState.name}
                  onChange={e => setFormState((s: any) => ({ ...s, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email Address *</label>
                <input
                  required type="email"
                  className="form-input"
                  placeholder="ahmed@company.com"
                  value={formState.email}
                  onChange={e => setFormState((s: any) => ({ ...s, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Company</label>
                <input
                  className="form-input"
                  placeholder="Your Company Name"
                  value={formState.company}
                  onChange={e => setFormState((s: any) => ({ ...s, company: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Service of Interest</label>
                <select
                  className="form-input"
                  value={formState.service}
                  onChange={e => setFormState((s: any) => ({ ...s, service: e.target.value }))}
                >
                  <option value="">Select a service...</option>
                  {services.map((s: string) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Message *</label>
              <textarea
                required rows={5}
                className="form-input resize-none"
                placeholder="Tell us about your project or enquiry..."
                value={formState.message}
                onChange={e => setFormState((s: any) => ({ ...s, message: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#111827] hover:bg-orange-500 text-white py-4 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 uppercase tracking-widest"
            >
              Send Message ↗
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ContactSidebar() {
  const { ref, visible } = useReveal(0.1);
  const divisons = [
    { name: 'Yasil Energy', role: 'Oil & Gas Division', email: 'energy@yasilenergy.com', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop' },
    { name: 'Quick Clean', role: 'Trading Division', email: 'trading@yasilenergy.com', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop' },
    { name: 'Perfect Maintenance', role: 'Maintenance Division', email: 'maintenance@yasilenergy.com', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div
      ref={ref}
      className="lg:col-span-2 space-y-5"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(24px)', transition: 'all 0.8s ease' }}
    >
      <div className="bg-[#111827] rounded-[32px] p-8">
        <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Response Time</p>
        <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">Within 24 Hours</h3>
        <p className="text-gray-400 text-sm leading-relaxed">Our team operates Sunday–Thursday, 9am–6pm GST. We'll respond to all enquiries promptly.</p>
        <div className="mt-6 flex flex-col gap-3">
          {['+971 2 565 6023', '+971 50 820 6545'].map(p => (
            <a key={p} href={`tel:${p}`} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors group">
              <span className="text-orange-400">📞</span>
              <span className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors">{p}</span>
            </a>
          ))}
          <a href="mailto:info@yasilenergy.com" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors group">
            <span className="text-orange-400">✉️</span>
            <span className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors">info@yasilenergy.com</span>
          </a>
        </div>
      </div>

      {divisons.map((d, i) => (
        <div key={i} className="bg-[#EFECE5] rounded-[24px] overflow-hidden flex items-center gap-5 p-5 hover:bg-[#E5E1D8] transition-colors cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md">
            <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">{d.role}</p>
            <p className="font-extrabold text-gray-900 text-sm tracking-tight">{d.name}</p>
            <p className="text-xs text-gray-500 truncate">{d.email}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shrink-0">
            <span className="text-xs font-bold">↗</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompaniesRow() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto border-b border-gray-200">
      <div
        ref={ref}
        className="flex flex-col md:flex-row items-center justify-between gap-12"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease' }}
      >
        <div>
          <h2 className="text-2xl font-extrabold text-black tracking-tight whitespace-nowrap">Our Group Companies</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Three divisions — one mission.</p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-10 lg:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {[
            { name: 'YASIL ENERGY', sub: 'Oil & Gas' },
            { name: 'QUICK CLEAN', sub: 'General Trading' },
            { name: 'PERFECT', sub: 'Maintenance' },
          ].map((c) => (
            <div key={c.name} className="text-center">
              <p className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">{c.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}