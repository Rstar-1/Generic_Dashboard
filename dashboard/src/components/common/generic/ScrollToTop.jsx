import React from 'react';
import { useLocation } from "react-router-dom";
import Icon from "../Icon";
import {
  scrollToTop
} from '../../../utils';

const CIRCUMFERENCE = 40 * Math.PI;

const ScrollToTop = React.memo(() => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const circleRef = React.useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const total = scrollHeight - clientHeight;

      if (circleRef.current && total > 0) {
        const offset = Math.max(0, Math.min(CIRCUMFERENCE, CIRCUMFERENCE * (1 - scrollTop / total)));
        circleRef.current.style.strokeDashoffset = offset;
      }

      setIsVisible(scrollTop > 300);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`scroll-to-top-btn flex items-center justify-center b-shadow z-99 border-0 cursor-pointer rounded-full bg-forth ${isVisible ? "visible" : ""
          }`}
        aria-label="Scroll to top"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.8)",
          pointerEvents: isVisible ? "all" : "none",
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          style={{ transform: "rotate(-90deg)", overflow: "visible" }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#eef2f6"
            strokeWidth="2.5"
          />
          <circle
            ref={circleRef}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 10ms linear" }}
          />
        </svg>
        <div className="absolute">
          <Icon
            name="ArrowUp"
            width="18"
            height="18"
            strokeWidth="2.5"
            stroke="var(--primary)"
          />
        </div>
      </button>

      <style>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 85px;
          right: 6px;
          width: 50px;
          height: 50px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-to-top-btn:hover {
          transform: scale(1.08) !important;
        }
      `}</style>
    </>
  );
});

ScrollToTop.displayName = "ScrollToTop";

export default ScrollToTop;
