"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HeroFlowVisualization } from "./HeroFlowVisualization";

function HeroFlowSkeleton() {
  return (
    <div className="relative h-[320px] w-[560px]">
      <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex w-[164px] items-center gap-2.5 rounded-[22px] border px-2.5 py-2.5"
            style={{
              borderColor: "var(--panel-border-soft)",
              background: "var(--surface-panel-soft)",
            }}
          >
            <div className="h-9 w-9 rounded-[13px] border" style={{ borderColor: "var(--panel-border-medium)" }} />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-16 rounded-full bg-[oklch(100%_0_0_/0.08)]" />
              <div className="h-2.5 w-12 rounded-full bg-[oklch(100%_0_0_/0.06)]" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-[252px] top-1/2 -translate-y-1/2">
        <div
          className="w-[138px] rounded-[34px] border px-4 py-5"
          style={{
            borderColor: "var(--panel-border-strong)",
            background: "var(--surface-panel-strong)",
          }}
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[oklch(100%_0_0_/0.08)]" />
          <div className="mx-auto h-3 w-20 rounded-full bg-[oklch(100%_0_0_/0.08)]" />
          <div className="mx-auto mt-3 h-4 w-16 rounded-full bg-[oklch(100%_0_0_/0.12)]" />
          <div className="mt-5 space-y-1.5">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="h-8 rounded-[16px] border" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-subtle)" }} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -right-28 top-1/2 -translate-y-1/2">
        <div
          className="w-[226px] rounded-[26px] border px-4 py-3.5"
          style={{
            borderColor: "var(--panel-border-strong)",
            background: "var(--surface-panel-strong)",
          }}
        >
          <div className="mb-3 h-16 rounded-[18px] border" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-muted)" }} />
          <div className="rounded-[20px] border px-3 py-2.5" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-code-strong)" }}>
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="mb-2 h-3 rounded-full bg-[oklch(100%_0_0_/0.08)] last:mb-0" />
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="h-14 rounded-[14px] border" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-muted)" }} />
            <div className="h-14 rounded-[14px] border" style={{ borderColor: "var(--panel-border-strong)", background: "var(--surface-panel-muted)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [flowReady, setFlowReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden" ref={bgRef}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
            opacity: 0.15,
            filter: "blur(120px)",
            left: `${mousePos.x * 0.3 + 40}%`,
            top: `${mousePos.y * 0.3 + 10}%`,
            transition: "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div
          className="absolute h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
            opacity: 0.1,
            filter: "blur(100px)",
            left: `${mousePos.x * 0.15 + 10}%`,
            bottom: `${mousePos.y * 0.2 + 10}%`,
            transition: "left 1s cubic-bezier(0.16, 1, 0.3, 1), bottom 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-20 md:px-8 md:py-32 lg:px-12">
        <div>
          <div
            className={`transition-all duration-1200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span
              className="mb-10 inline-block rounded-full border px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] md:mb-14"
              style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
            >
              CyberTruckAI
            </span>
          </div>

          <div
            className={`transition-all duration-1200 delay-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0"
            }`}
          >
            <h1 className="font-display font-bold tracking-tight leading-[0.9]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
              <span style={{ color: "var(--foreground)" }}>Build APIs</span>
              <br />
              <span style={{ color: "var(--primary)" }}>with URLs</span>
            </h1>
          </div>

          <div
            className={`mt-10 max-w-lg transition-all duration-1200 delay-400 ease-[cubic-bezier(0.32,0.72,0,1)] md:mt-14 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="mb-10 text-base leading-relaxed md:text-lg" style={{ color: "var(--foreground-muted)" }}>
              通过 URL 快速创建稳定可靠的 API 端点。支持 Claude Code、Codex 等主流 AI 编程工具。
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://cybertruckai.top/console"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--background)",
                  boxShadow: "0 0 0 oklch(65% 0.18 145 / 0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 40px oklch(65% 0.18 145 / 0.3), 0 0 0 1px oklch(65% 0.18 145 / 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 oklch(65% 0.18 145 / 0)";
                }}
              >
                <span className="relative z-10">开始使用</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://cybertruckai.top/console/token"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.backgroundColor = "var(--surface-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                获取 API Key
              </a>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block xl:right-16"
          initial={{ opacity: 0, x: 80, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          onAnimationComplete={() => {
            window.setTimeout(() => setFlowReady(true), 180);
          }}
        >
          {flowReady ? <HeroFlowVisualization /> : <HeroFlowSkeleton />}
        </motion.div>
      </div>
    </section>
  );
}
