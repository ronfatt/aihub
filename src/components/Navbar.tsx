"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface NavbarProps {
  onOpenContact: (projectTitle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0A0C0E]/85 backdrop-blur-xl transition-all">
      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex flex-col justify-center focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-atelier-emerald animate-pulse" />
            <span className="text-sm sm:text-base font-sans font-bold tracking-tight text-white group-hover:text-atelier-emerald transition-colors">
              {siteConfig.brandName}
            </span>
          </div>
          <span className="text-[10px] font-mono text-atelier-muted tracking-widest uppercase -mt-0.5 pl-4">
            ATELIER // 命理与身心灵数字展厅
          </span>
        </Link>

        {/* Center Status Indicator (Fashion Studio Element) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-atelier-secondary">
          <span className="text-atelier-emerald">●</span>
          <span>EST. 2026 // OPEN FOR PRIVATE COMMISSIONS</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <button
            onClick={() => scrollTo("projects")}
            className="text-xs font-mono uppercase tracking-widest text-atelier-secondary hover:text-white transition-colors focus:outline-none flex items-center gap-1.5"
          >
            <span className="text-atelier-muted">01/</span>
            <span>演示作品</span>
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="text-xs font-mono uppercase tracking-widest text-atelier-secondary hover:text-white transition-colors focus:outline-none flex items-center gap-1.5"
          >
            <span className="text-atelier-muted">02/</span>
            <span>定制服务</span>
          </button>
          <button
            onClick={() => scrollTo("workflow")}
            className="text-xs font-mono uppercase tracking-widest text-atelier-secondary hover:text-white transition-colors focus:outline-none flex items-center gap-1.5"
          >
            <span className="text-atelier-muted">03/</span>
            <span>合作流程</span>
          </button>
          <button
            onClick={() => onOpenContact()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase font-semibold bg-white text-black hover:bg-atelier-emerald hover:text-black transition-all duration-200 shadow-glow"
          >
            <span>预约定制</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0E1115] px-6 py-5 space-y-4 shadow-2xl">
          <button
            onClick={() => scrollTo("projects")}
            className="w-full text-left py-2 text-xs font-mono uppercase tracking-widest text-atelier-secondary hover:text-white flex items-center justify-between border-b border-white/[0.06]"
          >
            <span>01 / 演示作品</span>
            <span className="text-atelier-muted">PROTOTYPES</span>
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="w-full text-left py-2 text-xs font-mono uppercase tracking-widest text-atelier-secondary hover:text-white flex items-center justify-between border-b border-white/[0.06]"
          >
            <span>02 / 定制服务</span>
            <span className="text-atelier-muted">CAPABILITIES</span>
          </button>
          <button
            onClick={() => scrollTo("workflow")}
            className="w-full text-left py-2 text-xs font-mono uppercase tracking-widest text-atelier-secondary hover:text-white flex items-center justify-between border-b border-white/[0.06]"
          >
            <span>03 / 合作流程</span>
            <span className="text-atelier-muted">PROTOCOL</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-mono tracking-wider uppercase font-semibold bg-white text-black hover:bg-atelier-emerald"
            >
              <Sparkles className="w-3.5 h-3.5 text-atelier-gold" />
              <span>讨论专属系统定制</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
