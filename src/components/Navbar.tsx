"use client";

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-brand-border/60 bg-[#F7F5F0]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand logo & subtitle */}
        <a
          href="#"
          className="group flex flex-col justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-green rounded"
        >
          <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-brand-green group-hover:text-brand-gold transition-colors">
            {siteConfig.brandName}
          </span>
          <span className="text-[11px] text-brand-muted tracking-wider -mt-0.5">
            {siteConfig.brandTagline}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo("projects")}
            className="text-sm text-brand-text hover:text-brand-green transition-colors font-normal py-1 focus:outline-none"
          >
            演示作品
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="text-sm text-brand-text hover:text-brand-green transition-colors font-normal py-1 focus:outline-none"
          >
            定制服务
          </button>
          <button
            onClick={() => scrollTo("workflow")}
            className="text-sm text-brand-text hover:text-brand-green transition-colors font-normal py-1 focus:outline-none"
          >
            合作流程
          </button>
          <button
            onClick={() => onOpenContact()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs"
          >
            联系开发
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            className="p-2 rounded-xl text-brand-green hover:bg-brand-border/40 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border/80 bg-[#F7F5F0] px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <button
            onClick={() => scrollTo("projects")}
            className="w-full text-left py-2.5 text-sm font-medium text-brand-text hover:text-brand-green border-b border-brand-border/40"
          >
            演示作品
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="w-full text-left py-2.5 text-sm font-medium text-brand-text hover:text-brand-green border-b border-brand-border/40"
          >
            定制服务
          </button>
          <button
            onClick={() => scrollTo("workflow")}
            className="w-full text-left py-2.5 text-sm font-medium text-brand-text hover:text-brand-green border-b border-brand-border/40"
          >
            合作流程
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-brand-green text-bg-warm"
            >
              联系开发
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
