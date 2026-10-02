"use client";

import React from "react";
import {
  Globe,
  Binary,
  FileSpreadsheet,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  ArrowRight,
  Info,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface ServicesSectionProps {
  onOpenContact: () => void;
}

const SERVICE_ICONS = [
  Globe,
  Binary,
  FileSpreadsheet,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-gold font-mono mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            BESPOKE DEVELOPMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-green tracking-tight">
            把你的专业，做成你的系统。
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            不论您深耕八字、紫微、风水易学，还是身心灵与西方神秘学，我们都可以将您的独门断法与咨询服务转化为独一无二的品牌数字资产。
          </p>
        </div>

        {/* 6 Core Directions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.serviceDirections.map((item, idx) => {
            const IconComponent = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <div
                key={item.title}
                className="group p-6 sm:p-7 rounded-2xl bg-[#F7F5F0] border border-brand-border/70 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-border/80 flex items-center justify-center text-brand-green group-hover:text-brand-gold group-hover:scale-105 transition-all mb-5">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-brand-green tracking-wide mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs text-brand-gold font-mono">
                  <span>DIRECTION 0{idx + 1}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    定制探讨 <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Clarification Notice as requested */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-brand-border/80 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-brand-muted leading-relaxed space-y-1">
            <span className="font-medium text-brand-green">重要说明：</span>
            <p>
              以上为可讨论的定制开发方向，具体功能与报价按项目范围确认。
              所展示的 8 个演示项目各自侧重不同的轻量体验切入点，并不代表其已全部具备上述全部后台与商业功能。
            </p>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-card"
          >
            与我们讨论您的定制需求
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
