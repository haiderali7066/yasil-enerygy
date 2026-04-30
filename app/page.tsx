'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Link from 'next/link';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ══════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════ */
interface SlideData {
  img: string;
  eyebrow: string;
  headline: string[];
  accent: string;
  tag: string;
}

interface CompanyData {
  tag: string;
  name: string;
  desc: string;
  services: string[];
  img: string;
  href: string;
  external: boolean;
}

interface SectorData {
  title: string;
  img: string;
}

interface NewsItem {
  title: string;
  img: string;
  date: string;
  category: string;
}

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

interface StatCardProps {
  value: string;
  label: string;
}

interface DivisionCardProps {
  title: string;
  sub: string;
  img: string;
}

interface SectorCardProps {
  sector: SectorData;
  index: number;
}

interface CompanyCardProps {
  co: CompanyData;
  delay: number;
}

/* ══════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ══════════════════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════════════════ */
function Reveal({ children, variants = fadeUp, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   HERO CAROUSEL DATA
══════════════════════════════════════════════════ */
const SLIDES: SlideData[] = [
  {
    img: 'https://images.unsplash.com/photo-1624771002998-4aadfd43e7c4?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    eyebrow: 'Energy · Trading · Maintenance',
    headline: ['Powering', 'Industry.', 'Fuelling', 'Growth.'],
    accent: 'Built on Integrity.',
    tag: 'Yasil Energy Group — Abu Dhabi, UAE',
  },
  {
    img: 'https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    eyebrow: 'Oil & Gas Equipment',
    headline: ['Equipment', 'That', 'Performs.'],
    accent: 'Onshore & Offshore Ready.',
    tag: 'Yasil Energy — Core Division',
  },
 
];

/* ══════════════════════════════════════════════════
   HERO — AUTO CAROUSEL (no buttons)
══════════════════════════════════════════════════ */
function HeroCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const INTERVAL = 5800;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const pct = Math.min(elapsed / INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    timerRef.current = setTimeout(advance, INTERVAL);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, advance]);

  return (
    <header className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* SLIDES */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={SLIDES[current].img}
            alt={SLIDES[current].eyebrow}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* COLOUR OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent z-10" />

      {/* SLIDE COUNTER */}
      <div className="absolute top-8 right-10 z-30 font-mono text-[10px] tracking-widest text-white/30">
        {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* ANIMATED COPY */}
      <div className="relative z-20 h-full flex flex-col justify-end px-8 lg:px-20 pb-32 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -18, transition: { duration: 0.35 } }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40 mb-4"
            >
              {SLIDES[current].tag}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-400 mb-5"
            >
              {SLIDES[current].eyebrow}
            </motion.p>
            <motion.h1
              variants={stagger}
              className="leading-[0.9] tracking-[-0.03em] text-white mb-4"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
fontWeight: 400,
fontSize: 'clamp(2rem, 7vw, 6rem)',
              }}
            >
              {SLIDES[current].headline.map((word, i) => (
                <motion.span key={i} variants={fadeUp} className="block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="font-bold tracking-tight text-orange-400"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.8vw, 2.6rem)',
              }}
            >
              {SLIDES[current].accent}
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
              <Link href="/about">
                <motion.span
                  className="inline-block bg-white text-black px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                  whileHover={{ backgroundColor: '#f97316', color: '#fff', scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Our Services
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  className="inline-block border border-white/40 text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest cursor-pointer backdrop-blur-sm"
                  whileHover={{ backgroundColor: '#fff', color: '#000', scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact Us
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PROGRESS INDICATORS (no prev/next buttons) */}
      <div className="absolute bottom-10 left-8 lg:left-20 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="relative h-[2px] rounded-full overflow-hidden"
            style={{
              width: i === current ? 60 : 18,
              background: 'rgba(255,255,255,0.15)',
              transition: 'width 0.45s ease',
            }}
          >
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-orange-400"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0, ease: 'linear' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ORANGE BOTTOM LINE */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400/50 to-transparent z-30" />
    </header>
  );
}

/* ══════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════ */
function StatCard({ value, label }: StatCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      className="bg-[#F0EDE6] rounded-3xl p-8 flex flex-col justify-center items-center text-center"
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
    >
      <h4
        className="text-gray-900 mb-3 tracking-tight"
        style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2.8rem,4.5vw,4rem)',
        }}
      >
        {value}
      </h4>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.22em] leading-snug">
        {label}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   DIVISION CARD (bento)
