import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} | ${siteConfig.brandTagline}`,
  description: `${siteConfig.headline} ${siteConfig.subheadline} ${siteConfig.intro}`,
  keywords: [
    "命理系统开发",
    "风水数字化",
    "身心灵App开发",
    "排盘系统",
    "命理官网定制",
    "RMS Digital Experiences",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#173D35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans selection:bg-brand-green selection:text-bg-warm">
        {children}
      </body>
    </html>
  );
}
