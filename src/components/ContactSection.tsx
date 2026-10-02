"use client";

import React from "react";
import { MessageSquare, Sparkles, ArrowUpRight } from "lucide-react";

interface ContactSectionProps {
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#173D35] text-[#F7F5F0] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#B49761]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2C564B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-gold/40 bg-white/5 text-xs tracking-widest text-brand-gold font-mono mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          START YOUR PROJECT
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight">
          你有自己的方法，我们把它做成产品。
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#F7F5F0]/80 max-w-2xl mx-auto leading-relaxed font-sans">
          告诉我们你的专业领域、喜欢的演示项目，以及想服务的客户。我们会在充分尊重流派仪轨的前提下，帮您构建独家数字系统。
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium bg-[#B49761] text-white hover:bg-brand-gold-hover transition-all shadow-hover transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4" />
            讨论我的项目
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#F7F5F0]/60">
          <span>一对一定制梳理</span>
          <span>•</span>
          <span>独立源码与数据归属</span>
          <span>•</span>
          <span>支持微信生态与独立域名</span>
        </div>
      </div>
    </section>
  );
};
