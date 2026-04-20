"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  SiAlibabacloud,
  SiAnthropic,
  SiGoogle,
  SiOpenai,
} from "react-icons/si";
import { CardBloomEffect } from "./CardBloomEffect";
import { GlowCard } from "./GlowCard";

function ZAiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 7h12L8 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Point {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  stage: "left" | "right";
  progress: number;
  trail: Point[];
}

interface FlowItem {
  provider: {
    label: string;
    vendor: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  endpoint: string;
  response: Array<{ key: string; value: string }>;
}

const FLOW_ITEMS: FlowItem[] = [
  {
    provider: { label: "Claude", vendor: "Anthropic", icon: SiAnthropic },
    endpoint: "/v1/chat/completions",
    response: [
      { key: '"provider"', value: '"claude-sonnet-4"' },
      { key: '"endpoint"', value: '"/v1/chat/completions"' },
      { key: '"latency"', value: '"412ms"' },
      { key: '"requestId"', value: '"req_82af91c7"' },
    ],
  },
  {
    provider: { label: "GPT", vendor: "OpenAI", icon: SiOpenai },
    endpoint: "/v1/responses",
    response: [
      { key: '"provider"', value: '"gpt-5.4"' },
      { key: '"endpoint"', value: '"/v1/responses"' },
      { key: '"status"', value: '"response ready"' },
      { key: '"latency"', value: '"342ms"' },
    ],
  },
  {
    provider: { label: "GLM", vendor: "Z.ai", icon: ZAiIcon },
    endpoint: "/v1/messages",
    response: [
      { key: '"provider"', value: '"glm-5.1"' },
      { key: '"endpoint"', value: '"/v1/messages"' },
      { key: '"stream"', value: '"true"' },
      { key: '"latency"', value: '"401ms"' },
    ],
  },
  {
    provider: { label: "Gemini", vendor: "Google", icon: SiGoogle },
    endpoint: "/v1/embeddings",
    response: [
      { key: '"provider"', value: '"gemini-embedding"' },
      { key: '"endpoint"', value: '"/v1/embeddings"' },
      { key: '"dimensions"', value: '"1024"' },
      { key: '"latency"', value: '"124ms"' },
    ],
  },
  {
    provider: { label: "Qwen", vendor: "Alibaba", icon: SiAlibabacloud },
    endpoint: "/v1/images/generations",
    response: [
      { key: '"provider"', value: '"qwen-3.6-plus"' },
      { key: '"endpoint"', value: '"/v1/images/generations"' },
      { key: '"format"', value: '"url"' },
      { key: '"latency"', value: '"1.58s"' },
    ],
  },
];

const FLOW_COLORS = [
  { line: "oklch(65% 0.18 145)", glow: "oklch(65% 0.18 145 / 0.24)" },
  { line: "oklch(70% 0.16 230)", glow: "oklch(70% 0.16 230 / 0.24)" },
  { line: "oklch(68% 0.18 310)", glow: "oklch(68% 0.18 310 / 0.24)" },
  { line: "oklch(78% 0.16 95)", glow: "oklch(78% 0.16 95 / 0.22)" },
  { line: "oklch(72% 0.17 190)", glow: "oklch(72% 0.17 190 / 0.22)" },
];

function sampleLine(start: Point, end: Point, steps: number): Point[] {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps;
    return {
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    };
  });
}

function buildPath(start: Point, hub: Point, end: Point): Point[] {
  const bendA = { x: start.x + 54, y: start.y };
  const bendB = { x: bendA.x, y: hub.y };
  const bendC = { x: end.x - 54, y: hub.y };
  const bendD = { x: bendC.x, y: end.y };

  const segments = [
    sampleLine(start, bendA, 28),
    sampleLine(bendA, bendB, 32),
    sampleLine(bendB, hub, 28),
    sampleLine(hub, bendC, 40),
    sampleLine(bendC, bendD, 32),
    sampleLine(bendD, end, 28),
  ];

  return segments.flatMap((segment, index) => (index === 0 ? segment : segment.slice(1)));
}

function buildInboundPath(start: Point, end: Point): Point[] {
  const bendA = { x: start.x + 54, y: start.y };
  const bendB = { x: bendA.x, y: end.y };

  const segments = [
    sampleLine(start, bendA, 28),
    sampleLine(bendA, bendB, 32),
    sampleLine(bendB, end, 20),
  ];

  return segments.flatMap((segment, index) => (index === 0 ? segment : segment.slice(1)));
}

