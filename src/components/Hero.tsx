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
      {/* Ambient Gallery Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-atelier-emeraldGlow rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-atelier-goldLight rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Main Statement */}
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            {/* High-fashion Eyebrow with Monospaced Coordinates */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-atelier-gold/40 bg-atelier-gold/10 text-[10px] font-mono tracking-widest text-atelier-gold uppercase">
                <Sparkles className="w-3 h-3 text-atelier-gold" />
                RMS DIGITAL EXPERIENCES
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-atelier-muted tracking-wider">
                // CURATED EXHIBITION 2026
              </span>
            </div>

            {/* Powerful Display Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tighter text-white leading-[1.12]">
              为你的专业，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-atelier-secondary">
                打造专属数字体验。
              </span>
            </h1>

            {/* Refined Editorial Subtitle */}
            <p className="text-sm sm:text-base text-atelier-secondary leading-relaxed max-w-2xl font-sans">
              命理、风水与身心灵网页及 App 开发。
              <br className="hidden sm:inline" />
              浏览我们的演示作品，亲自体验你的品牌可以拥有的系统。
            </p>

            {/* Tactile Action Buttons */}
            <div className="pt-2 flex flex-row items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreProjects}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold bg-white text-black hover:bg-atelier-emerald hover:text-black transition-all duration-200 shadow-glow"
              >
                <span>浏览演示作品</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenContact()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold bg-white/[0.04] text-white border border-white/20 hover:border-atelier-gold hover:text-atelier-gold transition-all duration-200 backdrop-blur-sm"
              >
                <span>联系开发</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Exhibition Specs / Coordinates Box (Right Column on Desktop) */}
          <div className="hidden lg:flex flex-col items-end text-right space-y-3 pb-2 select-none">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm space-y-2 max-w-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-atelier-muted uppercase tracking-widest border-b border-white/[0.06] pb-2">
                <span>CURATION INDEX</span>
                <span className="text-atelier-emerald">{String(projectsData.length).padStart(2, "0")} LIVE PROTOTYPES</span>
              </div>
              <div className="text-[11px] font-mono text-atelier-secondary leading-relaxed text-left">
                ARCHIVE: SACRED SACRAMENTS, ASTROLOGY, I CHING, NUMEROLOGY &amp; MINDFULNESS.
              </div>
              <div className="text-[10px] font-mono text-atelier-gold tracking-widest text-right pt-1">
                ALL SYSTEMS INTERACTIVE ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
