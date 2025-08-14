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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              CARE AND
              <br />
              SERVICE
            </motion.h2>
          </motion.div>

          <motion.div
            className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:border-white/60 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
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

          <motion.button
            className="group relative px-6 py-3 border border-white/40 text-white text-xs font-medium uppercase tracking-[0.2em] hover:border-white transition-all duration-500 overflow-hidden"
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
    </section>
  );
}
