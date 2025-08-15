"use client";

import { motion } from "framer-motion";

export default function Section4() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/collections/img-4.jpg')",
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
              Smart Materials.
              <br />
              Smarter Futures.
            </motion.h2>

            <motion.p
              className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm lg:max-w-md leading-relaxed font-light mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <strong>Pioneering Materials and Engineering Excellence</strong>
              <br />
              <br />
              From the beginning, Surmount has embraced advanced engineering
              principles and breakthrough materials traditionally seen in
              cutting-edge industries like motorsport and aerospace. Our mission
              has always been to craft timepieces that deliver exceptional
              performance without compromise or unnecessary embellishment.
              <br />
              <br />
              Through our commitment to innovation, Surmount has introduced
              numerous industry-firsts in the integration and design of
              high-tech materials, redefining the boundaries of modern
              watchmaking and pushing the limits of what’s possible in horology.
              integration and design of high-tech materials, redefining the
              boundaries of modern watchmaking and pushing the limits of what’s
              possible in horology.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
