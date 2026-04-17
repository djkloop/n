"use client";

import { useEffect, useState } from "react";
import { GlowCard } from "./GlowCard";

export function PricingSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans = [
    { name: "Claude Code", rate: "1.0x", desc: "标准倍率", color: "var(--primary)" },
    { name: "Codex", rate: "0.5x", desc: "半价优惠", color: "var(--accent)" },
    { name: "Gemini CLI", rate: "0.8x", desc: "超值折扣", color: "var(--accent-secondary)" },
  ];

  return (
    <section className="py-28 md:py-40 px-6 md:px-16 lg:px-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className={`col-span-12 lg:col-span-4 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full border mb-5" style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}>
              Pricing
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              价格倍率
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--foreground-muted)', maxWidth: '32ch' }}>
              基于官方价格的折扣倍率，用得越多省得越多。
            </p>

            <div className="flex items-start gap-2.5 text-sm px-4 py-3 rounded-xl" style={{ backgroundColor: 'var(--background-raised)', border: '1px solid var(--border)' }}>
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--foreground-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ color: 'var(--foreground-muted)' }}>倍率随时可能调整，以模型广场为准</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${150 + index * 100}ms` }}
                >
                  <GlowCard className="p-6">
                    <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--foreground-muted)' }}>{plan.name}</p>
                    <p className="text-4xl font-display font-bold mb-2" style={{ color: plan.color }}>{plan.rate}</p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)', opacity: 0.7 }}>{plan.desc}</p>
                  </GlowCard>
                </div>
              ))}
            </div>

            <div className={`mt-6 pt-6 border-t flex items-center justify-between text-sm transition-all duration-1000 delay-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--foreground-muted)' }}>按量计费，无最低消费</span>
              <a
                href="https://cybertruckai.top/console/token"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium transition-all duration-300 hover:translate-x-1"
                style={{ color: 'var(--foreground)' }}
              >
                获取 API Key
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
