"use client";

import { motion } from "framer-motion";

export default function Section3() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-3.jpg')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="text-white space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm text-blue-400 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PRECISION ENGINEERING
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              CHRONOS
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Every component meticulously engineered to perfection. Experience
              the harmony of form and function in our most technical collection.
            </motion.p>

            <motion.button
              className="group relative mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 border border-blue-400/50 text-blue-400 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] hover:border-blue-400 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                DISCOVER PRECISION
              </span>
              <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.button>
          </motion.div>

          <div className="relative flex justify-center lg:justify-end">
            {/* This space is now filled by the background image */}
          </div>
        </div>
      </div>
    </section>
  );
}
