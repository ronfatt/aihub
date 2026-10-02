"use client";

import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onOpenContact: (projectTitle?: string) => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onExploreProjects,
}) => {
  return (
    <section className="relative pt-10 pb-10 sm:pt-14 sm:pb-12 border-b border-brand-border bg-[#F5F6F8]">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Small eyebrow */}
          <div className="text-xs tracking-[0.18em] font-medium text-muted uppercase">
            RMS DIGITAL EXPERIENCES
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-bold tracking-tight text-heading leading-[1.18]">
            为你的专业，<br />
            打造专属数字体验。
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
            命理、风水与身心灵网页及 App 开发。
            <br className="hidden sm:inline" />
            浏览我们的演示作品，亲自体验你的品牌可以拥有的系统。
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-row items-center gap-3">
            <button
              type="button"
              onClick={onExploreProjects}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-brand-green text-white hover:bg-brand-green-hover transition-colors shadow-xs"
            >
              浏览演示作品
              <ArrowDown className="w-4 h-4 opacity-80" />
            </button>

            <button
              type="button"
              onClick={() => onOpenContact()}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-heading border border-brand-border hover:border-slate-400 hover:bg-slate-50 transition-colors shadow-xs"
            >
              联系开发
              <ArrowUpRight className="w-4 h-4 text-brand-gold opacity-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
