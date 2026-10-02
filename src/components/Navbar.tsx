"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-[#F5F6F8]/90 backdrop-blur-md transition-all">
      <div className="max-w-container mx-auto px-5 lg:px-16 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <Link
          href="/"
          className="group flex flex-col justify-center focus:outline-none"
        >
          <span className="text-base sm:text-lg font-semibold tracking-tight text-heading">
            {siteConfig.brandName}
          </span>
          <span className="text-[11px] text-muted tracking-normal -mt-0.5 font-normal">
            {siteConfig.brandTagline}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <button
            onClick={() => scrollTo("projects")}
            className="text-sm text-heading/85 hover:text-heading transition-colors font-medium focus:outline-none"
          >
            演示作品
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="text-sm text-heading/85 hover:text-heading transition-colors font-medium focus:outline-none"
          >
            定制服务
          </button>
          <button
            onClick={() => scrollTo("workflow")}
            className="text-sm text-heading/85 hover:text-heading transition-colors font-medium focus:outline-none"
          >
            合作流程
          </button>
          <button
            onClick={() => onOpenContact()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-brand-green text-white hover:bg-brand-green-hover transition-colors shadow-xs"
          >
            联系开发
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            className="p-2 rounded-lg text-heading hover:bg-brand-border/40 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-white px-5 py-4 space-y-3 shadow-lg">
          <button
            onClick={() => scrollTo("projects")}
            className="w-full text-left py-2.5 text-sm font-medium text-heading hover:text-brand-green border-b border-brand-border/40"
          >
            演示作品
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="w-full text-left py-2.5 text-sm font-medium text-heading hover:text-brand-green border-b border-brand-border/40"
          >
            定制服务
          </button>
          <button
            onClick={() => scrollTo("workflow")}
            className="w-full text-left py-2.5 text-sm font-medium text-heading hover:text-brand-green border-b border-brand-border/40"
          >
            合作流程
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-brand-green text-white"
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
