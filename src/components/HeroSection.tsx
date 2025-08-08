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

const DURATION = 5_000;

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
  }, []);

  const startCircleAnimation = useCallback(() => {
    if (!circleRef.current) return;

    const radius = 14;
    const circumference = 2 * Math.PI * radius;

    if (circleTimelineRef.current) {
      circleTimelineRef.current.kill();
    }

    gsap.set(circleRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    circleTimelineRef.current = gsap.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: DURATION / 1000,
      ease: "none",
      onComplete: () => {
        if (isAutoPlayActiveRef.current && slides.length > 0) {
          const nextIndex = (current + 1) % slides.length;
          changeSlide(nextIndex);
        }
      },
    });
  }, [slides.length, current]);

  const startAutoPlay = useCallback(() => {
    if (!isAutoPlayActiveRef.current || !imagesLoaded) return;

    clearAllTimers();
    startCircleAnimation();
  }, [clearAllTimers, startCircleAnimation, imagesLoaded]);

  const animateToSlide = useCallback(
    (newIndex: number) => {
      if (
        isAnimating ||
        newIndex === current ||
        slides.length === 0 ||
        !imagesLoaded
      ) {
        return;
      }

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

      gsap.set(inactiveSlide, {
        y: "0%",
        zIndex: 5,
      });

      inactiveSlide.style.backgroundImage = `url(${newSlide.image})`;

      gsap.set([inactiveTitle, inactiveSubtitle], { opacity: 0, y: 30 });

      if (inactiveTitle) {
        inactiveTitle.textContent = newSlide.title;
      }

      mainTimelineRef.current = gsap.timeline({
        onComplete: () => {
          if (activeSlide && inactiveSlide) {
            gsap.set(activeSlide, { zIndex: 5, y: "0%" });
            gsap.set(inactiveSlide, { zIndex: 10 });
            gsap.set([activeTitle, activeSubtitle], { opacity: 1, y: 0 });
          }

          setCurrent(newIndex);
          setIsAnimating(false);

          setTimeout(() => {
            isAutoPlayActiveRef.current = true;
            startAutoPlay();
          }, 100);
        },
      });

      mainTimelineRef.current
        .to([activeTitle, activeSubtitle], {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          activeSlide,
          {
            y: "-100%",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.1"
        )
        .to(
          [inactiveSubtitle, inactiveTitle],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
    },
    [current, isAnimating, slides, clearAllTimers, startAutoPlay, imagesLoaded]
  );

  const changeSlide = useCallback(
    (newIndex: number) => {
      animateToSlide(newIndex);
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

    if (slides[0]) {
      slide1Ref.current.style.backgroundImage = `url(${slides[0].image})`;
    }
    if (slides[1]) {
      slide2Ref.current.style.backgroundImage = `url(${slides[1].image})`;
    }

    gsap.set(slide1Ref.current, { y: "100%", zIndex: 10 });
    gsap.set(slide2Ref.current, { y: "0%", zIndex: 5 });
    gsap.set([title1Ref.current, subtitle1Ref.current], { opacity: 0, y: 30 });
    gsap.set([title2Ref.current, subtitle2Ref.current], { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          isAutoPlayActiveRef.current = true;
          startAutoPlay();
        }, 500);
      },
    });

    tl.to(slide1Ref.current, {
      y: "0%",
      duration: 1,
      ease: "power3.out",
    }).to(
      [subtitle1Ref.current, title1Ref.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5"
    );
  }, [slides, imagesLoaded, startAutoPlay]);

  const handleUserInteraction = useCallback(() => {
    isAutoPlayActiveRef.current = false;
    clearAllTimers();

    setTimeout(() => {
      if (!isAnimating) {
        isAutoPlayActiveRef.current = true;
        startAutoPlay();
      }
    }, 5000);
  }, [isAnimating, clearAllTimers, startAutoPlay]);

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

  useEffect(() => {
    if (slides.length === 0 || !imagesLoaded) return;

    let accumulatedScroll = 0;
    const scrollThreshold = 100;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;

      accumulatedScroll += e.deltaY;
      const progress = Math.abs(accumulatedScroll) / scrollThreshold;

      if (progress >= 1) {
        if (e.deltaY > 0) {
          const nextIndex = (current + 1) % slides.length;
          changeSlide(nextIndex);
        } else {
          const prevIndex = (current - 1 + slides.length) % slides.length;
          changeSlide(prevIndex);
        }
        accumulatedScroll = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [slides.length, current, isAnimating, changeSlide, imagesLoaded]);

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
        <div className="text-white text-xl">Loading...</div>
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

        <div
          ref={slide1Ref}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat text-white flex flex-col justify-end p-10"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <span
            ref={subtitle1Ref}
            className="text-xs tracking-widest uppercase"
            style={{ willChange: "transform, opacity" }}
          >
            Surmount Timepieces
          </span>
          <h1
            ref={title1Ref}
            className="text-3xl md:text-5xl mt-2 relative group inline-block uppercase w-fit"
            style={{ willChange: "transform, opacity" }}
          >
            {currentSlide.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
          </h1>
        </div>

        <div
          ref={slide2Ref}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat text-white flex flex-col justify-end p-10"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <span
            ref={subtitle2Ref}
            className="text-xs tracking-widest uppercase"
            style={{ willChange: "transform, opacity" }}
          >
            Surmount Timepieces
          </span>
          <h1
            ref={title2Ref}
            className="text-3xl md:text-5xl mt-2 relative group inline-block uppercase w-fit"
            style={{ willChange: "transform, opacity" }}
          >
            {nextSlide.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
          </h1>
        </div>

        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col gap-[2px] z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                handleUserInteraction();
                if (!isAnimating && index !== current) {
                  changeSlide(index);
                }
              }}
              className="relative w-8 h-8 flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === current ? (
                <svg className="w-8 h-8 rotate-[-90deg]" viewBox="0 0 32 32">
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
                <div className="w-2.5 h-2.5 bg-transparent border border-white rounded-full hover:bg-white transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 z-40">
          <button
            onClick={handleUserInteraction}
            className="body-font mb-4 px-5 py-2 rounded-full border-2 border-white text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
          >
            {currentSlide.buttonText}
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
