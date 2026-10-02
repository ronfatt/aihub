"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EBEEF2] text-heading border-t border-brand-border py-10 sm:py-12">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-brand-border/60">
          {/* Brand Info */}
          <div className="space-y-2 max-w-sm">
            <h3 className="text-base font-semibold text-heading">
              {siteConfig.brandName}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              命理与身心灵数字产品演示中心。专注为文化学者与导师打造独立品牌系统与交互原型。
            </p>
          </div>

          {/* Links & Statement */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-heading text-[11px] uppercase tracking-wider">
                快捷直达
              </span>
              <ul className="space-y-1.5 text-muted">
                <li>
                  <Link href="/#projects" className="hover:text-heading transition-colors">
                    演示作品
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-heading transition-colors">
                    定制方向
                  </Link>
                </li>
                <li>
                  <Link href="/#workflow" className="hover:text-heading transition-colors">
                    合作流程
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2 max-w-xs">
              <span className="font-semibold text-heading text-[11px] uppercase tracking-wider">
                文化探索说明
              </span>
              <p className="text-muted leading-relaxed text-xs">
                {siteConfig.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-3">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandName}. 保留所有权利。
          </div>
          <div className="text-[11px] font-mono">
            MODERN DIGITAL EXPERIENCES
          </div>
        </div>
      </div>
    </footer>
  );
};
