"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/GlowCard";

interface ContactItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  placeholder: string;
  recommended?: boolean;
}

function QQIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 11c-.83 0-1.5-.67-1.5-1.5S7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11zm5 0c-.83 0-1.5-.67-1.5-1.5S12.67 8 13.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5.5 7c2.5 0 4.5-1.5 5.5-3.5.5 0 1-.5 1-1s-.5-1-1-1c-1 0-2 .5-2.5 1.5-.5-1-1.5-1.5-2.5-1.5-3 0-5.5 2.5-5.5 5 0 1.5 1 3 2.5 4 1 .5 2 1 2.5 1 .5 0 1-.5 1-1s-.5-1-1-1c-.5-.5-1-1.5-1-2.5 0-.17.02-.33.05-.5-.5.5-1 1-1.5 1.5zm11 0c2.5 0 4.5-1.5 5.5-3.5.5 0 1-.5 1-1s-.5-1-1-1c-1 0-2 .5-2.5 1.5-.5-1-1.5-1.5-2.5-1.5-3 0-5.5 2.5-5.5 5 0 1.5 1 3 2.5 4 1 .5 2 1 2.5 1 .5 0 1-.5 1-1s-.5-1-1-1c-.5-.5-1-1.5-1-2.5 0-.17.02-.33.05-.5-.5.5-1 1-1.5 1.5z"/>
    </svg>
  );
}

function WeChatPublicIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-2 3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-4z"/>
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
  const [selectedName, setSelectedName] = useState<string>("");

  const contactItems: ContactItem[] = [
    {
      name: "QQ 群",
      description: "加入技术交流群，与开发者畅聊",
      icon: <QQIcon />,
      placeholder: "/qr-qq.jpg",
      recommended: true,
    },
    {
      name: "微信群",
      description: "扫码加入微信群，获取最新资讯",
      icon: <WeChatIcon />,
      placeholder: "/qr-wechat.jpg",
      recommended: true,
    },
    {
      name: "微信公众号",
      description: "关注公众号，获取更新通知",
      icon: <WeChatPublicIcon />,
      placeholder: "/qr-msg.jpg",
    },
  ];

  const handleImageClick = (src: string, name: string) => {
    setSelectedImage(src);
    setSelectedName(name);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedName("");
  };

  return (
    <>
      <section className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20 max-w-xl">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full border mb-5" style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}>
              Contact
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              加入社区
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
              扫描下方二维码加入我们的社区，与志同道合的开发者一起交流
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contactItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
              >
                <GlowCard className="p-6 md:p-8 flex flex-col items-center text-center h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: 'oklch(65% 0.18 145 / 0.15)',
                      color: 'var(--primary)'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    {item.recommended && (
                      <span
                        className="text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'oklch(65% 0.18 145 / 0.2)',
                          color: 'var(--primary)'
                        }}
                      >
                        推荐
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-6 flex-grow" style={{ color: 'var(--foreground-muted)' }}>
                    {item.description}
                  </p>
                  <div
                    className="w-36 h-36 rounded-2xl flex items-center justify-center border-2 border-dashed relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-panel-subtle)' }}
                    onClick={() => handleImageClick(item.placeholder, item.name)}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                      <QRIcon />
                      <span className="text-[10px] mt-2 uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
                        二维码
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={item.placeholder}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'oklch(0% 0 0 / 0.6)', color: 'var(--foreground)' }}
                      >
                        <ZoomInIcon />
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
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
            style={{ backgroundColor: 'oklch(0% 0 0 / 0.85)', backdropFilter: 'blur(8px)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: 'oklch(100% 0 0 / 0.1)', color: 'var(--foreground)' }}
              >
                <CloseIcon />
              </button>
              <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--background-raised)' }}>
                <img
                  src={selectedImage}
                  alt={selectedName}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center" style={{ backgroundColor: 'oklch(0% 0 0 / 0.5)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    扫码加入 {selectedName}
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