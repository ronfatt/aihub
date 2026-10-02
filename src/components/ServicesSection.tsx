"use client";

import React from "react";
import {
  Globe,
  Binary,
  FileSpreadsheet,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Info,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const SERVICE_ICONS = [
  Globe,
  Binary,
  FileSpreadsheet,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 sm:py-20 border-b border-white/[0.08] relative">
      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Masthead */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-atelier-gold uppercase">
            <Sparkles className="w-3 h-3 text-atelier-gold" />
            <span>ATELIER CAPABILITIES // 专业定制方向</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-white tracking-tight">
            把你的专业，做成你的系统。
          </h2>
          <p className="text-xs sm:text-sm text-atelier-secondary font-sans leading-relaxed">
            将独家断法排盘、测算流程与服务体系转化为专属品牌数字资产。
          </p>
        </div>

        {/* 6 Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {siteConfig.serviceDirections.map((item, idx) => {
            const IconComponent = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            const numStr = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={item.title}
                className="relative p-6 rounded-xl bg-[#13161B] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-atelier group"
              >
                {/* Micro corner accent */}
                <span className="absolute top-2.5 right-3 text-[10px] font-mono text-white/20 group-hover:text-atelier-emerald transition-colors">
                  +
                </span>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-atelier-emerald group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[11px] text-atelier-gold font-medium">
                      DIR // {numStr}
                    </span>
                  </div>

                  <h3 className="text-base font-sans font-bold text-white group-hover:text-atelier-emerald transition-colors tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-atelier-secondary leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] text-[10px] font-mono text-atelier-muted uppercase tracking-wider flex items-center justify-between">
                  <span>BESPOKE ROADMAP</span>
                  <span className="text-white/40">AVAILABLE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Disclosure Note */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-atelier-secondary flex items-start gap-3">
          <Info className="w-4 h-4 text-atelier-gold shrink-0 mt-0.5" />
          <span className="leading-relaxed font-sans">
            说明：以上为可讨论的定制开发方向，具体功能与报价按项目范围确认。演示作品不暗示已具备上述全部功能。
          </span>
        </div>
      </div>
    </section>
  );
};
