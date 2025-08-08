"use client";

import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, ArrowRight, ChevronUp } from "lucide-react";

interface FooterProps {
  onScrollBack?: () => void;
}

export default function Footer({ onScrollBack }: FooterProps) {
  const [email, setEmail] = useState("");
  const footerRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  // Handle scroll events within the footer
  useEffect(() => {
    if (!onScrollBack) return;

    let accumulatedScroll = 0;
    const scrollThreshold = 50; // Lower threshold for more responsive footer scrolling
    let scrollTimeout: NodeJS.Timeout;

    const handleFooterScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      accumulatedScroll += e.deltaY;

      // Reset accumulated scroll after a delay
      scrollTimeout = setTimeout(() => {
        accumulatedScroll = 0;
      }, 150);

      const progress = Math.abs(accumulatedScroll) / scrollThreshold;

      // Only trigger on scroll up (negative deltaY)
      if (progress >= 1 && e.deltaY < 0) {
        onScrollBack();
        accumulatedScroll = 0;
      }
    };

    // Handle touch events for mobile
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaY = startY - endY;
      const deltaTime = endTime - startTime;

      // Swipe down (negative deltaY means swipe down)
      if (deltaY < -50 && deltaTime < 500) {
        onScrollBack();
      }
    };

    const footer = footerRef.current;
    if (footer) {
      // Add event listeners
      footer.addEventListener("wheel", handleFooterScroll, { passive: false });
      footer.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      footer.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        // Cleanup event listeners
        footer.removeEventListener("wheel", handleFooterScroll);
        footer.removeEventListener("touchstart", handleTouchStart);
        footer.removeEventListener("touchend", handleTouchEnd);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [onScrollBack]);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white relative cursor-pointer select-none"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* Scroll Back Button */}
      {onScrollBack && (
        <button
          onClick={onScrollBack}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Back to slides"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Scroll Indicator */}
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-10 opacity-80">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center animate-pulse">
            <ChevronUp className="w-4 h-4 text-white/80" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">
              Scroll
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">
              Up
            </span>
          </div>
        </div>
      </div>

      {/* Large SURMOUNT Logo Header */}
      <div className="w-full py-8 sm:py-12 lg:py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold leading-none tracking-tight text-center">
            SURMOUNT
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 text-center mt-2 sm:mt-4">
            WATCH COMPANY
          </p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
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
                <p className="font-medium text-white mb-1 sm:mb-2">Call:</p>
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

      <style jsx>{`
        footer::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </footer>
  );
}
