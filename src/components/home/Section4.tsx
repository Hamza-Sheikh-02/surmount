"use client";

import { motion } from "framer-motion";

export default function Section4() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-4.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          <motion.div
            className="text-white space-y-6 sm:space-y-8 order-1 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              NEW MODEL
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight font-canela-deck"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              RISPOTA
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Lorem ipsum dolor sit amet consectetur.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <button className="group relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border border-white/30 text-white text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-white transition-all duration-500 overflow-hidden">
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  QUICK VIEW
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </motion.div>
          </motion.div>

          <div className="relative order-2 lg:order-2 hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