function buildOutboundPath(start: Point, end: Point): Point[] {
  const bendA = { x: start.x + 52, y: start.y };
  const bendB = { x: bendA.x, y: end.y };

  const segments = [
    sampleLine(start, bendA, 20),
    sampleLine(bendA, bendB, 28),
    sampleLine(bendB, end, 24),
  ];

  return segments.flatMap((segment, index) => (index === 0 ? segment : segment.slice(1)));
}

function getPathPoint(path: Point[], progress: number): Point {
  if (path.length === 0) {
    return { x: 0, y: 0 };
  }

  if (path.length === 1) {
    return path[0];
  }

  const index = progress * (path.length - 1);
  const base = Math.floor(index);
  const t = index - base;

  if (base >= path.length - 1) return path[path.length - 1];
  if (!path[base] || !path[base + 1]) return path[path.length - 1];

  return {
    x: path[base].x + (path[base + 1].x - path[base].x) * t,
    y: path[base].y + (path[base + 1].y - path[base].y) * t,
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function HeroFlowVisualization() {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const providerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endpointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const responseBadgeRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [leftPath, setLeftPath] = useState<Point[]>([]);
  const [rightPath, setRightPath] = useState<Point[]>([]);
  const [particle, setParticle] = useState<Particle | null>(null);
  const [isEndpointBlooming, setIsEndpointBlooming] = useState(false);
  const [isResponseBlooming, setIsResponseBlooming] = useState(false);
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const activeIndexRef = useRef(0);
  const updateGeometryRef = useRef<() => void>(() => {});

  const activeItem = FLOW_ITEMS[activeIndex];
  const ActiveIcon = activeItem.provider.icon;
  const activeColor = FLOW_COLORS[activeIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useLayoutEffect(() => {
    setIsGeometryReady(false);

    const updateGeometry = () => {
      const root = rootRef.current;
      const provider = providerRefs.current[activeIndex];
      const gateway = gatewayRef.current;
      const endpoint = endpointRefs.current[activeIndex];
      const response = responseRef.current;
      const responseBadge = responseBadgeRef.current;
      if (!root || !provider || !gateway || !response || !responseBadge) return;

      const rootBox = root.getBoundingClientRect();
      const providerBox = provider.getBoundingClientRect();
      const gatewayBox = gateway.getBoundingClientRect();
      const endpointBox = endpoint?.getBoundingClientRect();
      const responseBox = response.getBoundingClientRect();
      const responseBadgeBox = responseBadge.getBoundingClientRect();

      const toLocal = (x: number, y: number) => ({
        x: x - rootBox.left,
        y: y - rootBox.top,
      });

      const start = toLocal(providerBox.right, providerBox.top + providerBox.height / 2);
      const hubViewportY = endpointBox
        ? endpointBox.top + endpointBox.height / 2
        : gatewayBox.top + gatewayBox.height / 2;
      const leftHit = endpointBox
        ? toLocal(endpointBox.left - 6, endpointBox.top + endpointBox.height / 2)
        : toLocal(gatewayBox.left, hubViewportY);
      const launch = endpointBox
        ? toLocal(endpointBox.right + 6, endpointBox.top + endpointBox.height / 2)
        : toLocal(gatewayBox.right, hubViewportY);
      const end = toLocal(responseBox.left, responseBadgeBox.top + responseBadgeBox.height / 2);
      const hub = toLocal(gatewayBox.left + gatewayBox.width * 0.68, hubViewportY);

      setLeftPath(buildInboundPath(start, leftHit));
      setRightPath(buildOutboundPath(launch, end));
      setIsGeometryReady(true);
    };

    updateGeometryRef.current = updateGeometry;

    updateGeometry();
    const rafA = window.requestAnimationFrame(updateGeometry);
    const rafB = window.setTimeout(updateGeometry, 120);
    const rafC = window.setTimeout(updateGeometry, 260);
    window.addEventListener("resize", updateGeometry);
    return () => {
      window.cancelAnimationFrame(rafA);
      window.clearTimeout(rafB);
      window.clearTimeout(rafC);
      window.removeEventListener("resize", updateGeometry);
    };
  }, [activeIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      updateGeometryRef.current();
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isGeometryReady || leftPath.length === 0 || rightPath.length === 0) return;

    const PARTICLE_SPEED = 0.00042;
    const TRAIL_LENGTH = 15;
    let animationFrame = 0;
    let lastTime = 0;
    let isRunning = true;
    const startDelay = window.setTimeout(() => {
      if (isRunning) {
        emitParticle("left");
      }
    }, 220);

    const emitParticle = (stage: "left" | "right") => {
      const initialPath = stage === "left" ? leftPath : rightPath;
      const startPoint = initialPath[0];
      setParticle({
        id: Date.now(),
        stage,
        progress: 0,
        trail: startPoint ? [startPoint] : [],
      });
    };

    const animate = (time: number) => {
      if (!isRunning) return;
      if (!lastTime) {
        lastTime = time;
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }
      const delta = time - lastTime;
      lastTime = time;

      setParticle((prev) => {
        if (!prev) return prev;
        const currentPath = prev.stage === "left" ? leftPath : rightPath;
        if (currentPath.length === 0) return prev;

        const nextProgress = prev.progress + PARTICLE_SPEED * delta;

        if (nextProgress >= 1) {
          if (prev.stage === "left") {
            setIsEndpointBlooming(true);
            window.setTimeout(() => setIsEndpointBlooming(false), 800);
            window.setTimeout(() => {
              if (isRunning) emitParticle("right");
            }, 420);
          } else {
            setIsResponseBlooming(true);
            window.setTimeout(() => setIsResponseBlooming(false), 900);
            const nextIndex = (activeIndexRef.current + 1) % FLOW_ITEMS.length;
            window.setTimeout(() => {
              if (!isRunning) return;
              setActiveIndex(nextIndex);
              window.setTimeout(() => {
                if (isRunning) emitParticle("left");
              }, 220);
            }, 820);
          }
          return null;
        }

        const eased = easeInOutCubic(nextProgress);
        const point = getPathPoint(currentPath, eased);
        const trail = [point, ...prev.trail].slice(0, TRAIL_LENGTH);
        return { ...prev, progress: nextProgress, trail };
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => {
      isRunning = false;
      window.clearTimeout(startDelay);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isGeometryReady, leftPath, rightPath, shouldReduceMotion]);

  const trailPath = particle && particle.trail.length > 1
    ? [...particle.trail]
        .reverse()
        .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
        .join(" ")
    : "";
  const particlePoint = particle?.trail[0] ?? null;
  return (
    <div ref={rootRef} className="relative h-[320px] w-[560px]">
      <svg className="pointer-events-none absolute inset-0 z-0" viewBox="0 0 560 320" fill="none" aria-hidden="true">
        <path
          d={leftPath.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ")}
          stroke="color-mix(in oklch, var(--primary) 12%, var(--panel-fill-soft))"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity={0.62}
        />
        <path
          d={rightPath.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ")}
          stroke="color-mix(in oklch, var(--primary) 12%, var(--panel-fill-soft))"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity={0.62}
        />
      </svg>

      <svg className="pointer-events-none absolute inset-0 z-20 overflow-visible" viewBox="0 0 560 320" fill="none" aria-hidden="true">

        {trailPath && (
          <>
            <path
              d={trailPath}
              stroke={activeColor.line}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity={0.14}
            />
            <path
              d={trailPath}
              stroke={activeColor.line}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity={0.9}
            />
          </>
        )}

        {particle?.trail.map((point, index) => (
          <circle
            key={`trail-${index}`}
            cx={point.x}
            cy={point.y}
            r={Math.max(0.7, 2.8 - index * 0.2)}
            fill={activeColor.line}
            opacity={Math.max(0.06, 0.88 - index * 0.085)}
          />
        ))}

        {particlePoint && (
          <>
            <circle cx={particlePoint.x} cy={particlePoint.y} r="7" fill={activeColor.line} opacity="0.12" />
            <circle cx={particlePoint.x} cy={particlePoint.y} r="4.4" fill={activeColor.line} opacity="0.22" />
            <circle cx={particlePoint.x} cy={particlePoint.y} r="2.8" fill={activeColor.line} />
            <circle cx={particlePoint.x} cy={particlePoint.y} r="1.4" fill="white" opacity="0.9" />
          </>
        )}

      </svg>

      <div className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
        {FLOW_ITEMS.map((item, index) => {
          const Icon = item.provider.icon;
          const active = index === activeIndex;
          return (
            <motion.div
              key={item.provider.label}
              ref={(node) => {
                providerRefs.current[index] = node;
              }}
              className="flex w-[164px] items-center gap-2.5 rounded-[22px] border px-2.5 py-2.5"
              style={{
                borderColor: active ? activeColor.line : "var(--panel-border-soft)",
                background: active
                  ? "var(--surface-panel-strong)"
                  : "var(--surface-panel-soft)",
                boxShadow: active ? `0 0 24px ${activeColor.glow}` : "none",
              }}
              animate={{ opacity: active ? 1 : 0.38, scale: active ? 1 : 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-[13px] border"
                style={{ borderColor: active ? activeColor.line : "var(--panel-border-medium)", color: active ? activeColor.line : "var(--foreground-muted)" }}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {item.provider.label}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--foreground-muted)" }}>
                  {item.provider.vendor}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div ref={gatewayRef} className="absolute left-[252px] top-1/2 z-10 -translate-y-1/2">
        <GlowCard
          className="w-[138px] rounded-[34px] px-4 py-5"
          style={{
            background: "var(--surface-panel-strong)",
            border: "1px solid var(--panel-border-strong)",
            boxShadow: "var(--shadow-panel)",
          }}
        >
          <motion.div
            className="mx-auto mb-4 h-1.5 w-12 rounded-full"
            style={{ background: "var(--panel-fill-soft)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: activeColor.line }}>
              CyberTruckAI
            </div>
            <div className="mt-2 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Gateway
            </div>
          </div>
          <div className="mt-5 space-y-1.5">
            {FLOW_ITEMS.map((item, index) => {
              const active = index === activeIndex;
              return (
                <motion.div
                  key={item.endpoint}
                  ref={(node) => {
                    endpointRefs.current[index] = node;
                  }}
                  className="relative truncate overflow-hidden rounded-[16px] border px-3 py-1.5 text-[10px] font-mono"
                  style={{
                    borderColor: active ? activeColor.line : "var(--panel-border-strong)",
                    background: active ? "var(--surface-panel-active)" : "var(--surface-panel-subtle)",
                    color: active ? "var(--foreground)" : "var(--foreground-muted)",
                  }}
                  animate={{ opacity: active ? 1 : 0.32 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active && (
                    <CardBloomEffect
                      isActive={true}
                      isBlooming={isEndpointBlooming}
                      color={{ main: activeColor.line, glow: activeColor.glow }}
                    />
                  )}
                  {item.endpoint}
                </motion.div>
              );
            })}
          </div>
        </GlowCard>
      </div>

      <div ref={responseRef} className="absolute -right-28 top-1/2 z-10 -translate-y-1/2">
        <GlowCard
          className="w-[226px] rounded-[26px] px-4 py-3.5"
          style={{
            background: "var(--surface-panel-strong)",
            border: `1px solid ${activeColor.glow}`,
            boxShadow: `var(--shadow-panel), 0 0 40px ${activeColor.glow}`,
          }}
        >
          <CardBloomEffect isActive={true} isBlooming={isResponseBlooming} color={{ main: activeColor.line, glow: activeColor.glow }} />
          <motion.div
            ref={responseBadgeRef}
            className="mb-3 flex items-center gap-2.5 rounded-[18px] border px-3 py-2"
            style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-muted)" }}
            animate={{ boxShadow: [`0 0 0 ${activeColor.glow}`, `0 0 18px ${activeColor.glow}`, `0 0 0 ${activeColor.glow}`] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: activeColor.line, color: "var(--background)" }}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--foreground-muted)" }}>
                CyberTruckAI
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Route 200 OK
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[20px] border px-3 py-2.5 font-mono text-[10px] leading-5"
            style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-code-strong)" }}
            key={activeItem.endpoint}
            initial={{ opacity: 0.55, y: 6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--foreground-muted)" }}>
                response
              </div>
              <div className="truncate text-[10px]" style={{ color: activeColor.line, maxWidth: 90 }}>
                cybertruckai.top/v1
              </div>
            </div>
            <div style={{ color: "var(--foreground-muted)" }}>{"{"}</div>
            {activeItem.response.map((line) => (
              <div key={line.key} className="flex min-w-0 gap-2 pl-3">
                <span style={{ color: "var(--foreground-muted)" }}>{line.key}:</span>
                <span className="min-w-0 flex-1 truncate" style={{ color: "var(--foreground)" }}>
                  {line.value}
                </span>
              </div>
            ))}
            <div style={{ color: "var(--foreground-muted)" }}>{"}"}</div>
          </motion.div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="rounded-[14px] border px-2.5 py-2" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-muted)" }}>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--foreground-muted)" }}>
                provider
              </div>
              <div className="mt-1 truncate font-mono text-[10px]" style={{ color: "var(--foreground)" }}>
                {activeItem.provider.label}
              </div>
            </div>
            <div className="rounded-[14px] border px-2.5 py-2" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-muted)" }}>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--foreground-muted)" }}>
                status
              </div>
              <div className="mt-1 truncate font-mono text-[10px]" style={{ color: "var(--foreground)" }}>
                healthy
              </div>
            </div>
          </div>
        </GlowCard>
      </div>

    </div>
  );
}
