"use client";

import { motion } from "framer-motion";

export default function Section4() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-4.jpg')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            className="text-white space-y-6 sm:space-y-8 order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm text-emerald-400 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ARTISAN CRAFTED
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              MAESTRO
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hand-finished by master craftsmen, each piece tells a story of
              dedication, skill, and timeless artistry.
            </motion.p>

            <motion.button
              className="group relative mt-8 sm:mt-12 px-8 sm:px-10 py-3 sm:py-4 border border-emerald-400/50 text-emerald-400 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] hover:border-emerald-400 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                MEET ARTISANS
              </span>
              <div className="absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.button>
          </motion.div>

          {/* Right side - Empty space for background image */}
          <div className="relative order-2 lg:order-2">
            {/* This space is now filled by the background image */}
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-8 sm:left-12 w-px h-36 sm:h-48 bg-gradient-to-b from-emerald-400/50 to-transparent hidden md:block"></div>
      <div className="absolute bottom-1/4 right-8 sm:right-12 w-px h-28 sm:h-36 bg-gradient-to-t from-emerald-400/30 to-transparent hidden md:block"></div>
    </section>
  );
}
