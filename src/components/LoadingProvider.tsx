"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "@/components/ui/loader";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Shorter duration for route transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <Loader text="SURMOUNT" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
