"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { GlowCard } from "./GlowCard";
import { CardBloomEffect } from "./CardBloomEffect";

interface Point {
  x: number;
  y: number;
}

interface PathData {
  left: Point[];
  center: Point[];
  right: Point[];
  origin: Point;
  endpoints: {
    left: Point;
    center: Point;
    right: Point;
  };
  cardBounds: {
    left: { left: number; right: number; top: number; width: number };
    center: { left: number; right: number; top: number; width: number };
    right: { left: number; right: number; top: number; width: number };
  };
}

interface Particle {
  id: number;
  pathIndex: 0 | 1 | 2;
  color: { main: string; glow: string };
  progress: number;
  trail: Point[];
}

const PARTICLE_SPEED = 0.0004;
const TRAIL_LENGTH = 15;

const COLORS = [
  { main: "oklch(65% 0.18 145)", glow: "oklch(65% 0.18 145 / 0.35)" },
  { main: "oklch(60% 0.14 250)", glow: "oklch(60% 0.14 250 / 0.35)" },
  { main: "oklch(60% 0.14 280)", glow: "oklch(60% 0.14 280 / 0.35)" },
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function evaluateBezier(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function sampleBezierPath(p0: Point, p1: Point, p2: Point, p3: Point, samples: number = 100): Point[] {
  const points: Point[] = [];
  for (let i = 0; i <= samples; i++) {
    points.push(evaluateBezier(i / samples, p0, p1, p2, p3));
  }
  return points;
}

function getPathPoint(path: Point[], progress: number): Point {
  const index = progress * (path.length - 1);
  const i = Math.floor(index);
  const t = index - i;
  if (i >= path.length - 1) return path[path.length - 1];
  return {
    x: path[i].x + (path[i + 1].x - path[i].x) * t,
    y: path[i].y + (path[i + 1].y - path[i].y) * t,
  };
}

export function FeaturesSection() {
  const pins = Array.from({ length: 9 }, (_, i) => i);

  const chipRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [paths, setPaths] = useState<PathData | null>(null);
  const [svgRect, setSvgRect] = useState<{ width: number; height: number }>({ width: 1000, height: 520 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [particle, setParticle] = useState<Particle | null>(null);
  const [cardBloomIndex, setCardBloomIndex] = useState(-1);
  const pathsRef = useRef<PathData | null>(null);
  const activeIndexRef = useRef(0);

  const calculatePaths = useCallback(() => {
    if (!chipRef.current || !cardLeftRef.current || !cardCenterRef.current || !cardRightRef.current || !svgRef.current) {
      return;
    }

    const svgBounds = svgRef.current.getBoundingClientRect();

    setSvgRect({ width: svgBounds.width, height: svgBounds.height });

    const chipBounds = chipRef.current.getBoundingClientRect();
    const leftBounds = cardLeftRef.current.getBoundingClientRect();
    const centerBounds = cardCenterRef.current.getBoundingClientRect();
    const rightBounds = cardRightRef.current.getBoundingClientRect();

    const chipBottom: Point = {
      x: chipBounds.left - svgBounds.left + chipBounds.width / 2,
      y: chipBounds.bottom - svgBounds.top,
    };

    const leftTop: Point = {
      x: leftBounds.left - svgBounds.left + leftBounds.width / 2,
      y: leftBounds.top - svgBounds.top,
    };

    const centerTop: Point = {
      x: centerBounds.left - svgBounds.left + centerBounds.width / 2,
      y: centerBounds.top - svgBounds.top,
    };

    const rightTop: Point = {
      x: rightBounds.left - svgBounds.left + rightBounds.width / 2,
      y: rightBounds.top - svgBounds.top,
    };

    const buildPath = (start: Point, end: Point) => {
      const midY = start.y + (end.y - start.y) * 0.5;
      const cp1: Point = { x: start.x, y: midY };
      const cp2: Point = { x: end.x, y: midY };
      return sampleBezierPath(start, cp1, cp2, end, 100);
    };

    setPaths({
      left: buildPath(chipBottom, leftTop),
      center: buildPath(chipBottom, centerTop),
      right: buildPath(chipBottom, rightTop),
      origin: chipBottom,
      endpoints: { left: leftTop, center: centerTop, right: rightTop },
      cardBounds: {
        left: { left: leftBounds.left - svgBounds.left, right: leftBounds.right - svgBounds.left, top: leftBounds.top - svgBounds.top, width: leftBounds.width },
        center: { left: centerBounds.left - svgBounds.left, right: centerBounds.right - svgBounds.left, top: centerBounds.top - svgBounds.top, width: centerBounds.width },
        right: { left: rightBounds.left - svgBounds.left, right: rightBounds.right - svgBounds.left, top: rightBounds.top - svgBounds.top, width: rightBounds.width },
      },
    });
    pathsRef.current = {
      left: buildPath(chipBottom, leftTop),
      center: buildPath(chipBottom, centerTop),
      right: buildPath(chipBottom, rightTop),
      origin: chipBottom,
      endpoints: { left: leftTop, center: centerTop, right: rightTop },
      cardBounds: {
        left: { left: leftBounds.left - svgBounds.left, right: leftBounds.right - svgBounds.left, top: leftBounds.top - svgBounds.top, width: leftBounds.width },
        center: { left: centerBounds.left - svgBounds.left, right: centerBounds.right - svgBounds.left, top: centerBounds.top - svgBounds.top, width: centerBounds.width },
        right: { left: rightBounds.left - svgBounds.left, right: rightBounds.right - svgBounds.left, top: rightBounds.top - svgBounds.top, width: rightBounds.width },
      },
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(calculatePaths, 100);
    window.addEventListener("resize", calculatePaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePaths);
    };
  }, [calculatePaths]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    let isRunning = true;

    const emitParticle = (index: number) => {
      setParticle({
        id: Date.now(),
        pathIndex: index as 0 | 1 | 2,
        color: COLORS[index],
        progress: 0,
        trail: [],
      });
    };

    emitParticle(activeIndexRef.current);

    const animate = (time: number) => {
      if (!isRunning) return;

      const delta = time - lastTime;
      lastTime = time;
      const currentPaths = pathsRef.current;
      if (!currentPaths) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      setParticle((prev) => {
        if (!prev) return null;

        const newProgress = prev.progress + PARTICLE_SPEED * delta;

        if (newProgress >= 1) {
          setCardBloomIndex(prev.pathIndex);
          setTimeout(() => setCardBloomIndex(-1), 800);

          const nextIndex = (activeIndexRef.current + 1) % 3;
          setActiveIndex(nextIndex);
          setTimeout(() => {
            if (isRunning) emitParticle(nextIndex);
          }, 1200);
          return null;
        }

        const pathKey = ["left", "center", "right"][prev.pathIndex] as keyof PathData;
        const point = getPathPoint(currentPaths[pathKey] as Point[], easeInOutCubic(newProgress));
        const newTrail = [point, ...prev.trail].slice(0, TRAIL_LENGTH);

        return { ...prev, progress: newProgress, trail: newTrail };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const currentColor = COLORS[activeIndex];

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-20 max-w-xl">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full border mb-5" style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}>
            Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            为什么选择我们
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            专为现代开发者设计的 AI API 服务，简单、快速、可靠。
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center mb-12 md:mb-16">
            <motion.div
              ref={chipRef}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border font-medium text-xs tracking-[0.05em] uppercase"
              style={{
                background: 'oklch(14% 0.01 265)',
                borderColor: 'var(--border)',
                color: 'var(--foreground-muted)',
              }}
              animate={{
                boxShadow: `0 0 20px ${currentColor.glow}`,
                borderColor: currentColor.main,
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              {pins.map((i) => (
                <span
                  key={i}
                  className="absolute -bottom-[5px]"
                  style={{
                    left: `${(i / (pins.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: '1px',
                      height: '4px',
                      background: 'var(--border-light)',
                    }}
                  />
                </span>
              ))}
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                animate={{ color: currentColor.main }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </motion.svg>
              <span>Powered By</span>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>CyberTruckAI</span>
            </motion.div>
          </div>

          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox={`0 0 ${svgRect.width} ${svgRect.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="particle-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="40%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {paths && (
              <>
                {["left", "center", "right"].map((key, idx) => {
                  const pathStr = paths[key as keyof typeof paths] as Point[];
                  if (!Array.isArray(pathStr)) return null;

                  const d = pathStr.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

                  return (
                    <g key={key}>
                      <path
                        d={d}
                        fill="none"
                        stroke={COLORS[idx].main}
                        strokeWidth={0.5}
                        strokeOpacity={0.25}
                      />
                    </g>
                  );
                })}

                {particle && paths && (
                  <g key={particle.id}>
                    {(() => {
                      const pathKey = ["left", "center", "right"][particle.pathIndex];
                      const pathData = paths[pathKey as keyof typeof paths] as Point[];
                      if (!pathData || !Array.isArray(pathData)) return null;

                      const currentIdx = Math.floor(particle.progress * (pathData.length - 1));
                      const currentPoint = pathData[currentIdx];
                      const isNearEnd = particle.progress > 0.85;

                      const trailLen = isNearEnd ? 35 : 20;
                      const trailPoints = [];
                      for (let i = 1; i <= trailLen; i++) {
                        const idx = Math.max(0, currentIdx - i);
                        trailPoints.push(pathData[idx]);
                      }

                      return (
                        <>
                          {trailPoints.map((point, idx) => {
                            const t = idx / (trailPoints.length - 1);
                            const alpha = Math.pow(1 - t, 2) * 0.9 * (isNearEnd ? 1 - (particle.progress - 0.85) / 0.15 : 1);
                            const radius = (1 - t) * 2.5 + 0.3;
                            return (
                              <circle
                                key={idx}
                                cx={point.x}
                                cy={point.y}
                                r={radius}
                                fill={particle.color.main}
                                opacity={Math.max(0, alpha)}
                              />
                            );
                          })}

                          <circle
                            cx={currentPoint.x}
                            cy={currentPoint.y}
                            r="5"
                            fill={particle.color.main}
                            filter="url(#soft-glow)"
                          />
                          <circle
                            cx={currentPoint.x}
                            cy={currentPoint.y}
                            r="3"
                            fill="white"
                            opacity={0.95}
                          />
                          <circle
                            cx={currentPoint.x}
                            cy={currentPoint.y}
                            r="8"
                            fill={particle.color.main}
                            opacity={0.2}
                          />
                          <circle
                            cx={currentPoint.x}
                            cy={currentPoint.y}
                            r="14"
                            fill={particle.color.main}
                            opacity={0.08}
                          />
                        </>
                      );
                    })()}
                  </g>
                )}

                <motion.circle
                  cx={paths.origin.x}
                  cy={paths.origin.y}
                  r={3}
                  fill={currentColor.main}
                  animate={{
                    r: [3, 4.5, 3],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                  }}
                />
              </>
            )}
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative z-10 items-stretch">
            <div ref={cardLeftRef} className="flex">
              <GlowCard className="p-7 md:p-8 overflow-visible flex flex-col w-full">
                <CardBloomEffect isActive={activeIndex === 0} isBlooming={cardBloomIndex === 0} color={COLORS[0]} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.15)', color: 'var(--primary)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">极速创建</h3>
                <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: 'var(--foreground-muted)' }}>
                  通过 URL 即可在秒级时间内创建 API，无需复杂配置，轻松上手。
                </p>
                <div className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: 'var(--primary)' }}>
                  <span>了解更多</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </GlowCard>
            </div>

            <div ref={cardCenterRef} className="flex">
              <GlowCard className="p-7 md:p-8 overflow-visible flex flex-col w-full">
                <CardBloomEffect isActive={activeIndex === 1} isBlooming={cardBloomIndex === 1} color={COLORS[1]} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'oklch(60% 0.14 250 / 0.15)', color: 'var(--accent)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">全球加速</h3>
                <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: 'var(--foreground-muted)' }}>
                  智能选择最优节点，99.9% 可用性保障，全球延迟最低。
                </p>
                <div className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: 'var(--accent)' }}>
                  <span>了解更多</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </GlowCard>
            </div>

            <div ref={cardRightRef} className="flex">
              <GlowCard className="p-7 md:p-8 overflow-visible flex flex-col w-full">
                <CardBloomEffect isActive={activeIndex === 2} isBlooming={cardBloomIndex === 2} color={COLORS[2]} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'oklch(60% 0.14 280 / 0.15)', color: 'var(--accent-secondary)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">多工具兼容</h3>
                <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: 'var(--foreground-muted)' }}>
                  无缝支持 Claude Code、Codex CLI、Gemini CLI、OpenCode 等主流编程工具。
                </p>
                <div className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: 'var(--accent-secondary)' }}>
                  <span>了解更多</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
