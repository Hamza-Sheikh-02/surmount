"use client";

import { motion } from "framer-motion";

export default function Section2() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/collections/img-2.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 ml-8 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center min-h-screen py-20 sm:py-16 lg:py-0">
          <motion.div
            className="text-white space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white leading-[0.9] tracking-tight font-canela-deck"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              A NEW ERA IN WATCHMAKING
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md lg:max-w-xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Surmont Watch Company is proud to be changing how we see the work
              of the watchmaker.
            </motion.p>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md lg:max-w-xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              As a watch manufacturer, we take pride in our craft. Watchmaking
              is a timeless art that reaches back for hundreds of years.
              Fascination with the complex moving machinery inside each of our
              watches pays homage to the pioneering craftsman that came before
              us. Our watches are ready to take this craft into a new era.
            </motion.p>
          </motion.div>

          <div className="relative order-2 lg:order-2 hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
