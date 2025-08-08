"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Navigation } from "./Navigation";
import { gsap } from "gsap";
import Footer from "./Footer";

interface HeroSlide {
  id: number;
  title: string;
  image: string;
  buttonText: string;
}

const DURATION = 8_000;

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const subtitle1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitle2Ref = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const circleTimelineRef = useRef<gsap.core.Tween | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoPlayActiveRef = useRef(true);
  const currentIndexRef = useRef(0);
  const isTimerRunningRef = useRef(false);

  // Update current index ref when current changes
  useEffect(() => {
    currentIndexRef.current = current;
  }, [current]);

  const fetchSlides = useCallback(() => {
    fetch("/data/hero.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch(() => {
        setSlides([
          {
            id: 1,
            title: "Luxury Timepieces",
            image:
              "/placeholder.svg?height=1080&width=1920&text=Luxury+Timepieces",
            buttonText: "Explore Collection",
          },
          {
            id: 2,
            title: "Swiss Craftsmanship",
            image:
              "/placeholder.svg?height=1080&width=1920&text=Swiss+Craftsmanship",
            buttonText: "Discover Heritage",
          },
          {
            id: 3,
            title: "Timeless Elegance",
            image:
              "/placeholder.svg?height=1080&width=1920&text=Timeless+Elegance",
            buttonText: "View Details",
          },
        ]);
      });
  }, []);

  const preloadImages = useCallback((slidesToLoad: HeroSlide[]) => {
    if (slidesToLoad.length === 0) return;

    const imagePromises = slidesToLoad.map((slide) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = slide.image;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const clearAllTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (circleTimelineRef.current) {
      circleTimelineRef.current.kill();
      circleTimelineRef.current = null;
    }
    isTimerRunningRef.current = false;
  }, []);

  const animateToSlide = useCallback(
    (newIndex: number, direction: "up" | "down" = "down") => {
      if (
        isAnimating ||
        newIndex === currentIndexRef.current ||
        slides.length === 0 ||
        !imagesLoaded
      ) {
        return;
      }

      console.log(`Animating to slide ${newIndex} in direction ${direction}`);

      setIsAnimating(true);
      isAutoPlayActiveRef.current = false;
      clearAllTimers();

      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }

      const isSlide1Active = slide1Ref.current?.style.zIndex === "10";
      const activeSlide = isSlide1Active
        ? slide1Ref.current
        : slide2Ref.current;
      const inactiveSlide = isSlide1Active
        ? slide2Ref.current
        : slide1Ref.current;
      const activeTitle = isSlide1Active
        ? title1Ref.current
        : title2Ref.current;
      const activeSubtitle = isSlide1Active
        ? subtitle1Ref.current
        : subtitle2Ref.current;
      const inactiveTitle = isSlide1Active
        ? title2Ref.current
        : title1Ref.current;
      const inactiveSubtitle = isSlide1Active
        ? subtitle2Ref.current
        : subtitle1Ref.current;

      if (!activeSlide || !inactiveSlide) {
        setIsAnimating(false);
        return;
      }

      const newSlide = slides[newIndex];
      if (!newSlide) {
        setIsAnimating(false);
        return;
      }

      // Set animation direction based on scroll direction
      const slideFromY = direction === "up" ? "-100%" : "100%";
      const slideToY = direction === "up" ? "100%" : "-100%";
      const textFromY = direction === "up" ? -50 : 50;

      // Prepare inactive slide
      gsap.set(inactiveSlide, {
        y: slideFromY,
        zIndex: 5,
      });

      inactiveSlide.style.backgroundImage = `url(${newSlide.image})`;
      gsap.set([inactiveTitle, inactiveSubtitle], { opacity: 0, y: textFromY });

      if (inactiveTitle) {
        inactiveTitle.textContent = newSlide.title;
      }

      // Create smooth animation timeline
      mainTimelineRef.current = gsap.timeline({
        onComplete: () => {
          if (activeSlide && inactiveSlide) {
            gsap.set(activeSlide, { zIndex: 5, y: "0%" });
            gsap.set(inactiveSlide, { zIndex: 10, y: "0%" });
            gsap.set([activeTitle, activeSubtitle], { opacity: 1, y: 0 });
          }

          setCurrent(newIndex);
          setIsAnimating(false);

          console.log(
            `Animation complete, starting autoplay for slide ${newIndex}`
          );

          // Restart autoplay after animation completes
          setTimeout(() => {
            isAutoPlayActiveRef.current = true;
            startAutoPlay();
          }, 500);
        },
      });

      // Animate text out
      mainTimelineRef.current.to([activeTitle, activeSubtitle], {
        opacity: 0,
        y: direction === "up" ? 30 : -30,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.05,
      });

      // Animate slides
      mainTimelineRef.current.to(
        inactiveSlide,
        {
          y: "0%",
          duration: 1.2,
          ease: "power3.inOut",
        },
        "-=0.2"
      );

      mainTimelineRef.current.to(
        activeSlide,
        {
          y: slideToY,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "-=1.2"
      );

      // Animate text in
      mainTimelineRef.current.to(
        [inactiveSubtitle, inactiveTitle],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    [slides, clearAllTimers, imagesLoaded, isAnimating]
  );

  const startCircleAnimation = useCallback(() => {
    if (
      !circleRef.current ||
      !isAutoPlayActiveRef.current ||
      isTimerRunningRef.current
    ) {
      return;
    }

    console.log(
      `Starting circle animation for slide ${currentIndexRef.current}`
    );

    const radius = 14;
    const circumference = 2 * Math.PI * radius;

    // Clear existing animation
    if (circleTimelineRef.current) {
      circleTimelineRef.current.kill();
    }

    // Reset circle
    gsap.set(circleRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    isTimerRunningRef.current = true;

    // Start new animation
    circleTimelineRef.current = gsap.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: DURATION / 1000,
      ease: "none",
      onComplete: () => {
        console.log(
          `Circle animation complete for slide ${currentIndexRef.current}`
        );
        isTimerRunningRef.current = false;

        if (isAutoPlayActiveRef.current && slides.length > 0 && !isAnimating) {
          const nextIndex = (currentIndexRef.current + 1) % slides.length;
          console.log(`Auto-advancing to slide ${nextIndex}`);
          animateToSlide(nextIndex, "down");
        }
      },
    });
  }, [slides.length, animateToSlide, isAnimating]);

  const startAutoPlay = useCallback(() => {
    if (
      !isAutoPlayActiveRef.current ||
      !imagesLoaded ||
      slides.length === 0 ||
      isTimerRunningRef.current
    ) {
      return;
    }

    console.log(`Starting autoplay for slide ${currentIndexRef.current}`);
    clearAllTimers();

    // Small delay before starting circle animation
    setTimeout(() => {
      if (isAutoPlayActiveRef.current && !isTimerRunningRef.current) {
        startCircleAnimation();
      }
    }, 100);
  }, [clearAllTimers, startCircleAnimation, imagesLoaded, slides.length]);

  const changeSlide = useCallback(
    (newIndex: number, direction: "up" | "down" = "down") => {
      animateToSlide(newIndex, direction);
    },
    [animateToSlide]
  );

  const initializeSlides = useCallback(() => {
    if (
      !slide1Ref.current ||
      !slide2Ref.current ||
      slides.length === 0 ||
      !imagesLoaded
    )
      return;

    console.log("Initializing slides");

    // Set initial background images
    if (slides[0]) {
      slide1Ref.current.style.backgroundImage = `url(${slides[0].image})`;
    }
    if (slides[1]) {
      slide2Ref.current.style.backgroundImage = `url(${slides[1].image})`;
    }

    // Initial positioning
    gsap.set(slide1Ref.current, { y: "100%", zIndex: 10 });
    gsap.set(slide2Ref.current, { y: "0%", zIndex: 5 });
    gsap.set([title1Ref.current, subtitle1Ref.current], { opacity: 0, y: 50 });
    gsap.set([title2Ref.current, subtitle2Ref.current], { opacity: 1, y: 0 });

    // Initial entrance animation
    const tl = gsap.timeline({
      onComplete: () => {
        console.log("Initial animation complete, starting autoplay");
        setTimeout(() => {
          isAutoPlayActiveRef.current = true;
          startAutoPlay();
        }, 1000);
      },
    });

    tl.to(slide1Ref.current, {
      y: "0%",
      duration: 1.5,
      ease: "power3.out",
    }).to(
      [subtitle1Ref.current, title1Ref.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.8"
    );
  }, [slides, imagesLoaded, startAutoPlay]);

  const handleUserInteraction = useCallback(() => {
    console.log("User interaction detected, pausing autoplay");
    isAutoPlayActiveRef.current = false;
    clearAllTimers();

    // Resume autoplay after user interaction
    setTimeout(() => {
      if (!isAnimating) {
        console.log("Resuming autoplay after user interaction");
        isAutoPlayActiveRef.current = true;
        startAutoPlay();
      }
    }, 8000);
  }, [isAnimating, clearAllTimers, startAutoPlay]);

  // Initialize slides
  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  useEffect(() => {
    if (slides.length > 0) {
      preloadImages(slides);
    }
  }, [slides, preloadImages]);

  useEffect(() => {
    if (slides.length > 0 && imagesLoaded && !isInitialized) {
      initializeSlides();
      setIsInitialized(true);
    }
  }, [slides.length, imagesLoaded, isInitialized, initializeSlides]);

  // Enhanced scroll handling with proper direction
  useEffect(() => {
    if (slides.length === 0 || !imagesLoaded) return;

    let accumulatedScroll = 0;
    const scrollThreshold = 150;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating) return;

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      accumulatedScroll += e.deltaY;

      // Reset accumulated scroll after a delay
      scrollTimeout = setTimeout(() => {
        accumulatedScroll = 0;
      }, 150);

      const progress = Math.abs(accumulatedScroll) / scrollThreshold;

      if (progress >= 1) {
        handleUserInteraction(); // Stop autoplay temporarily

        if (e.deltaY > 0) {
          // Scroll down - next slide (slide comes from bottom)
          const nextIndex = (currentIndexRef.current + 1) % slides.length;
          changeSlide(nextIndex, "down");
        } else {
          // Scroll up - previous slide (slide comes from top)
          const prevIndex =
            (currentIndexRef.current - 1 + slides.length) % slides.length;
          changeSlide(prevIndex, "up");
        }
        accumulatedScroll = 0;
      }
    };

    // Add wheel event listener to the container
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
  }, [
    slides.length,
    isAnimating,
    changeSlide,
    imagesLoaded,
    handleUserInteraction,
  ]);

  // Touch/swipe support for mobile
  useEffect(() => {
    if (slides.length === 0 || !imagesLoaded) return;

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

      // Minimum swipe distance and maximum time
      if (Math.abs(deltaY) > 50 && deltaTime < 500) {
        handleUserInteraction();

        if (deltaY > 0) {
          // Swipe up - next slide
          const nextIndex = (currentIndexRef.current + 1) % slides.length;
          changeSlide(nextIndex, "down");
        } else {
          // Swipe down - previous slide
          const prevIndex =
            (currentIndexRef.current - 1 + slides.length) % slides.length;
          changeSlide(prevIndex, "up");
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
  }, [
    slides.length,
    isAnimating,
    changeSlide,
    imagesLoaded,
    handleUserInteraction,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isAutoPlayActiveRef.current = false;
      clearAllTimers();
      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }
    };
  }, [clearAllTimers]);

  if (slides.length === 0 || !imagesLoaded) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-lg sm:text-xl animate-pulse">
          Loading...
        </div>
      </section>
    );
  }

  const currentSlide = slides[current];
  const nextSlide = slides[(current + 1) % slides.length];

  if (!currentSlide || !nextSlide) return null;

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <Navigation />

        {/* Slide 1 */}
        <div
          ref={slide1Ref}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat text-white flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <span
            ref={subtitle1Ref}
            className="text-xs sm:text-sm tracking-widest uppercase mb-1 sm:mb-2"
            style={{ willChange: "transform, opacity" }}
          >
            Surmount Timepieces
          </span>
          <h1
            ref={title1Ref}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-2 relative group inline-block uppercase w-fit font-light leading-tight"
            style={{ willChange: "transform, opacity" }}
          >
            {currentSlide.title}
            <span className="absolute left-0 bottom-0 w-0 h-[1px] sm:h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
          </h1>
        </div>

        {/* Slide 2 */}
        <div
          ref={slide2Ref}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat text-white flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <span
            ref={subtitle2Ref}
            className="text-xs sm:text-sm tracking-widest uppercase mb-1 sm:mb-2"
            style={{ willChange: "transform, opacity" }}
          >
            Surmount Timepieces
          </span>
          <h1
            ref={title2Ref}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-2 relative group inline-block uppercase w-fit font-light leading-tight"
            style={{ willChange: "transform, opacity" }}
          >
            {nextSlide.title}
            <span className="absolute left-0 bottom-0 w-0 h-[1px] sm:h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
          </h1>
        </div>

        {/* Navigation dots */}
        <div className="absolute top-1/2 right-3 sm:right-4 md:right-6 lg:right-8 transform -translate-y-1/2 flex flex-col gap-[2px] z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                handleUserInteraction();
                if (!isAnimating && index !== current) {
                  changeSlide(index, "down");
                }
              }}
              className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center group"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === current ? (
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rotate-[-90deg]"
                  viewBox="0 0 32 32"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="white"
                    strokeOpacity={0.2}
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    ref={circleRef}
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-transparent border border-white rounded-full group-hover:bg-white transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-6 lg:right-6 z-40">
          <button
            onClick={handleUserInteraction}
            className="body-font px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 text-xs sm:text-sm rounded-full border-2 border-white text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="hidden sm:inline">{currentSlide.buttonText}</span>
            <span className="sm:hidden">Explore</span>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
