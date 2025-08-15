"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CircularScrollButtonProps {
  onClick?: () => void;
}

function CircularScrollButton({ onClick }: CircularScrollButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const onClickRef = useRef(onClick);

  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 80;
        if (newProgress >= 100) {
          setTimeout(() => {
            if (onClickRef.current) {
              onClickRef.current();
            }
          }, 0);
          return 0; // Reset to 0 to continue the cycle
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleClick = () => {
    setProgress(0);
    onClick?.();
  };

  const circumference = 2 * Math.PI * 22; // decreased radius for smaller button
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="relative w-16 h-16 cursor-pointer group" // decreased size
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
    >
      <div className="absolute inset-0 border-2 border-white/60 rounded-full flex items-center justify-center group-hover:border-white/90 group-hover:bg-white/15 transition-all duration-300 backdrop-blur-md shadow-lg">
        <motion.svg
          width="18" // decreased icon size
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 3, 0] }} // decreased animation range
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="drop-shadow-md filter"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </motion.svg>
      </div>

      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="22" // updated radius to match circumference calculation
          fill="none"
          stroke="white"
          strokeWidth="3" // slightly decreased stroke width
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-linear opacity-90 drop-shadow-md filter"
        />
      </svg>
    </motion.div>
  );
}

export default CircularScrollButton;
