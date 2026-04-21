import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberTruckAI - URL创建API",
  description: "通过URL轻松创建和部署AI API服务",
};

function getThemeClass(cookieValue?: string) {
  if (!cookieValue) return undefined;

  const normalized = cookieValue.trim().toLowerCase();

  if (["dark", "theme-dark", "dark-mode"].includes(normalized)) {
    return "dark";
  }

  if (["light", "theme-light", "light-mode"].includes(normalized)) {
    return "light";
  }

  return undefined;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeClass = getThemeClass(
    cookieStore.get("theme")?.value ??
      cookieStore.get("color-theme")?.value ??
      cookieStore.get("colorMode")?.value ??
      cookieStore.get("appearance")?.value,
  );

  return (
    <html lang="zh" className={themeClass} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
