"use client";

import { useState } from "react";
import { Facebook, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-8xl md:text-7xl font-bold">SURMOUNT</h1>
          <p className="text-xs tracking-[0.3em] text-gray-400 mt-2">
            WATCH COMPANY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-wider mb-6 uppercase">
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-gray-600 py-2 text-sm placeholder-gray-500 focus:border-white focus:outline-none transition"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
            <p className="text-xs body-font text-gray-500 mt-4 leading-relaxed">
              By signing up, you agree to our privacy policy and will receive
              updates from Surmount.
            </p>

            <div className="flex gap-4 mt-4">
              <p className="mt-1.5">FOLLOW US</p>
              <a
                href="#"
                className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-6 uppercase">
              Quick Links
            </h3>
            <ul className="body-font space-y-3">
              {["Home", "Shop", "Learn More", "Orders"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-white transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-6 uppercase">
              Important Links
            </h3>
            <ul className="body-font space-y-3">
              {["Contact", "Accessibility", "Meet our Judges"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-white transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-6 uppercase">
              Contact Info
            </h3>
            <div className="body-font space-y-4 text-sm text-gray-300">
              <div>
                <p className="font-medium text-white mb-1">Store:</p>
                <p>
                  Please contact Surmount via our <br />
                  customer service team below.
                </p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Phone:</p>
                <p>(123) 456 789 00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start border-t border-gray-800 pt-8">
          <div className="body-font text-xs text-gray-500 mb-6 md:mb-0">
            <p>Copyright © 2025 Surmount Watch Company</p>
          </div>

          <div className="body-font text-xs text-gray-200 flex gap-4 flex-wrap">
            <p className="hover:text-white transition">EN</p>
            <p className="text-gray-700 hover:text-white transition">FR</p>
            <p className="text-gray-700 hover:text-white transition">ES</p>
            <p className="text-gray-700 hover:text-white transition">AR</p>
            <p className="text-gray-700 hover:text-white transition">JA</p>
            <p className="text-gray-700 hover:text-white transition">CN</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
