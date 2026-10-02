"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { projectsData } from "@/data/siteConfig";

interface HeroProps {
  onOpenContact: (projectTitle?: string) => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onExploreProjects,
}) => {
  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-white/[0.08] overflow-hidden">
      {/* Ambient Red & Gold Haute Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-palette-redGlow rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-palette-goldLight rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Main Statement */}
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            {/* High-fashion Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-palette-gold/40 bg-palette-gold/10 text-[10px] font-mono tracking-widest text-palette-gold uppercase">
                <Sparkles className="w-3 h-3 text-palette-gold" />
                RMS DIGITAL EXPERIENCES
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-palette-muted tracking-wider">
                // CURATED EXHIBITION 2026
              </span>
            </div>

            {/* Powerful Display Typography in Pure White */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tighter text-white leading-[1.12]">
              为你的专业，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-palette-gold">
                打造专属数字体验。
              </span>
            </h1>

            {/* Refined Subtitle */}
            <p className="text-sm sm:text-base text-palette-muted leading-relaxed max-w-2xl font-sans">
              命理、风水与身心灵网页及 App 开发。
              <br className="hidden sm:inline" />
              浏览我们的演示作品，亲自体验你的品牌可以拥有的系统。
            </p>

            {/* Action Buttons in Red & Gold */}
            <div className="pt-2 flex flex-row items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreProjects}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase font-bold bg-palette-red text-white hover:bg-palette-redHover transition-all duration-200 shadow-redGlow"
              >
                <span>浏览演示作品</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenContact()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold bg-white/[0.04] text-white border border-palette-gold/40 hover:border-palette-gold hover:text-palette-gold transition-all duration-200 backdrop-blur-sm"
              >
                <span>联系开发</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-palette-gold" />
              </button>
            </div>
          </div>

          {/* Exhibition Specs in Dark Gray & Gold */}
          <div className="hidden lg:flex flex-col items-end text-right space-y-3 pb-2 select-none">
            <div className="p-4 rounded-xl border border-white/[0.09] bg-[#181A20] backdrop-blur-sm space-y-2 max-w-xs shadow-atelier">
              <div className="flex items-center justify-between text-[10px] font-mono text-palette-muted uppercase tracking-widest border-b border-white/[0.06] pb-2">
                <span>CURATION INDEX</span>
                <span className="text-palette-red font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-palette-red animate-pulse" />
                  {String(projectsData.length).padStart(2, "0")} LIVE PROTOTYPES
                </span>
              </div>
              <div className="text-[11px] font-mono text-palette-muted leading-relaxed text-left">
                ARCHIVE: SACRED SACRAMENTS, ASTROLOGY, I CHING, NUMEROLOGY &amp; MINDFULNESS.
              </div>
              <div className="text-[10px] font-mono text-palette-gold tracking-widest text-right pt-1 font-semibold">
                ALL SYSTEMS INTERACTIVE ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
