"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles, Compass } from "lucide-react";
import { siteConfig, projectsData } from "@/data/siteConfig";

interface HeroProps {
  onOpenContact: (projectTitle?: string) => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onExploreProjects,
}) => {
  // Select 3 representative items for hero preview
  const previewItems = [
    projectsData.find((p) => p.id === "soulflow") || projectsData[0],
    projectsData.find((p) => p.id === "tianji52") || projectsData[2],
    projectsData.find((p) => p.id === "lucky7") || projectsData[1],
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 border-b border-brand-border/40">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-gold-light/40 text-[11px] sm:text-xs tracking-[0.2em] font-medium text-brand-green uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              DIGITAL EXPERIENCES FOR PRACTITIONERS
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-brand-green leading-[1.15]">
                {siteConfig.headline}
              </h1>
              <p className="text-lg sm:text-xl text-brand-text font-serif leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {siteConfig.subheadline}
              </p>
              <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {siteConfig.intro}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-all shadow-card hover:shadow-hover"
              >
                探索演示作品
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenContact()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium bg-white text-brand-green border border-brand-green/30 hover:border-brand-green hover:bg-stone-50 transition-all shadow-subtle"
              >
                讨论专属开发
                <ArrowUpRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>

            {/* Micro value badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span>独立云端部署 · 移动端优先</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span>不伪造虚假数据 · 真实点击体验</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span>支持私域品牌独立定制</span>
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Preview Cards */}
          <div className="lg:col-span-5 relative">
            {/* Desktop Staggered Layout */}
            <div className="hidden sm:block relative w-full h-[400px]">
              {/* Back Card (Lucky7) */}
              <div className="absolute top-0 right-0 w-[270px] bg-white border border-brand-border rounded-xl shadow-subtle p-4 transform rotate-6 translate-x-2 transition-transform hover:rotate-3 duration-300">
                <div className="h-28 rounded-lg bg-gradient-to-br from-[#1C423A] to-[#8C6A38] p-3 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-center text-[10px] tracking-wider text-amber-200">
                    <span>DEMO 02</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div className="font-serif text-base text-center font-medium">
                    {previewItems[2].title}
                  </div>
                  <div className="text-[9px] text-stone-300">VERCEL DEPLOYMENT</div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-brand-muted text-[11px]">演示项目</span>
                  <span className="text-brand-gold font-mono text-[11px]">交互体验</span>
                </div>
              </div>

              {/* Middle Card (天机52) */}
              <div className="absolute top-16 left-2 w-[280px] bg-white border border-brand-border rounded-xl shadow-card p-4 transform -rotate-3 transition-transform hover:rotate-0 duration-300 z-10">
                <div className="h-32 rounded-lg bg-gradient-to-br from-[#1B3B34] to-[#122A25] p-3 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-center text-[10px] tracking-wider text-amber-200">
                    <span>DEMO 03</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="font-serif text-lg text-center font-medium">
                    {previewItems[1].title}
                  </div>
                  <div className="text-[9px] text-stone-300">PROD SYSTEM</div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-brand-green font-medium text-[11px]">天机52 演示空间</span>
                  <span className="text-brand-gold font-mono text-[11px]">WEB/APP</span>
                </div>
              </div>

              {/* Front Main Card (SoulFlow) */}
              <div className="absolute top-36 right-6 w-[290px] bg-white border border-brand-gold/50 rounded-xl shadow-hover p-4 transform rotate-1 transition-transform hover:-translate-y-1 duration-300 z-20">
                <div className="h-36 rounded-lg bg-gradient-to-br from-[#173D35] via-[#2C4F46] to-[#0E2621] p-3.5 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] tracking-wider text-amber-200">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      FEATURED
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-serif text-xl font-medium tracking-wide">
                      {previewItems[0].title}
                    </h4>
                    <p className="text-[10px] text-stone-300 mt-1">
                      现代东方身心灵交互体验
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-300">
                    <span>RMS DESIGN</span>
                    <span className="text-brand-gold">在线体验 ↗</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-xs font-serif text-brand-green">
                    让专业排盘与解读具象化
                  </span>
                  <a
                    href={previewItems[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-gold hover:text-brand-green font-medium flex items-center gap-0.5"
                  >
                    直达 ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Simplified Single Showcase Card */}
            <div className="sm:hidden w-full max-w-sm mx-auto">
              <div className="bg-white border border-brand-gold/40 rounded-xl shadow-card p-4 space-y-3">
                <div className="h-40 rounded-lg bg-gradient-to-br from-[#173D35] via-[#244C42] to-[#0F2621] p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-center text-xs text-amber-200">
                    <span className="tracking-widest text-[10px]">RMS SHOWCASE</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30">
                      8 款在线演示
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-2xl font-medium">SoulFlow &amp; 天机52 等</div>
                    <div className="text-xs text-stone-300 mt-1">
                      点击即可进入独立系统亲自试用
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-400 flex justify-between">
                    <span>支持手机/平板/电脑</span>
                    <span className="text-brand-gold">全部真实可测 ↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
