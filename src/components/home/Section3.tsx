"use client";

import { motion } from "framer-motion";

export default function Section3() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-3.jpg')",
        backgroundSize: "cover", // Updated to cover like other sections
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center", // Centered background position
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center lg:justify-start"></div>

          <motion.div
            className="text-white space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 50 }} // Changed from x: -50 to x: 50 for right-side animation
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              NEW MODEL
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              CLAVIEROS
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </motion.p>

            {/* Reduced margin and added circular scroll button */}
            <div className="flex flex-col items-center lg:items-start gap-3 pt-1 sm:pt-2">
              <motion.button
                className="group relative px-6 sm:px-8 py-2.5 sm:py-3 border border-white text-white text-xs sm:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden hover:bg-white hover:text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  QUICK VIEW
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.button>

              <motion.div
                className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:border-white/60 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </motion.svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
