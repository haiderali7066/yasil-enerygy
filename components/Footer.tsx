'use client';

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [openCompanies, setOpenCompanies] = useState(false);

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-[1300px] mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND INFO */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Yasil Energy Group
            </h2>

            <p className="text-green-400 text-sm font-semibold mt-1">
              UAE Multi-Industry Business Group
            </p>

            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              Built on integrity, innovation, and industry expertise, YEGroup
              operates across energy, trading, and maintenance sectors,
              delivering high-performance solutions across the UAE.
            </p>

            <div className="mt-6 text-xs text-white/40 space-y-1">
              <p>📍 Abu Dhabi, UAE</p>
              <p>📧 info@yasilenergy.com</p>
              <p>📞 +971 2 565 6023</p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/80">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link href="/" className="hover:text-green-400 transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>

              <button
                onClick={() => setOpenCompanies(!openCompanies)}
                className="text-left hover:text-green-400 transition"
              >
                Companies ▼
              </button>

              {/* interactive dropdown */}
              {openCompanies && (
                <div className="ml-3 mt-2 flex flex-col gap-2 text-white/60 text-sm border-l border-white/10 pl-4">
                  <Link href="/companies/yasil-energy" className="hover:text-green-400 transition">
                    Yasil Energy
                  </Link>
                  <Link href="/companies/quick-clean" className="hover:text-green-400 transition">
                    Quick Clean
                  </Link>
                  <Link href="/companies/perfect-maintenance" className="hover:text-green-400 transition">
                    Perfect Maintenance
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* COMPANY OVERVIEW */}
          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/80">
              Our Group
            </h3>

            <div className="text-sm text-white/60 space-y-3">
              <p>✔ Energy Solutions</p>
              <p>✔ Oil Field Trading</p>
              <p>✔ General Trading</p>
              <p>✔ Facility Maintenance</p>
              <p>✔ UAE-Based Operations</p>
            </div>

            <div className="mt-5 text-xs text-white/40">
              10+ Years Experience • 3 Specialized Companies • 100+ Clients
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/80">
              Partner With Us
            </h3>

            <p className="text-white/60 text-sm leading-relaxed">
              Whether you need energy solutions, trading services, or maintenance support,
              Yasil Energy Group is your trusted partner.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-6 bg-green-500 hover:bg-green-400 text-black px-5 py-2.5 rounded-full text-sm font-bold transition"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Yasil Energy Group. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/" className="hover:text-green-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-green-400 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-green-400 transition">
              Contact
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}