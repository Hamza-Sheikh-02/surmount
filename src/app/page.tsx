"use client";

import type React from "react";
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Loader } from "@/components/ui/loader";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading && <Loader text="SURMOUNT" />}
      {!isLoading && <HeroSection />}
    </div>
  );
};

export default Home;
