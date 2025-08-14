"use client";

import { motion } from "framer-motion";

export default function Section2() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-2.jpg')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center min-h-screen py-20 sm:py-16 lg:py-0">
          {/* Left side - Content */}
          <motion.div
            className="text-white space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm text-amber-400 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              HERITAGE COLLECTION
            </motion.p>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              LEGACY
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md lg:max-w-xl leading-relaxed font-light mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafted with precision and passion, our heritage collection
              represents decades of Swiss watchmaking excellence.
            </motion.p>

            <motion.button
              className="group relative mt-4 sm:mt-6 md:mt-8 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 border border-amber-400/50 text-amber-400 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-amber-400 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                EXPLORE HERITAGE
              </span>
              <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.button>
          </motion.div>

          {/* Right side - Empty space for background image */}
          <div className="relative order-2 lg:order-2 hidden lg:block"></div>
        </div>
      </div>

      <div className="absolute top-1/3 left-4 sm:left-6 md:left-8 w-px h-20 sm:h-32 md:h-40 bg-gradient-to-b from-amber-400/50 to-transparent hidden sm:block"></div>
      <div className="absolute bottom-1/3 right-4 sm:right-6 md:right-8 w-px h-16 sm:h-24 md:h-32 bg-gradient-to-t from-amber-400/30 to-transparent hidden sm:block"></div>
    </section>
  );
}
