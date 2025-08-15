"use client";

import { motion } from "framer-motion";

export default function Section5() {
  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/collections/img-5.jpg')",
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
              Our Watches Last For Generations
            </motion.h2>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md lg:max-w-xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <br />
              Our watches will last for generations and run true while digital
              watches are phased out. When you own a Surmont, you own a piece of
              history.
            </motion.p>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md lg:max-w-xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Being a watchmaker means being constantly in conversation with
              both history and the changing fashion landscape. We are pioneers
              carving out a new path amidst this constantly shifting world. Our
              watches strive to at once connect you with history while giving
              you an accessory that you can show off to friends, colleagues.
            </motion.p>
          </motion.div>

          <div className="relative order-2 lg:order-2 hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
