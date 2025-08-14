"use client";

import { motion } from "framer-motion";
import CircularScrollButton from "@/components/ScrollButton";

interface Section1Props {
  onScrollNext?: () => void;
}

export default function Section1({ onScrollNext }: Section1Props) {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero/img-1.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center min-h-screen py-20 sm:py-16 lg:py-0">
          <div className="relative order-2 lg:order-1 hidden lg:block"></div>

          <motion.div
            className="text-white space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm text-gray-400 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              NEW MODEL
            </motion.p>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              VINCITORE
            </motion.h1>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md lg:max-w-lg leading-relaxed font-light mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <button className="group relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border border-white/30 text-white text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-white transition-all duration-500 overflow-hidden">
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  QUICK VIEW
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>

              <CircularScrollButton onClick={onScrollNext || (() => {})} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 right-4 sm:right-6 md:right-8 lg:right-10 w-0.5 sm:w-1 h-16 sm:h-24 md:h-32 bg-gradient-to-b from-amber-500/50 to-transparent hidden sm:block"></div>
      <div className="absolute bottom-1/4 left-4 sm:left-6 md:left-8 lg:left-10 w-0.5 sm:w-1 h-12 sm:h-20 md:h-24 bg-gradient-to-t from-amber-500/30 to-transparent hidden sm:block"></div>

      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="w-5 sm:w-6 md:w-8 h-8 sm:h-10 md:h-12 border border-white/30 rounded-full flex items-end justify-center pb-1 sm:pb-1.5 md:pb-2 cursor-pointer hover:border-white/60 transition-colors duration-300">
          <motion.div
            className="w-0.5 sm:w-1 h-1.5 sm:h-2 md:h-3 bg-white/60 rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
