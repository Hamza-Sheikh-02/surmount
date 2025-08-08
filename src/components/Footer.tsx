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
    <footer className="bg-black text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Responsive Typography */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            SURMOUNT
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 mt-2">
            WATCH COMPANY
          </p>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Newsletter Section - Full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1 order-1 lg:order-1">
            <h3 className="text-sm sm:text-base font-semibold tracking-wider mb-4 sm:mb-6 uppercase">
              Subscribe to our newsletter
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-gray-600 py-2 sm:py-3 text-sm sm:text-base placeholder-gray-500 focus:border-white focus:outline-none transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 p-1"
                  aria-label="Submit newsletter signup"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>

            <p className="text-xs sm:text-sm body-font text-gray-500 mt-3 sm:mt-4 leading-relaxed">
              By signing up, you agree to our privacy policy and will receive
              updates from Surmount.
            </p>

            {/* Social Media Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm font-medium tracking-wider">
                FOLLOW US
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 sm:w-9 sm:h-9 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 sm:w-9 sm:h-9 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="order-2 lg:order-2">
            <h3 className="text-sm sm:text-base font-semibold tracking-wider mb-4 sm:mb-6 uppercase">
              Quick Links
            </h3>
            <ul className="body-font space-y-2 sm:space-y-3">
              {["Home", "Shop", "Learn More", "Orders"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block py-1"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="order-3 lg:order-3">
            <h3 className="text-sm sm:text-base font-semibold tracking-wider mb-4 sm:mb-6 uppercase">
              Important Links
            </h3>
            <ul className="body-font space-y-2 sm:space-y-3">
              {["Contact", "Accessibility", "Meet our Judges"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block py-1"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="order-4 lg:order-4">
            <h3 className="text-sm sm:text-base font-semibold tracking-wider mb-4 sm:mb-6 uppercase">
              Contact Info
            </h3>
            <div className="body-font space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
              <div>
                <p className="font-medium text-white mb-1 sm:mb-2">Store:</p>
                <p className="leading-relaxed">
                  Please contact Surmount via our{" "}
                  <br className="hidden sm:block" />
                  customer service team below.
                </p>
              </div>
              <div>
                <p className="font-medium text-white mb-1 sm:mb-2">Phone:</p>
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors duration-300"
                >
                  (123) 456 789 00
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Responsive Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-800 pt-6 sm:pt-8 gap-4 sm:gap-0">
          {/* Copyright */}
          <div className="body-font text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
            <p>Copyright © 2025 Surmount Watch Company</p>
          </div>

          {/* Language Selector */}
          <div className="body-font text-xs sm:text-sm text-gray-200 flex gap-3 sm:gap-4 flex-wrap order-1 sm:order-2">
            <button className="hover:text-white transition-colors duration-300 py-1 px-1 font-medium">
              EN
            </button>
            <button className="text-gray-700 hover:text-white transition-colors duration-300 py-1 px-1">
              FR
            </button>
            <button className="text-gray-700 hover:text-white transition-colors duration-300 py-1 px-1">
              ES
            </button>
            <button className="text-gray-700 hover:text-white transition-colors duration-300 py-1 px-1">
              AR
            </button>
            <button className="text-gray-700 hover:text-white transition-colors duration-300 py-1 px-1">
              JA
            </button>
            <button className="text-gray-700 hover:text-white transition-colors duration-300 py-1 px-1">
              CN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
