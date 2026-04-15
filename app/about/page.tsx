import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const stats = [
  { label: "Years of Experience", value: "10+" },
  { label: "Specialized Companies", value: "3" },
  { label: "Satisfied Clients", value: "100+" },
  { label: "Strategic Operations", value: "UAE-Based" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] text-gray-900 font-sans">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 bg-[#0A111F] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070" className="w-full h-full object-cover" alt="Industrial" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
            About <span className="text-amber-500">Yasil Energy Group</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            A multi-disciplinary business group built on a strong foundation of integrity, 
            innovation, and industry expertise in the heart of the United Arab Emirates.
          </p>
        </div>
      </section>

      {/* Main Content & Stats */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Headquartered in Abu Dhabi, **Yasil Energy Group (YEGroup)** operates across key sectors including energy, trading, and maintenance. We are committed to delivering high-performance solutions and reliable services to clients across the region.
            </p>
            <p>
              The group comprises three specialized companies, each operating in its respective domain while collectively contributing to a unified mission of excellence and customer satisfaction.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
                  <h4 className="text-3xl font-bold text-amber-600">{stat.value}</h4>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-full object-cover" alt="UAE Business" />
          </div>
        </div>
      </section>

      {/* Our Companies Section */}
      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Companies</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Distinct yet complementary companies aligned with our mission to serve diverse markets with efficiency.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company 1 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:-translate-y-2 transition duration-300">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-2">Core Pillar</span>
              <h3 className="text-2xl font-bold mb-1">Yasil Energy</h3>
              <p className="text-sm text-gray-400 italic mb-4 font-medium">Oil Field Equipment Trading</p>
              <p className="text-gray-600 text-sm mb-6 flex-grow">Serving the oil and gas sector with a comprehensive portfolio of high-quality mechanical and safety equipment.</p>
              <ul className="text-xs space-y-2 font-semibold text-gray-800 border-t pt-4 border-gray-50">
                <li>• Onshore & Offshore Support</li>
                <li>• Facilities Maintenance</li>
                <li>• Safety Equipment Wholesale</li>
              </ul>
            </div>

            {/* Company 2 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:-translate-y-2 transition duration-300">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-2">Consumer Goods</span>
              <h3 className="text-2xl font-bold mb-1">Quick Clean Trading</h3>
              <p className="text-sm text-gray-400 italic mb-4 font-medium">Household & Commercial</p>
              <p className="text-gray-600 text-sm mb-6 flex-grow">Supplying electronics, appliances, and vehicle care equipment for home and commercial use.</p>
              <ul className="text-xs space-y-2 font-semibold text-gray-800 border-t pt-4 border-gray-50">
                <li>• Electronic Appliances</li>
                <li>• Car Wash Equipment</li>
                <li>• Cooling & Refrigeration</li>
              </ul>
            </div>

            {/* Company 3 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:-translate-y-2 transition duration-300">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-2">Facility Solutions</span>
              <h3 className="text-2xl font-bold mb-1">Perfect Maintenance</h3>
              <p className="text-sm text-gray-400 italic mb-4 font-medium">Maintenance Solutions</p>
              <p className="text-gray-600 text-sm mb-6 flex-grow">Delivering reliable facility and building maintenance services for residential and commercial properties.</p>
              <ul className="text-xs space-y-2 font-semibold text-gray-800 border-t pt-4 border-gray-50">
                <li>• Facility Management</li>
                <li>• Routine Maintenance</li>
                <li>• On-demand Repair</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-black rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with Yasil Energy Group</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Whether you require oil field equipment, trading solutions, or maintenance services, we are your trusted partner.</p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-3.5 rounded-full font-bold transition-all shadow-lg">
            Get In Touch
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}