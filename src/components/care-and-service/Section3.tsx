"use client";

import { motion } from "framer-motion";

export default function Section3() {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/care-and-service/img-3.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
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
              Caring for Your Surmount
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-none uppercase tracking-tight font-canela-deck"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Surmount Care
            </motion.h2>
          </motion.div>

          <div className="flex items-end gap-8">
            <motion.p
              className="relative z-10 mr-10 transition-colors duration-500 text-md leading-relaxed max-w-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              At Surmount, we ensure your timepiece performs flawlessly
              throughout your lifetime. With just a touch of expert care, your
              Surmount remains as exceptional as the day you acquired it.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
