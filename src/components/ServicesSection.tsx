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
    <section id="services" className="py-12 sm:py-16 bg-white border-t border-brand-border">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-heading tracking-tight">
            可定制的开发方向
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
            将独家断法排盘、测算流程与服务体系转化为专属数字产品。
          </p>
        </div>

        {/* 6 Clean compact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.serviceDirections.map((item, idx) => {
            const IconComponent = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <div
                key={item.title}
                className="p-5 rounded-lg bg-[#F5F6F8] border border-brand-border/80 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white border border-brand-border flex items-center justify-center text-brand-green shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-sans font-semibold text-heading">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Clarification Notice */}
        <div className="mt-6 p-3.5 rounded-lg bg-[#F5F6F8] border border-brand-border text-xs text-muted flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
          <span>
            以上为可讨论的定制开发方向，具体功能与报价按项目范围确认。演示作品不暗示已具备上述全部功能。
          </span>
        </div>
      </div>
    </section>
  );
};
