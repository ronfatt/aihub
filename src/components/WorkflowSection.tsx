"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-palette-gold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-palette-red animate-pulse" />
            <span>COLLABORATION PROTOCOL // 合作流程</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-white tracking-tight">
            清晰高效的推进流程
          </h2>
          <p className="text-xs sm:text-sm text-palette-muted font-sans leading-relaxed">
            分阶段严格推进，兼顾学术逻辑严谨性、数字视觉审美与工程交付质量。
          </p>
        </div>

        {/* 4 Architectural Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.workflowSteps.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-[#181A20] rounded-xl p-6 border border-white/[0.08] hover:border-palette-gold/40 transition-all shadow-atelier flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-3">
                  <span className="text-palette-gold font-bold">
                    PHASE 0{idx + 1}
                  </span>
                  <span className="text-palette-red font-mono font-medium">
                    STEP {step.step}
                  </span>
                </div>

                <h3 className="text-base font-sans font-bold text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-palette-muted leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest pt-2">
                VERIFIED ARCHITECTURE
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
