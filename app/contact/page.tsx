import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] text-gray-900 font-sans">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info Column */}
            <div className="lg:w-1/3">
              <h1 className="text-5xl font-extrabold tracking-tight mb-8">Contact Us</h1>
              <p className="text-gray-600 mb-12 text-lg">
                Explore solutions tailored to your business needs. Our team is ready to assist you across the UAE.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase text-xs tracking-widest mb-1">Headquarters</h4>
                    <p className="text-gray-600 leading-relaxed">P.O. Box 91800, Musaffah 43,<br />Abu Dhabi, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase text-xs tracking-widest mb-1">Phone</h4>
                    <p className="text-gray-600">+971 2 565 6023</p>
                    <p className="text-gray-600">+971 50 820 6545</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase text-xs tracking-widest mb-1">Email</h4>
                    <p className="text-gray-600 font-medium">info@yasilenergy.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="bg-gray-50 border border-transparent focus:border-amber-500 focus:bg-white px-6 py-4 rounded-2xl outline-none transition" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="bg-gray-50 border border-transparent focus:border-amber-500 focus:bg-white px-6 py-4 rounded-2xl outline-none transition" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inquiry Type</label>
                  <select className="bg-gray-50 border border-transparent focus:border-amber-500 focus:bg-white px-6 py-4 rounded-2xl outline-none transition appearance-none">
                    <option>Oil Field Equipment</option>
                    <option>General Trading</option>
                    <option>Maintenance Solutions</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea rows={5} placeholder="How can we help you?" className="bg-gray-50 border border-transparent focus:border-amber-500 focus:bg-white px-6 py-4 rounded-2xl outline-none transition resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full bg-black hover:bg-gray-800 text-white py-5 rounded-2xl font-bold transition shadow-lg hover:shadow-2xl">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-gray-200 grayscale">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116244.6094391629!2d54.3822!3d24.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc67f9995160a3770!2sMusaffah%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1713100000000!5m2!1sen!2s"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>

      <Footer />
    </main>
  );
}