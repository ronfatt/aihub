"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ContactSectionProps {
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#1A1D24] via-[#241316] to-[#121317] border border-palette-gold/25 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Subtle Red & Gold Ambient Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-palette-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-palette-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-palette-gold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-palette-gold" />
              <span>ATELIER COMMISSIONS // 启动专属系统定制</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-white leading-tight">
              你有自己的方法，<br className="hidden sm:inline" />
              我们把它做成传世产品。
            </h2>

            <p className="text-xs sm:text-sm text-palette-muted font-sans leading-relaxed max-w-xl">
              告诉我们你的专业流派、喜欢的演示项目与核心求测群体。我们将在充分尊重师门传承与仪轨的前提下，为你构建独立自主的数字系统。
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase font-bold bg-palette-red text-white hover:bg-palette-redHover transition-all duration-200 shadow-redGlow"
            >
              <span>讨论我的项目</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
