import React from 'react';
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import Footer from '@/components/Footer'; // Adjust path if necessary
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative w-full h-[90vh] bg-black overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
          alt="Summit Gathering" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-12 pb-24 max-w-6xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter mb-8 max-w-4xl">
            World Sports Summit kicks off Monday in Dubai under the patronage of Sheikh Hamdan bin Mohammed
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
              April 15
            </span>
            <button className="bg-transparent border border-white/50 backdrop-blur-sm text-white px-8 py-2.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest">
              Read More
            </button>
          </div>
        </div>
      </header>

      {/* Attendees Section (Refined Bento Grid) */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">World-class Attendees</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">Endless Impact</h3>
          <p className="text-gray-600 mt-5 max-w-2xl text-lg leading-relaxed">
            Our global network of sports leaders converge to shape the future of the industry and foster international cooperation.
          </p>
        </div>

        {/* Bento Grid Array */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[280px]">
          {/* 1. Stat Card */}
          <div className="bg-[#EFECE5] rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <h4 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tighter">1,500</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Attendees from 50+ Countries</p>
          </div>

          {/* 2-5. Speaker Cards */}
          {[
            { name: "Gianni Infantino", Image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
            { name: "Nasser Al-Khelaifi", Image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
            { name: "H.E. Saeed Hareb", Image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop" },
            { name: "Ronaldo", Image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
          ].map((speaker, i) => (
            <div key={i} className="bg-[#EFECE5] rounded-3xl relative overflow-hidden group">
              <div className="absolute top-5 left-5 z-20">
                <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1 drop-shadow-md">Speaker</p>
                <p className="text-sm font-bold text-white drop-shadow-lg">{speaker.name}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <Image src={speaker.Image} className="absolute inset-0 w-full h-full object-cover object-top grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={speaker.name} loading="lazy" />
            </div>
          ))}

          {/* 6. Stat Card */}
          <div className="bg-[#EFECE5] rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <h4 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tighter">80+</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">World Class Speakers</p>
          </div>

          {/* 7. Speaker Card */}
          <div className="bg-[#EFECE5] rounded-3xl relative overflow-hidden group">
            <div className="absolute top-5 left-5 z-20">
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1 drop-shadow-md">Speaker</p>
              <p className="text-sm font-bold text-white drop-shadow-lg">Khabib Nurmagomedov</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover object-top grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Speaker" loading="lazy" />
          </div>

          {/* 8. Stat Card */}
          <div className="bg-[#EFECE5] rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <h4 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tighter">20+</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Strategic Sessions</p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="bg-[#111827] hover:bg-[#1F2937] text-white px-10 py-3.5 rounded-full text-sm font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            See All Attendees
          </button>
        </div>
      </section>

      {/* Themes Section */}
      <section className="bg-[#F0EFEB] py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">2026 Themes</h2>
          <p className="text-gray-600 mb-12 max-w-2xl text-lg">
            Explore the key discussions driving the future of sports. Our agenda covers the most critical topics shaping the industry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[450px]">
            {[
              { title: "Elite Women Sports", Image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop" },
              { title: "Technology & AI", Image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop" },
              { title: "Philanthropy", Image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop" }
            ].map((theme, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                <Image src={theme.Image} alt={theme.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                <h3 className="absolute bottom-8 left-8 text-2xl font-bold text-white tracking-wide">{theme.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-[#050505] py-28 relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop" alt="Runners" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Be A Partner</h2>
          <p className="text-gray-400 max-w-lg mb-10 text-lg">
            Elevate your brand by aligning with the leading voices in global sports. Join us in shaping the future.
          </p>
          <button className="bg-orange-500 hover:bg-orange-400 text-white px-10 py-4 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
            Explore Partnerships
          </button>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">Latest News<br/><span className="text-gray-400">and Updates</span></h2>
        <p className="text-gray-600 mb-12 max-w-2xl text-lg">
          Stay informed with the latest announcements and insights from the World Sports Summit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Sheikh Hamdan attends the World Sports Summit", Image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop" },
            { title: "World Sports Summit signs MoU with Real Madrid", Image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800&auto=format&fit=crop" },
            { title: "Record-breaking attendance at the 2026 Summit closing ceremony", Image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop" }
          ].map((news, i) => (
            <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer relative h-[380px] shadow-lg">
              <Image src={news.Image} alt="News" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white font-bold text-xl leading-tight group-hover:text-orange-400 transition-colors">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#14120E] py-28 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-20 w-full md:w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen mask-image-gradient-l"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Subscribe To<br/><span className="text-orange-500">Our Newsletter</span></h2>
            <p className="text-gray-400 max-w-md text-lg">
              Receive the latest updates, speaker announcements, and exclusive content directly to your inbox.
            </p>
          </div>
          <div className="w-full md:w-auto flex max-w-lg bg-white/5 p-2 rounded-full backdrop-blur-md border border-white/10 shadow-2xl focus-within:border-orange-500/50 transition-colors">
            <input type="email" placeholder="Your Email Address" className="bg-transparent text-white px-6 py-3 w-full md:w-80 focus:outline-none placeholder-gray-500 text-sm" />
            <button className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-3 rounded-full text-sm font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Partners Minimalist Bar */}
      <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <h2 className="text-2xl font-extrabold text-black tracking-tight whitespace-nowrap">Our Partners<br/><span className="text-sm text-gray-500 font-medium tracking-normal">Fueling the passion</span></h2>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-10 w-28 bg-gray-900 rounded-sm flex items-center justify-center text-white font-bold text-[10px] tracking-widest uppercase">Emirates</div>
            <div className="text-2xl font-extrabold text-black flex items-center gap-1 tracking-tighter">TikTok</div>
            <div className="text-xl font-bold text-gray-900 uppercase tracking-widest">FIDE | <span className="text-sm font-medium">CHESS</span></div>
            <div className="text-lg font-bold text-gray-900 text-center leading-none tracking-tight">DUBAI<br/><span className="text-[10px] tracking-widest uppercase text-gray-500">Sports Council</span></div>
          </div>
        </div>
      </section>

      {/* Quick Links Bento */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-extrabold text-black mb-10 tracking-tight">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* App Card */}
          <div className="bg-[#EFECE5] rounded-[32px] p-10 flex items-center justify-between group cursor-pointer hover:bg-[#E5E1D8] transition-colors shadow-sm">
            <div className="flex items-center gap-8">
              <div className="w-20 h-28 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-xl flex items-center justify-center text-white text-xs font-bold text-center p-2 leading-tight transform group-hover:-rotate-3 group-hover:scale-105 transition-all duration-500">
                Summit<br/>App
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">Download Our App</h3>
                <div className="flex gap-3">
                   <div className="bg-black hover:bg-gray-800 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-colors">App Store</div>
                   <div className="bg-black hover:bg-gray-800 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-colors">Google Play</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="space-y-6">
            <div className="bg-[#EFECE5] rounded-[32px] p-10 flex items-center justify-between group cursor-pointer hover:bg-[#E5E1D8] transition-colors shadow-sm">
              <h3 className="text-2xl font-bold text-black tracking-tight">Become A Partner</h3>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <span className="font-bold text-lg">↗</span>
              </div>
            </div>

            <div className="bg-[#EFECE5] rounded-[32px] p-10 flex items-center justify-between group cursor-pointer hover:bg-[#E5E1D8] transition-colors shadow-sm">
              <h3 className="text-2xl font-bold text-black tracking-tight">Get In Touch</h3>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <span className="font-bold text-lg">↗</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}