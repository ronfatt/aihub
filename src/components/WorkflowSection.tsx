"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight } from "lucide-react";

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-16 sm:py-24 bg-[#F7F5F0] border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-gold font-mono mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            CLEAR COLLABORATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-green tracking-tight">
            清晰高效的合作流程
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            从学术逻辑整理到系统正式上线，分阶段推进，保障学术严谨性与产品交付质感。
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.workflowSteps.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-brand-border/80 shadow-subtle flex flex-col justify-between"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-light text-brand-gold">
                    {step.step}
                  </span>
                  {idx < siteConfig.workflowSteps.length - 1 && (
                    <span className="hidden lg:block text-stone-300">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-serif font-medium text-brand-green mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border/40 text-[11px] text-stone-400 font-mono">
                PHASE 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
