"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 transition-all duration-500 ${
      scrolled ? "backdrop-blur-xl bg-[var(--background)]/80 border-b border-[var(--border-light)]" : ""
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[var(--accent-hover)] transition-all duration-300">
            <svg className="w-5 h-5 text-[var(--background)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight">CyberTruckAI</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-sm">
          <a href="#features" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">功能</a>
          <a href="#tutorial" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">教程</a>
          <a href="#cli" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">CLI</a>
          <a href="#pricing" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">定价</a>
          <a href="#models" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">模型广场</a>
        </div>

        <button className="px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:scale-105 transition-transform duration-300 active:scale-95">
          开始使用
        </button>
      </div>
    </nav>
  );
}
