"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#102722] text-[#EFECE4] border-t border-[#1C423A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-serif text-xl font-medium tracking-wide text-[#F7F5F0]">
              {siteConfig.brandName}
            </h3>
            <p className="text-sm text-[#B49761] font-serif">
              命理 · 风水 · 身心灵数字应用开发
            </p>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed pt-1">
              专注为传统文化学者、命理研习者及身心灵疗愈导师打造独立品牌官网、自动化排盘与交互演示系统。
            </p>
          </div>

          {/* Quick Nav & Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-mono text-stone-400 uppercase tracking-wider mb-2">
              导航直达
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#projects"
                  className="text-stone-300 hover:text-brand-gold transition-colors"
                >
                  演示作品（8 款）
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-stone-300 hover:text-brand-gold transition-colors"
                >
                  定制开发方向
                </a>
              </li>
              <li>
                <a
                  href="#workflow"
                  className="text-stone-300 hover:text-brand-gold transition-colors"
                >
                  合作流程
                </a>
              </li>
            </ul>
          </div>

          {/* Statement & Culture Note */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-mono text-stone-400 uppercase tracking-wider mb-2">
              文化探索声明
            </div>
            <p className="text-stone-400 leading-relaxed">
              {siteConfig.disclaimer}
            </p>
            <p className="text-[11px] text-stone-500 pt-2">
              本站所有演示均为实际技术功能原型，用于老师亲测与定制方案讨论。
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandName}. 保留所有权利。
          </div>
          <div className="text-[11px] text-stone-400">
            现代东方 · 精品数字体验设计
          </div>
        </div>
      </div>
    </footer>
  );
};
