"use client";

import { useRef, useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlowCard({ children, className = "", style }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}
