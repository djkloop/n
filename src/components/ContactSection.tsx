"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/GlowCard";

function QQIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  );
}

function QRIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" rx="0.5" />
      <rect x="18" y="14" width="3" height="3" rx="0.5" />
      <rect x="14" y="18" width="3" height="3" rx="0.5" />
      <rect x="18" y="18" width="3" height="3" rx="0.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}

export function ContactSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section className="relative border-t px-6 py-24 md:px-16 md:py-28 lg:px-24" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 max-w-2xl md:mb-12">
            <span className="mb-5 inline-block rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em]" style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}>
              Contact
            </span>
            <h2 className="mb-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              加入社区
            </h2>
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "var(--foreground-muted)" }}>
              社区入口只保留 QQ 群。进群后可以直接获取部署帮助、产品更新和开发交流，减少选择成本，第一时间解决问题。
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="max-w-[980px]"
          >
            <GlowCard className="grid grid-cols-1 items-center gap-8 p-6 md:grid-cols-[1.2fr_220px] md:p-8 lg:p-10">
              <div className="text-left">
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: "oklch(65% 0.18 145 / 0.15)",
                    color: "var(--primary)",
                  }}
                >
                  <QQIcon />
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">联系我们</h3>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                    style={{
                      backgroundColor: "oklch(65% 0.18 145 / 0.2)",
                      color: "var(--primary)",
                    }}
                  >
                    推荐
                  </span>
                </div>

                <div className="mb-4 text-sm font-mono md:text-base" style={{ color: "var(--primary)" }}>
                  QQ 群 214778070
                </div>

                <p className="max-w-xl text-sm leading-relaxed md:text-base" style={{ color: "var(--foreground-muted)" }}>
                  优先通过官方群联系。群内可直接获取产品更新、部署答疑和使用交流，遇到问题时也更容易第一时间得到反馈。
                </p>
              </div>

              <div
                className="relative h-[220px] w-[220px] justify-self-start overflow-hidden rounded-[28px] border-2 border-dashed transition-transform duration-300 hover:scale-[1.03] md:justify-self-end"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-panel-subtle)" }}
                onClick={() => handleImageClick("/qr-qq.jpg")}
              >
                <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center opacity-40">
                  <QRIcon />
                  <span className="mt-2 text-[10px] uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                    扫码加入
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/qr-qq.jpg"
                    alt="QQ群二维码"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 transition-opacity hover:opacity-100">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "oklch(0% 0 0 / 0.6)", color: "var(--foreground)" }}
                  >
                    <ZoomInIcon />
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "oklch(0% 0 0 / 0.85)", backdropFilter: "blur(8px)" }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: "oklch(100% 0 0 / 0.1)", color: "var(--foreground)" }}
              >
                <CloseIcon />
              </button>
              <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--background-raised)" }}>
                <img src={selectedImage} alt="QQ群二维码" className="max-h-[70vh] w-full object-contain" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center" style={{ backgroundColor: "oklch(0% 0 0 / 0.5)" }}>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    扫码加入 QQ 群 214778070
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
