"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-12 sm:py-16 bg-[#F5F6F8] border-t border-brand-border">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-heading tracking-tight">
            简洁合作流程
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-muted">
            清晰高效推进，保障学术逻辑严谨性与系统可用性。
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {siteConfig.workflowSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-lg p-5 border border-brand-border shadow-card flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-brand-gold">
                  STEP {step.step}
                </span>
                <h3 className="text-sm sm:text-base font-sans font-semibold text-heading mt-1">
                  {step.title}
                </h3>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
