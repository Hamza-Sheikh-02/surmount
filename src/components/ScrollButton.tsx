"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CircularScrollButtonProps {
  onClick?: () => void;
  isAutoScrollActive?: boolean;
  timeLeft?: number;
  totalTime?: number;
}

function CircularScrollButton({
  onClick,
  isAutoScrollActive = false,
  timeLeft = 8,
  totalTime = 8,
}: CircularScrollButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const accumulatedScrollRef = useRef(0);
  const scrollThreshold = 100;
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);
  const lastSyncTimeRef = useRef<number>(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const animateProgress = () => {
    if (!isAnimatingRef.current || !isAutoScrollActive) {
      return;
    }

    const now = Date.now();
    const elapsed = (now - startTimeRef.current) / 1000; // Convert to seconds
    const targetProgress = Math.min((elapsed / totalTime) * 100, 100);

    setProgress(targetProgress);

    if (targetProgress < 100) {
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    } else {
      // Timer completed
      isAnimatingRef.current = false;
      setProgress(100);
    }
  };

  useEffect(() => {
    if (isAutoScrollActive && timeLeft > 0) {
      if (!isAnimatingRef.current) {
        // Start new animation cycle
        startTimeRef.current = Date.now() - (totalTime - timeLeft) * 1000;
        isAnimatingRef.current = true;
        lastSyncTimeRef.current = Date.now();

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Sync with parent timer - adjust start time to match current timeLeft
        const expectedElapsed = totalTime - timeLeft;
        const actualElapsed = (Date.now() - startTimeRef.current) / 1000;
        const drift = actualElapsed - expectedElapsed;

        // Only sync if drift is significant (more than 0.1 seconds)
        if (Math.abs(drift) > 0.1) {
          startTimeRef.current = Date.now() - expectedElapsed * 1000;
        }
        lastSyncTimeRef.current = Date.now();
      }
    } else if (!isAutoScrollActive) {
      // Stop animation and reset
      isAnimatingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setProgress(0);
    }
  }, [isAutoScrollActive, timeLeft, totalTime]);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        accumulatedScrollRef.current += e.deltaY;
        const scrollProgress = Math.min(
          (accumulatedScrollRef.current / scrollThreshold) * 100,
          100
        );
        targetProgressRef.current = scrollProgress;
        currentProgressRef.current = scrollProgress;
        setProgress(scrollProgress);

        if (accumulatedScrollRef.current >= scrollThreshold) {
          onClick?.();
          accumulatedScrollRef.current = 0;
          targetProgressRef.current = 0;
          currentProgressRef.current = 0;
          setProgress(0);
          return;
        }
      }

      setTimeout(() => {
        if (accumulatedScrollRef.current < scrollThreshold) {
          accumulatedScrollRef.current = 0;
          // Progress will be handled by parent timer
        }
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isActive, onClick]);

  useEffect(() => {
    if (!isActive) {
      accumulatedScrollRef.current = 0;
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      setProgress(0);
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isAnimatingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    accumulatedScrollRef.current = 0;
    targetProgressRef.current = 0;
    currentProgressRef.current = 0;
    setProgress(0);
    onClick?.();
  };

  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.button
      type="button"
      className="relative w-16 h-16 cursor-pointer group"
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
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 3, 0] }}
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
          r="22"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="ease-linear opacity-90 drop-shadow-md filter"
        />
      </svg>
    </motion.button>
  );
}

export default CircularScrollButton;
