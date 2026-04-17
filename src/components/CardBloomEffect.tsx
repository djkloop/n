"use client";

import { motion } from "motion/react";

interface CardBloomEffectProps {
  isActive: boolean;
  isBlooming: boolean;
  color: { main: string; glow: string };
}

export function CardBloomEffect({ isActive, isBlooming, color }: CardBloomEffectProps) {
  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isActive
            ? `0 0 50px ${color.glow}, inset 0 0 30px ${color.main}15, 0 0 8px ${color.main}30`
            : "none",
        }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      {isBlooming && (
        <>
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${color.main}, transparent)`,
              filter: `blur(2px)`,
              transformOrigin: "center",
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 1],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${color.main}, transparent)`,
              filter: `blur(2px)`,
              transformOrigin: "center",
            }}
          />

          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1, 1],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            style={{
              background: `linear-gradient(180deg, transparent, ${color.main}, transparent)`,
              filter: `blur(2px)`,
              transformOrigin: "center",
            }}
          />

          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2px] pointer-events-none"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1, 1],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.45,
            }}
            style={{
              background: `linear-gradient(180deg, transparent, ${color.main}, transparent)`,
              filter: `blur(2px)`,
              transformOrigin: "center",
            }}
          />
        </>
      )}
    </>
  );
}