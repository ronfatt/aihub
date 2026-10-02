"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, ArrowRight, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Project, projectsData } from "@/data/siteConfig";
import { ProjectCover } from "./ProjectCover";

interface ProjectsSectionProps {
  initialProjects?: Project[];
  onCustomSimilar?: (projectTitle: string, projectUrl?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  initialProjects = projectsData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return initialProjects
      .filter((p) => p.visible)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .filter((project) => {
        if (!q) return true;
        return (
          project.title.toLowerCase().includes(q) ||
          project.slug.toLowerCase().includes(q) ||
          (project.description && project.description.toLowerCase().includes(q))
        );
      });
  }, [searchQuery, initialProjects]);

  return (
    <section id="projects" className="py-12 sm:py-16 border-b border-white/[0.08]">
      <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12">
        {/* Curatorial Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-palette-gold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-palette-red animate-pulse" />
              <span>INTERACTIVE PROTOTYPE GALLERY // 数字展厅</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-white tracking-tight">
              可直接体验的数字作品
            </h2>
            <p className="text-xs sm:text-sm text-palette-muted font-sans max-w-xl">
              点击进入独立演示页面体验完整交互，所有项目均为真实线上运行版本。
            </p>
          </div>

          {/* Search & View Mode Switch */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-lg border border-white/[0.08] bg-[#181A20]">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="网格视图"
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-palette-gold/20 text-palette-gold font-bold"
                    : "text-palette-muted hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase">GRID</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="列表视图"
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  viewMode === "list"
                    ? "bg-palette-gold/20 text-palette-gold font-bold"
                    : "text-palette-muted hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase">INDEX</span>
              </button>
            </div>

            {/* Monospaced Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-palette-muted" />
              <input
                type="text"
                placeholder="搜索展品名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-lg border border-white/[0.1] bg-[#181A20] text-white placeholder:text-palette-muted/80 focus:outline-none focus:border-palette-gold focus:ring-1 focus:ring-palette-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-palette-gold hover:text-white"
                >
                  [CLEAR]
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GALLERY DISPLAY */}
        {filteredProjects.length > 0 ? (
          viewMode === "grid" ? (
            /* Grid View (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project: Project, idx: number) => {
                const indexStr = String(idx + 1).padStart(2, "0");
                return (
                  <div
                    key={project.id}
                    className="group relative bg-[#181A20] rounded-xl border border-white/[0.08] hover:border-palette-gold/50 transition-all duration-300 shadow-atelier flex flex-col overflow-hidden"
                  >
                    {/* Cover Art in Museum Frame */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block focus:outline-none"
                      title={`查看 ${project.title} 展品档案`}
                    >
                      <ProjectCover
                        title={project.title}
                        imageUrl={project.coverImage}
                        index={idx + 1}
                      />
                    </Link>

                    {/* Metadata & Actions */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-palette-gold font-bold">
                            ARCHIVE // {indexStr}
                          </span>
                          <span className="text-palette-red font-medium">LIVE DEMO</span>
                        </div>

                        <Link href={`/projects/${project.slug}`}>
                          <h3 className="text-lg sm:text-xl font-sans font-bold text-white group-hover:text-palette-gold transition-colors tracking-tight">
                            {project.title}
                          </h3>
                        </Link>

                        <p className="text-xs sm:text-sm text-palette-muted font-sans leading-relaxed line-clamp-2">
                          {project.description || "打开演示页面，亲自探索与体验"}
                        </p>
                      </div>

                      {/* Red + Gold Action Row */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2.5">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-palette-red text-white hover:bg-palette-redHover transition-colors shadow-redGlow flex-1"
                          aria-label={`打开体验 ${project.title}（新窗口）`}
                        >
                          <span>打开体验</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold bg-white/[0.04] text-white border border-white/10 hover:border-palette-gold/50 hover:text-palette-gold transition-colors"
                          aria-label={`查看 ${project.title} 介绍`}
                        >
                          <span>介绍</span>
                          <ArrowRight className="w-3.5 h-3.5 text-palette-gold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Index List View */
            <div className="border border-white/[0.08] rounded-xl overflow-hidden divide-y divide-white/[0.06] bg-[#181A20]">
              {filteredProjects.map((project: Project, idx: number) => {
                const indexStr = String(idx + 1).padStart(2, "0");
                return (
                  <div
                    key={project.id}
                    className="group p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span className="font-mono text-xs text-palette-gold font-bold shrink-0">
                        {indexStr}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-base sm:text-lg font-bold text-white group-hover:text-palette-gold transition-colors truncate block"
                        >
                          {project.title}
                        </Link>
                        <p className="text-xs text-palette-muted truncate font-sans mt-0.5">
                          {project.description || "打开演示页面，亲自探索与体验"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider text-palette-muted hover:text-palette-gold border border-white/10 hover:border-palette-gold/40"
                      >
                        档案详情
                      </Link>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-mono uppercase tracking-wider font-bold bg-palette-red text-white hover:bg-palette-redHover shadow-redGlow"
                      >
                        <span>进入系统</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center rounded-xl border border-dashed border-white/15 p-8 max-w-md mx-auto bg-[#181A20]">
            <SlidersHorizontal className="w-8 h-8 text-palette-muted mx-auto mb-3" />
            <h4 className="text-sm font-mono uppercase tracking-widest text-white">
              NO EXHIBITS FOUND // 未找到匹配展品
            </h4>
            <p className="text-xs text-palette-muted mt-1.5 font-sans leading-relaxed">
              请检查关键词 “{searchQuery}”，或重置检索查看完整收录系统。
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-palette-red text-white hover:bg-palette-redHover shadow-redGlow"
            >
              RESET ARCHIVE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
