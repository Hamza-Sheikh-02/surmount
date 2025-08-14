"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

interface CircularScrollButtonProps {
  onClick: () => void;
  autoScrollDuration?: number;
}

const CircularScrollButton: React.FC<CircularScrollButtonProps> = ({
  onClick,
  autoScrollDuration = 6000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 50; // Update every 50ms
    const increment = (interval / autoScrollDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          setProgress(0); // Reset progress
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoScrollDuration]);

  // Calculate stroke-dashoffset for circular progress
  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={onClick}
      className="relative w-12 h-12 flex items-center justify-center group hover:scale-110 transition-transform duration-300"
    >
      {/* Progress circle */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
      >
        {/* Background circle */}
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-75 ease-out"
        />
      </svg>

      {/* Scroll icon */}
      <div className="relative z-10 animate-bounce">
        <ChevronDownIcon className="w-4 h-4 text-gray-300" />
      </div>
    </button>
  );
};

export default CircularScrollButton;
