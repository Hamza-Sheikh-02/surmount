import React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 py-4 flex justify-between items-center text-white text-sm transition-all duration-300",
        "bg-transparent",
        className
      )}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-2 cursor-pointer group relative"
      >
        <MenuIcon className="w-5 h-5" />
        <span className="body-font ml-2 text-xs hidden sm:inline tracking-widest uppercase">
          MENU
        </span>
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white"
          variants={underlineVariants}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="absolute left-1/2 transform -translate-x-1/2 text-center select-none">
        <motion.h1
          className="text-lg tracking-[0.25em] uppercase"
          whileHover={{ scale: 1.05 }}
        >
          SURMOUNT
        </motion.h1>
        <p className="body-font text-[10px] tracking-widest text-gray-300 uppercase">
          WATCH COMPANY
        </p>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer group relative"
            >
              <span className="body-font ml-2 text-xs hidden sm:inline tracking-widest uppercase">
                ENGLISH
              </span>
              <span className="body-font absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
              <ChevronDown className="w-4 h-4 ml-2" />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-white"
                variants={underlineVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border border-gray-700 mt-2">
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

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer group relative"
        >
          <span className="body-font ml-2 text-xs hidden sm:inline tracking-widest uppercase">
            COLLECTIONS
          </span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-white"
            variants={underlineVariants}
            initial="initial"
            whileHover="hover"
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </header>
  );
}
