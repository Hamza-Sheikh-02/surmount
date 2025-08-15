"use client";

import { motion } from "framer-motion";

export default function Section4() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/care-and-service/img-2.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 mr-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center min-h-screen py-20 sm:py-16 lg:py-0">
          <div className="relative order-2 lg:order-1 hidden lg:block"></div>

          <motion.div
            className="text-white space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[0.9] tracking-tight font-canela-deck"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Legacy in Motion
            </motion.h2>

            <motion.p
              className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm lg:max-w-md leading-relaxed font-light mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <br />
              From the very beginning, Surmount established a global network of
              master watchmakers dedicated to providing unparalleled servicing —
              ensuring every watch preserves its impeccable performance and
              flawless beauty.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
