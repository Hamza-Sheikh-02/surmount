"use client";

import { motion } from "framer-motion";

export default function Section5() {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-5.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pb-8">
        <div className="flex-1"></div>

        <div className="flex justify-between items-end w-full">
          <motion.div
            className="text-white space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.p
              className="uppercase tracking-[0.3em] text-sm text-gray-300 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              SURMOUNT TIMEPIECES
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight font-canela-deck"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              CARE AND
              <br />
              SERVICE
            </motion.h2>
          </motion.div>

          <div className="flex items-end gap-8">
            <motion.button
              className="group relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border border-white/30 text-white text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-white transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                DISCOVER ABOUT THE BRAND
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
