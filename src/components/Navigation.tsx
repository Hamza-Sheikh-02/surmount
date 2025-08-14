"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const underlineVariants = {
  initial: { width: 0 },
  hover: { width: "100%" },
};

export function Navigation() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 mt-4 right-0 z-50 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 flex justify-between items-center text-white text-sm transition-all duration-300",
          "bg-transparent",
          className
        )}
      >
        {/* Left Menu Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 cursor-pointer group relative"
          onClick={toggleMobileMenu}
        >
          <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="body-font ml-1 sm:ml-2 text-xs hidden sm:inline tracking-widest uppercase">
            MENU
          </span>
          <span className="body-font mt-2 absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-white"
            variants={underlineVariants}
            initial="initial"
            whileHover="hover"
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Center Logo */}
        <Link href="/">
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center select-none">
            <motion.h1
              className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.15em] sm:tracking-[0.25em] uppercase font-light"
              whileHover={{ scale: 1.05 }}
            >
              SURMOUNT
            </motion.h1>
            <p className="body-font text-[8px] sm:text-[10px] tracking-widest text-gray-300 uppercase mt-0.5">
              WATCH COMPANY
            </p>
          </div>
        </Link>

        {/* Right Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 cursor-pointer group relative"
              >
                <span className="body-font text-xs tracking-widest uppercase">
                  ENGLISH
                </span>
                <ChevronDown className="w-3 h-3 ml-1" />
                <span className="body-font mt-2 absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-white"
                  variants={underlineVariants}
                  initial="initial"
                  whileHover="hover"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 backdrop-blur-md text-white border border-gray-700 mt-2">
              <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors text-xs">
                English
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors text-xs">
                French
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors text-xs">
                Spanish
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors text-xs">
                German
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/collections">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer group relative"
            >
              <span className="body-font text-xs tracking-widest uppercase">
                COLLECTIONS
              </span>
              <span className="body-font absolute left-0 bottom-0 mt-2 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-white"
                variants={underlineVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Toggle (visible on medium screens and below) */}
        <div className="lg:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="p-1"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden"
            onClick={toggleMobileMenu}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full space-y-8 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <span className="text-lg tracking-widest uppercase">
                    COLLECTIONS
                  </span>
                </motion.div>

                <div className="pt-4 border-t border-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span className="text-sm tracking-widest uppercase">
                          ENGLISH
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black/90 backdrop-blur-md text-white border border-gray-700">
                      <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">
                        French
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">
                        Spanish
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">
                        German
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
