"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090B] py-12 sm:py-16 text-xs text-atelier-secondary">
      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Colophon branding */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-atelier-emerald" />
              <h3 className="font-sans font-bold text-sm text-white tracking-tight">
                {siteConfig.brandName}
              </h3>
            </div>
            <p className="text-[11px] font-mono tracking-widest text-atelier-gold uppercase">
              DIGITAL EXPERIENCES FOR PRACTITIONERS &amp; MASTERS
            </p>
            <p className="text-xs text-atelier-muted leading-relaxed max-w-md font-sans">
              为东方玄学、易经风水、紫微星盘与身心灵导师打造不可复制的独立数字殿堂与交互原型。
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5 font-mono text-[11px]">
            <div className="text-white/40 uppercase tracking-widest text-[10px]">
              INDEX // 快捷直达
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/#projects" className="hover:text-white transition-colors">
                  01 // 演示作品 (EXHIBITION)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  02 // 定制方向 (CAPABILITIES)
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="hover:text-white transition-colors">
                  03 // 合作流程 (PROTOCOL)
                </Link>
              </li>
            </ul>
          </div>

          {/* Cultural Note */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-white/40 font-mono uppercase tracking-widest text-[10px]">
              DISCLAIMER // 文化探索声明
            </div>
            <p className="text-xs text-atelier-muted leading-relaxed font-sans">
              {siteConfig.disclaimer}
            </p>
            <p className="text-[10px] font-mono text-white/30 pt-1">
              PROTOTYPES FOR DEMONSTRATION &amp; PRIVATE COMMISSION EXPLORATION.
            </p>
          </div>
        </div>

        {/* Studio Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-atelier-muted">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandName}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest">
            <span>TOKYO</span>
            <span>·</span>
            <span>SHANGHAI</span>
            <span>·</span>
            <span>SINGAPORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
