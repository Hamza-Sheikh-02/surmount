"use client";

import React, { useEffect } from "react";
import { Loader } from "@/components/ui/loader";

const Splash: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white">
      <Loader text="Surmount" />
    </div>
  );
};

export default Splash;
