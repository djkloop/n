"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { GlowCard } from "@/components/GlowCard";

const SPEED = 0.6;

interface TestimonialCard {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

function InfiniteCarousel({ items, speedMultiplier = 1 }: { items: TestimonialCard[]; speedMultiplier?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstItem = containerRef.current.querySelector("[data-item]");
      if (firstItem) {
        const gap = 16;
        const singleWidth = firstItem.clientWidth + gap;
        setContentWidth(singleWidth * items.length);
      }
    }
  }, [items.length]);

  useAnimationFrame((time, delta) => {
    if (contentWidth === 0) return;

    const currentX = x.get();
    const direction = speedMultiplier >= 0 ? -1 : 1;
    const newX = currentX + direction * SPEED * Math.abs(speedMultiplier) * (delta / 16);

    if (newX <= -contentWidth / 2) {
      x.set(0);
    } else if (newX >= 0) {
      x.set(-contentWidth / 2);
    } else {
      x.set(newX);
    }
  });

  const allItems = [...items, ...items];

  return (
    <div ref={containerRef} className="flex gap-4">
      <motion.div className="flex gap-4" style={{ x }}>
        {allItems.map((t, i) => (
          <div
            key={i}
            data-item
            className="flex flex-col w-[280px] flex-shrink-0"
          >
            <GlowCard className="p-5 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-[var(--border)]" loading="lazy" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--foreground-muted)' }}>"{t.quote}"</p>
            </GlowCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  const testimonialsRow1: TestimonialCard[] = [
    { name: "李明", role: "全栈工程师 · 中国", avatar: "https://picsum.photos/seed/cn1/100/100", quote: "CyberTruckAI 让 API 集成变得前所未有的简单。" },
    { name: "Alex Chen", role: "Senior Developer · 美国", avatar: "https://picsum.photos/seed/us1/100/100", quote: "The pay-per-call model is a game changer." },
    { name: "田中太郎", role: "バックエンドエンジニア · 日本", avatar: "https://picsum.photos/seed/jp1/100/100", quote: "URLだけでAPIが作成できるのは革命的です。" },
    { name: "Ivan Petrov", role: "DevOps Engineer · 俄罗斯", avatar: "https://picsum.photos/seed/ru1/100/100", quote: "Finally an API service that just works." },
    { name: "James Wilson", role: "Indie Developer · 英国", avatar: "https://picsum.photos/seed/uk1/100/100", quote: "Using it with Claude Code is a perfect match." },
    { name: "Priya Sharma", role: "Tech Lead · 印度", avatar: "https://picsum.photos/seed/in1/100/100", quote: "The documentation is clear and intuitive." },
    { name: "Nguyen Van Duc", role: "Software Architect · 越南", avatar: "https://picsum.photos/seed/vn1/100/100", quote: "Chỉ cần một URL là có thể tạo API." },
    { name: "Maria Santos", role: "Full Stack Developer · 巴西", avatar: "https://picsum.photos/seed/br1/100/100", quote: "Excelente servicio, muy recomendado." },
    { name: "Hans Mueller", role: "Backend Engineer · 德国", avatar: "https://picsum.photos/seed/de1/100/100", quote: "Perfekter Service für unsere Projekte." },
    { name: "Sophie Laurent", role: "DevOps Lead · 法国", avatar: "https://picsum.photos/seed/fr1/100/100", quote: "Service exceptionnel, les prix sont imbattables." },
    { name: "Marco Rossi", role: "CTO · 意大利", avatar: "https://picsum.photos/seed/it1/100/100", quote: "La soluzione API più semplice che abbia mai usato." },
    { name: "Anna Kowalski", role: "Software Engineer · 波兰", avatar: "https://picsum.photos/seed/pl1/100/100", quote: "Świetna usługa, bardzo polecam." },
    { name: "Kim Min-jun", role: "Backend Developer · 韩国", avatar: "https://picsum.photos/seed/kr1/100/100", quote: "API 통합이 엄청나게 간단해졌어요." },
    { name: "Zhang Wei", role: "Tech Lead · 中国", avatar: "https://picsum.photos/seed/cn2/100/100", quote: "CyberTruckAI 太棒了，完全超出了预期。" },
    { name: "David Brown", role: "Senior Engineer · 澳大利亚", avatar: "https://picsum.photos/seed/au1/100/100", quote: "Best API service I've used in years." },
  ];

  const testimonialsRow2: TestimonialCard[] = [
    { name: "刘芳", role: "全栈工程师 · 中国", avatar: "https://picsum.photos/seed/cn4/100/100", quote: "一个 URL 就能创建 API，太神奇了。" },
    { name: "Sarah Connor", role: "Security Engineer · 美国", avatar: "https://picsum.photos/seed/us4/100/100", quote: "Rock solid infrastructure with excellent security." },
    { name: "鈴木一郎", role: "インフラエンジニア · 日本", avatar: "https://picsum.photos/seed/jp4/100/100", quote: "Infrastructure as code がこんなに簡単になるなんて。" },
    { name: "Dmitri Volkov", role: "ML Engineer · 俄罗斯", avatar: "https://picsum.photos/seed/ru4/100/100", quote: "Лучший выбор для наших ML проектов." },
    { name: "William Taylor", role: "DevOps Engineer · 英国", avatar: "https://picsum.photos/seed/uk3/100/100", quote: "Our deployment pipeline is 10x faster now." },
    { name: "Priya Patel", role: "Data Engineer · 印度", avatar: "https://picsum.photos/seed/in3/100/100", quote: "Seamless integration with our data pipeline." },
    { name: "Tran Minh", role: "Backend Developer · 越南", avatar: "https://picsum.photos/seed/vn3/100/100", quote: "Hoàn toàn hài lòng với dịch vụ này." },
    { name: "Ana Rodriguez", role: "Frontend Lead · 阿根廷", avatar: "https://picsum.photos/seed/ar1/100/100", quote: "La velocidad de integración es increíble." },
    { name: "Stefan Weber", role: "CTO · 德国", avatar: "https://picsum.photos/seed/de3/100/100", quote: "Die beste Entscheidung für unser Team." },
    { name: "Claire Dupont", role: "Engineering Manager · 法国", avatar: "https://picsum.photos/seed/fr2/100/100", quote: "Service fiable et support excellent." },
    { name: "Giuseppe Bianchi", role: "Solutions Architect · 意大利", avatar: "https://picsum.photos/seed/it2/100/100", quote: "Finalmente un servizio API serio e affidabile." },
    { name: "Marek Kowalczyk", role: "Lead Developer · 波兰", avatar: "https://picsum.photos/seed/pl2/100/100", quote: "Najlepszy serwis API z jakiego korzystałem." },
    { name: "Park Seo-joon", role: "Tech Lead · 韩国", avatar: "https://picsum.photos/seed/kr3/100/100", quote: "개발 생산성이 엄청나게 올라갔어요." },
    { name: "陈俊杰", role: "架构师 · 中国", avatar: "https://picsum.photos/seed/cn5/100/100", quote: "CyberTruckAI 让架构设计更加优雅。" },
    { name: "Chris Martin", role: "Senior Developer · 澳大利亚", avatar: "https://picsum.photos/seed/au3/100/100", quote: "Clean API, clean code, clean results." },
  ];

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full border mb-5" style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}>
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            开发者说
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--foreground-muted)', maxWidth: '40ch' }}>
            听听全球开发者怎么说
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent z-20 pointer-events-none" />

          <div className="flex flex-col gap-5">
            <InfiniteCarousel items={testimonialsRow1} speedMultiplier={1} />
            <InfiniteCarousel items={testimonialsRow2} speedMultiplier={-1} />
          </div>
        </div>
      </div>
    </section>
  );
}
