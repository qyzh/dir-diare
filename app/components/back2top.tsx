"use client";
import React, { useState, useEffect, useCallback } from "react";

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export default function BackToTop({ 
  threshold = 20,
  className = ""
}: BackToTopProps): JSX.Element | null {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setShowButton(scrollTop > threshold);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  useEffect(() => {
    // Throttle scroll event for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null as unknown as NodeJS.Timeout;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  if (!showButton) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed z-30 bottom-[82px] md:bottom-[22px] right-[40px]
        p-3 bg-neutral-900/70 text-white
        font-medium text-xs leading-tight uppercase
        rounded shadow-md
        hover:bg-neutral-500 hover:shadow-lg
        focus:bg-neutral-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-400
        active:bg-neutral-800 active:shadow-lg
        transition-all duration-150 ease-in-out
        ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 72 72"
        className="fill-neutral-400"
        aria-hidden="true"
      >
        <path d="M43.541,17.783l14.323,28.98c1.298,2.626,1.149,5.679-0.396,8.167c-1.546,2.487-4.217,3.973-7.146,3.973H21.677	c-2.929,0-5.6-1.485-7.146-3.973c-1.545-2.488-1.693-5.541-0.396-8.167l14.323-28.979c1.428-2.89,4.317-4.686,7.541-4.686	S42.113,14.893,43.541,17.783z M50.323,50.902c0.068,0,0.229,0,0.35-0.194c0.121-0.195,0.047-0.344,0.02-0.4l-14.323-28.98	c-0.04-0.08-0.113-0.229-0.369-0.229c-0.247,0-0.324,0.139-0.365,0.221c-0.001,0.003-14.328,28.989-14.328,28.989	c-0.027,0.056-0.102,0.206,0.02,0.4c0.12,0.194,0.281,0.194,0.35,0.194H50.323z" />
      </svg>
    </button>
  );
}