══════════════════════════════════════════════════ */
function DivisionCard({ title, sub, img }: DivisionCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      className="rounded-3xl relative overflow-hidden cursor-pointer"
      whileHover="hover"
    >
      <motion.img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(35%) brightness(0.75)' }}
        variants={{ hover: { scale: 1.08, filter: 'grayscale(0%) brightness(0.65)' } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40 z-10" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 z-20 origin-left"
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.45 }}
      />
      <div className="absolute top-5 left-5 z-20">
        <p className="text-[8px] font-bold text-orange-400 uppercase tracking-widest mb-1">
          Division
        </p>
        <p className="text-[13px] font-bold text-white leading-snug drop-shadow-lg">{title}</p>
        <p className="text-[10px] text-white/50 mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   BENTO SECTION
══════════════════════════════════════════════════ */
function BentoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <section className="py-36 px-8 lg:px-20 max-w-[1440px] mx-auto">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* HEADING */}
        <motion.div variants={slideLeft} className="mb-20">
          <p className="text-[9px] font-bold text-orange-500 tracking-[0.32em] uppercase mb-4">
            Multi-Sector Business Group
          </p>
          <h2
            className="tracking-[-0.025em] leading-[0.9] text-black mb-6"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            }}
          >
            Three Companies.
            <br />
            <span className="text-gray-300">One Standard.</span>
          </h2>
          <p className="text-gray-500 max-w-xl text-[15px] leading-relaxed">
            Yasil Energy Group operates across energy, trading, and maintenance — delivering
            reliable, high-performance solutions from our UAE base to industries across the region.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ gridAutoRows: '275px' }}
        >
          <StatCard value="10+" label="Years of Industry Experience" />
          <DivisionCard
            title="Yasil Energy"
            sub="Oil & Gas Equipment"
            img="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
          />
          <DivisionCard
            title="Quick Clean Trading"
            sub="Appliances & Equipment"
            img="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=800&auto=format&fit=crop"
          />
          <DivisionCard
            title="Perfect Maintenance"
            sub="Building & Facility Services"
            img="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
          />
          <DivisionCard
            title="Onshore & Offshore"
            sub="Field Operations Support"
            img="https://images.unsplash.com/photo-1543674892-7d64d45df18b?q=80&w=800&auto=format&fit=crop"
          />
          <StatCard value="100+" label="Satisfied Clients Across UAE" />
          <StatCard value="3" label="Specialised Group Companies" />
          <DivisionCard
            title="Quality & Compliance"
            sub="ISO Standards & Safety"
            img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
          />
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-16 flex justify-center">
          <Link href="/about">
            <motion.span
              className="inline-block bg-[#111827] text-white px-12 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest shadow-xl cursor-pointer"
              whileHover={{ backgroundColor: '#1f2937', scale: 1.04, boxShadow: '0 20px 60px rgba(0,0,0,0.28)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              Explore Our Group
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   COMPANY DATA
══════════════════════════════════════════════════ */
const COMPANIES: CompanyData[] = [
  {
    tag: 'YASIL ENERGY',
    name: 'Oil Field Equipment Trading',
    desc: 'The core pillar of YEGroup — serving the oil and gas sector with an extensive portfolio of high-quality equipment, safety gear, and specialized services for onshore and offshore operations.',
    services: [
      'Oil & gas field equipment trading',
      'Onshore & offshore facilities support',
      'Electrical, mechanical & safety equipment',
      'Import and general trading',
    ],
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=900&auto=format&fit=crop',
    href: '/',
    external: false,
  },
  {
    tag: 'QUICK CLEAN',
    name: 'General Trading L.L.C — O.P.C',
    desc: 'High-demand household and commercial products — electronics, home appliances, cooling systems, and professional vehicle care equipment trusted by homes and businesses across the UAE.',
    services: [
      'Home & electronic appliances trading',
      'Car wash & cleaning equipment',
      'Cooling systems & refrigeration units',
      'Commercial kitchen equipment',
    ],
    img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: 'https://qc.yasilenergy.com/',
    external: true,
  },
  {
    tag: 'PERFECT MAINTENANCE',
    name: 'Reliable Maintenance Solutions',
    desc: 'High-quality facility and building maintenance for residential and commercial properties — routine schedules, on-demand repairs, and complete MEP installation & servicing.',
    services: [
      'Complete building & facility maintenance',
      'Routine maintenance schedules',
      'Professional on-demand repair services',
      'MEP installation & servicing',
    ],
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop',
    href: 'https://pgm.yasilenergy.com/',
    external: true,
  },
];

/* ══════════════════════════════════════════════════
   COMPANY CARD
══════════════════════════════════════════════════ */
function CompanyCard({ co, delay }: CompanyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp}
      custom={delay}
      transition={{ delay: delay / 1000 }}
      className="rounded-3xl overflow-hidden shadow-sm cursor-pointer group"
      whileHover={{ y: -8, boxShadow: '0 32px 80px rgba(0,0,0,0.14)' }}
    >
      {/* IMAGE HEADER */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={co.img}
          alt={co.tag}
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(25%) brightness(0.85)' }}
          whileHover={{ scale: 1.1, filter: 'grayscale(0%) brightness(0.7)' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute bottom-5 left-6">
          <span className="text-[8px] font-bold text-orange-400 uppercase tracking-widest">
            {co.tag}
          </span>
          <p
            className="text-white leading-snug mt-0.5"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}
          >
            {co.name}
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="bg-[#EFECE5] p-8 flex flex-col gap-5">
        <p className="text-[13.5px] text-gray-600 leading-relaxed">{co.desc}</p>
        <div>
          <p className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.25em] mb-4">
            Key Services
          </p>
          <ul className="space-y-2.5">
            {co.services.map((s, j) => (
              <li key={j} className="flex items-start gap-3 text-[13.5px] text-gray-700">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        {co.external ? (
          <a href={co.href} target="_blank" rel="noopener noreferrer" className="mt-2 self-start">
            <motion.span
              className="inline-block bg-[#111827] text-white px-7 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md cursor-pointer"
              whileHover={{ backgroundColor: '#f97316', scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Visit Website ↗
            </motion.span>
          </a>
        ) : (
          <Link href={co.href} className="mt-2 self-start">
            <motion.span
              className="inline-block bg-[#111827] text-white px-7 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md cursor-pointer"
              whileHover={{ backgroundColor: '#f97316', scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Visit Website ↗
            </motion.span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   COMPANIES SECTION
══════════════════════════════════════════════════ */
function CompaniesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section className="bg-[#F0EFEB] py-36 px-8 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          ref={ref}
          variants={slideLeft}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-20"
        >
          <p className="text-[9px] font-bold text-orange-500 tracking-[0.32em] uppercase mb-4">
            Group Structure
          </p>
          <h2
            className="tracking-[-0.025em] leading-[0.9] text-black mb-6"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            }}
          >
            Our Companies
          </h2>
          <p className="text-gray-500 max-w-xl text-[15px] leading-relaxed">
            Three distinct yet complementary companies — each specialist-led, each aligned with our
            mission to serve diverse markets with excellence and efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPANIES.map((co, i) => (
            <CompanyCard key={i} co={co} delay={i * 130} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SECTORS DATA
══════════════════════════════════════════════════ */
const SECTORS: SectorData[] = [
  {
    title: 'Energy & Oil · Gas',
    img: 'https://images.unsplash.com/photo-1543674892-7d64d45df18b?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'General Trading',
    img: 'https://plus.unsplash.com/premium_photo-1664372899366-d5fb20b332d1?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Maintenance Services',
    img: 'https://images.unsplash.com/photo-1676311396794-f14881e9daaa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

/* ══════════════════════════════════════════════════
   SECTOR CARD (with parallax)
══════════════════════════════════════════════════ */
function SectorCard({ sector, index }: SectorCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [45, -45]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-md"
      style={{ height: 490 }}
      whileHover="hover"
    >
      <motion.div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={sector.img}
          alt={sector.title}
          className="w-full h-full object-cover"
          style={{ y }}
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 origin-left"
        initial={{ scaleX: 0 }}
        variants={{ hover: { scaleX: 1 } }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-10">
        <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest mb-3">
          Sector
        </p>
        <h3
          className="text-white tracking-tight leading-none"
          style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
          }}
        >
          {sector.title}
        </h3>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   SECTORS SECTION
══════════════════════════════════════════════════ */
function SectorsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section className="py-36 px-8 lg:px-20 max-w-[1440px] mx-auto">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.div variants={slideLeft} className="mb-20">
          <p className="text-[9px] font-bold text-orange-500 tracking-[0.32em] uppercase mb-4">
            What We Cover
          </p>
          <h2
            className="tracking-[-0.025em] leading-[0.9] text-black mb-6"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            }}
          >
            Our Sectors
          </h2>
          <p className="text-gray-500 max-w-lg text-[15px] leading-relaxed">
            Three distinct business areas — each specialist-led, each built to deliver at scale
            across the UAE and wider region.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECTORS.map((t, i) => (
            <SectorCard key={i} sector={t} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PARTNER CTA — PARALLAX BG
══════════════════════════════════════════════════ */
function PartnerCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-44 bg-[#040404]">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.p variants={fadeUp} className="text-[9px] font-bold text-orange-500 tracking-[0.32em] uppercase mb-6">
            Work With Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-white leading-[0.88] tracking-[-0.025em] mb-8 max-w-4xl"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
            }}
          >
            Partner<br />With Us.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-md mb-12 text-[15px] leading-relaxed">
            Yasil Energy Group is your long-term partner in energy, trading, and maintenance.
            Let's build efficient, scalable solutions tailored to your operational needs.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact">
              <motion.span
                className="inline-block bg-orange-500 text-white px-12 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{
                  backgroundColor: '#fb923c',
                  boxShadow: '0 0 50px rgba(249,115,22,0.42)',
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                Get In Touch
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   NEWS DATA
══════════════════════════════════════════════════ */
const NEWS: NewsItem[] = [
  
  {
    title: 'Yasil Energy expands oil & gas equipment portfolio for offshore operations in the UAE',
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // offshore oil rig
    date: 'April 2025',
    category: 'Energy',
  },
  {
    title: 'Quick Clean Trading launches new commercial cooling & refrigeration product line',
    img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=900&auto=format&fit=crop', // industrial refrigeration
    date: 'March 2025',
    category: 'Trading',
  },
  {
    title: 'Perfect General Maintenance reaches 100+ client milestone across Abu Dhabi',
    img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=900&auto=format&fit=crop', // technicians/maintenance work
    date: 'February 2025',
    category: 'Maintenance',
  },

];

/* ══════════════════════════════════════════════════
   NEWS SECTION
══════════════════════════════════════════════════ */
function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section className="py-36 px-8 lg:px-20 max-w-[1440px] mx-auto">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* HEADER ROW */}
        <motion.div
          variants={slideLeft}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="text-[9px] font-bold text-orange-500 tracking-[0.32em] uppercase mb-4">
              Press & Media
            </p>
            <h2
              className="tracking-[-0.025em] leading-[0.9] text-black"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              }}
            >
              Latest News
              <br />
              <span className="text-gray-300">& Updates</span>
            </h2>
          </div>
          <Link href="/about">
            <motion.span
              className="inline-block border border-gray-900 text-gray-900 px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-widest cursor-pointer self-start md:self-auto"
              whileHover={{ backgroundColor: '#111827', color: '#ffffff', borderColor: '#111827' }}
              transition={{ duration: 0.22 }}
            >
              All News ↗
            </motion.span>
          </Link>
        </motion.div>

        {/* NEWS GRID */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-3xl overflow-hidden cursor-pointer relative shadow-md"
              style={{ height: 410 }}
              whileHover={{ y: -7 }}
              transition={{ duration: 0.35 }}
            >
              <motion.img
                src={n.img}
                alt={n.title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="bg-orange-500/90 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {n.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest mb-3">
                  {n.date}
                </p>
                <h3 className="text-white font-bold text-[15px] leading-snug group-hover:text-orange-300 transition-colors duration-300">
                  {n.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   NEWSLETTER SECTION
══════════════════════════════════════════════════ */
function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="bg-[#14120E] py-32 relative overflow-hidden">
      <div
        className="absolute right-0 top-0 opacity-15 w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543674892-7d64d45df18b?q=80&w=900&auto=format&fit=crop')",
        }}
      />
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div>
            <motion.p variants={fadeUp} className="text-[9px] font-bold text-orange-500 tracking-[0.32em] uppercase mb-4">
              Stay Informed
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-white leading-[0.9] tracking-[-0.025em] mb-5"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              }}
            >
              Subscribe To<br />
              <span className="text-orange-500">Our Newsletter</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-md text-[14px] leading-relaxed">
              Receive the latest updates, project milestones, and industry insights directly to your
              inbox.
            </motion.p>
          </div>

          <motion.div variants={scaleIn} className="w-full md:w-auto">
            {submitted ? (
              <div className="flex items-center gap-3 bg-white/5 border border-orange-500/40 px-8 py-5 rounded-2xl">
                <span className="text-orange-400 text-xl">✓</span>
                <p className="text-white text-[14px] font-medium">Thank you for subscribing!</p>
              </div>
            ) : (
              <div className="flex max-w-lg bg-white/5 p-2 rounded-full border border-white/10 focus-within:border-orange-500/50 transition-colors">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="bg-transparent text-white px-6 py-3 w-full md:w-72 focus:outline-none placeholder-gray-500 text-[14px]"
                />
                <motion.button
                  onClick={handleSubmit}
                  className="bg-orange-500 text-white px-8 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider shrink-0"
                  whileHover={{ backgroundColor: '#fb923c', scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Subscribe
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   QUICK LINKS SECTION
══════════════════════════════════════════════════ */
function QuickLinksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section className="py-36 px-8 lg:px-20 max-w-[1440px] mx-auto">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.h2
          variants={slideLeft}
          className="text-black mb-12 tracking-[-0.025em]"
          style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          Quick Links
        </motion.h2>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HQ CARD */}
          <motion.a
            href="https://maps.google.com/?q=Musaffah+43,+Abu+Dhabi,+UAE"
            target="_blank"
            rel="noopener noreferrer"
            variants={scaleIn}
            className="bg-[#EFECE5] rounded-[32px] p-10 flex items-center gap-8 cursor-pointer group"
            whileHover={{ backgroundColor: '#E5E1D8', y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-20 h-28 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white text-[11px] font-bold text-center p-2 leading-tight shrink-0"
              whileHover={{ rotate: -5, scale: 1.08 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-2xl mb-1">🏢</span>
              YEGroup<br />HQ
            </motion.div>
            <div>
              <h3
                className="text-black mb-2 tracking-tight"
                style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}
              >
                Headquarters
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed">
                P.O. Box 91800, Musaffah 43<br />Abu Dhabi, UAE
              </p>
              <p className="text-[13.5px] text-orange-500 font-bold mt-2">+971 2 565 6023</p>
            </div>
          </motion.a>

          {/* ACTION CARDS */}
          <div className="space-y-5">
            {(
              [
                { label: 'Become A Partner', href: '/contact' },
                { label: 'Request a Service', href: '/contact' },
              ] as { label: string; href: string }[]
            ).map(({ label, href }) => (
              <Link key={label} href={href}>
                <motion.div
                  variants={fadeUp}
                  className="bg-[#EFECE5] rounded-[32px] p-8 flex items-center justify-between cursor-pointer group"
                  whileHover={{ backgroundColor: '#E5E1D8', y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-black tracking-tight"
                    style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, fontSize: '1.3rem' }}
                  >
                    {label}
                  </h3>
                  <motion.div
                    className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md"
                    whileHover={{ backgroundColor: '#f97316', scale: 1.15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="font-bold text-[15px]">↗</span>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   ROOT PAGE — LENIS SMOOTH SCROLL
══════════════════════════════════════════════════ */
'use client';

// import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
    } | null = null;

    let rafId: number | null = null;

    (async () => {
      try {
        const { default: Lenis } = await import('lenis');

        // ✅ FIX: removed wrong casting
        lenis = new Lenis({
          lerp: 0.075,
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis?.raf(time); // ✅ safe call
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
      } catch {
        // lenis not installed — fallback
      }
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <main
      className="min-h-screen bg-[#FAFAF8] text-gray-900 selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@700;900&display=swap');
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />
      <HeroCarousel />
      <BentoSection />
      <CompaniesSection />
      <SectorsSection />
      <PartnerCTA />
      <NewsSection />
      <NewsletterSection />
      <QuickLinksSection />
      <Footer />
    </main>
  );
}