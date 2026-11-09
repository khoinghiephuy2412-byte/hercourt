"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect whether the user is on an iOS or mobile device,
 * or using a touch-first viewport where target="_blank" is problematic
 * in in-app browsers (Zalo, Facebook Messenger, Instagram, TikTok) and Mobile Safari.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isMobileUA = /iPhone|iPad|iPod|Android|Mobile/i.test(userAgent);
      const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));
      const isNarrow = typeof window !== "undefined" && window.innerWidth < 768;
      setIsMobile(Boolean(isMobileUA || isTouch || isNarrow));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

/**
 * Handle mobile-safe link navigation.
 * On mobile/iOS devices, removes target="_blank" so the browser or WKWebView
 * navigates in the current tab instead of silently failing or getting blocked by popup restrictions.
 */
export function handleExternalLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.stopPropagation();
  if (typeof window !== "undefined") {
    const isMobileDevice =
      /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent) ||
      "ontouchstart" in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      window.innerWidth < 768;

    if (isMobileDevice) {
      e.currentTarget.removeAttribute("target");
    }
  }
}
