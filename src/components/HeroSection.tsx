"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Navigation } from "./Navigation";
import { gsap } from "gsap";
import Footer from "./Footer";
import Section1 from "./home/Section1";
import Section2 from "./home/Section2";
import Section3 from "./home/Section3";
import Section4 from "./home/Section4";
import Section5 from "./home/Section5";
import Section6 from "./home/Section6";

const sections = [
  { id: 1, component: Section1 },
  { id: 2, component: Section2 },
  { id: 3, component: Section3 },
  { id: 4, component: Section4 },
  { id: 5, component: Section5 },
  { id: 6, component: Section6 },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    currentIndexRef.current = current;
  }, [current]);

  const startAutoScroll = useCallback(() => {
    setIsAutoScrollActive(true);
    setTimeLeft(8);

    if (timerRef.current) clearInterval(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % sections.length;
      animateToSection(nextIndex, "down");
    }, 8000);
  }, []);

  const stopAutoScroll = useCallback(() => {
    setIsAutoScrollActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setTimeLeft(8);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const animateToSection = useCallback(
    (newIndex: number, direction: "up" | "down" = "down") => {
      if (
        isAnimating ||
        newIndex === currentIndexRef.current ||
        newIndex < 0 ||
        newIndex >= sections.length
      ) {
        return;
      }

      setIsAnimating(true);

      const currentSection = sectionsRef.current[currentIndexRef.current];
      const nextSection = sectionsRef.current[newIndex];

      if (!currentSection || !nextSection) {
        setIsAnimating(false);
        return;
      }

      const slideFromY = direction === "up" ? "-100%" : "100%";
      const slideToY = direction === "up" ? "100%" : "-100%";

      gsap.set(nextSection, {
        y: slideFromY,
        zIndex: 10,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentSection, { zIndex: 5, y: "0%" });
          gsap.set(nextSection, { zIndex: 15, y: "0%" });
          setCurrent(newIndex);
          setIsAnimating(false);
        },
      });

      tl.to(nextSection, {
        y: "0%",
        duration: 1.2,
        ease: "power3.inOut",
      }).to(
        currentSection,
        {
          y: slideToY,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "-=1.2"
      );
    },
    [isAnimating]
  );

  const changeSection = useCallback(
    (newIndex: number, direction: "up" | "down" = "down") => {
      animateToSection(newIndex, direction);
    },
    [animateToSection]
  );

  useEffect(() => {
    let accumulatedScroll = 0;
    const scrollThreshold = 80;
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating || isScrolling) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      accumulatedScroll += e.deltaY;

      scrollTimeout = setTimeout(() => {
        accumulatedScroll = 0;
        isScrolling = false;
      }, 100);

      const progress = Math.abs(accumulatedScroll) / scrollThreshold;

      if (progress >= 1) {
        isScrolling = true;

        if (e.deltaY > 0) {
          if (currentIndexRef.current === sections.length - 1) {
            if (!isFooterVisible) {
              setIsFooterVisible(true);
            }
          } else {
            const nextIndex = currentIndexRef.current + 1;
            changeSection(nextIndex, "down");
          }
        } else {
          if (isFooterVisible) {
            setIsFooterVisible(false);
          } else if (currentIndexRef.current > 0) {
            const prevIndex = currentIndexRef.current - 1;
            changeSection(prevIndex, "up");
          }
        }
        accumulatedScroll = 0;

        setTimeout(() => {
          isScrolling = false;
        }, 1500);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [isAnimating, changeSection, isFooterVisible]);

  useEffect(() => {
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;

      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaY = startY - endY;
      const deltaTime = endTime - startTime;

      if (Math.abs(deltaY) > 50 && deltaTime < 500) {
        if (deltaY > 0) {
          if (currentIndexRef.current === sections.length - 1) {
            if (!isFooterVisible) {
              setIsFooterVisible(true);
            }
          } else {
            const nextIndex = currentIndexRef.current + 1;
            changeSection(nextIndex, "down");
          }
        } else {
          if (isFooterVisible) {
            setIsFooterVisible(false);
          } else if (currentIndexRef.current > 0) {
            const prevIndex = currentIndexRef.current - 1;
            changeSection(prevIndex, "up");
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isAnimating, changeSection, isFooterVisible]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        if (index === 0) {
          gsap.set(section, { y: "0%", zIndex: 15 });
        } else {
          gsap.set(section, { y: "100%", zIndex: 5 });
        }
      }
    });
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Navigation />

        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <div
              key={section.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="absolute inset-0"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              <SectionComponent
                startAutoScroll={index === 0 ? startAutoScroll : undefined}
                stopAutoScroll={index === 0 ? stopAutoScroll : undefined}
                isAutoScrollActive={
                  index === 0 ? isAutoScrollActive : undefined
                }
                timeLeft={index === 0 ? timeLeft : undefined}
              />
            </div>
          );
        })}

        <div className="absolute top-1/2 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 transform -translate-y-1/2 flex flex-col gap-1 sm:gap-[2px] z-40">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== current) {
                  changeSection(index, index > current ? "down" : "up");
                }
              }}
              className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center group"
              aria-label={`Go to section ${index + 1}`}
            >
              {index === current ? (
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-white rounded-full" />
              ) : (
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-transparent border border-white rounded-full group-hover:bg-white transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </section>

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-700 ease-in-out ${
          isFooterVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer onScrollBack={() => setIsFooterVisible(false)} />
      </div>
    </>
  );
}
