"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactSectionProps {
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <section id="contact" className="py-12 sm:py-16 bg-white border-t border-brand-border">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="rounded-xl bg-[#173D35] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-card">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">
              联系开发
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              告诉我们你的专业领域、喜欢的演示项目与想服务的客户，共同探讨专属品牌系统。
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-white text-[#173D35] hover:bg-slate-100 transition-colors shadow-xs"
            >
              讨论我的项目
              <ArrowUpRight className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
