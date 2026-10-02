"use client";

import React, { useState, useMemo } from "react";
import { Search, ExternalLink, SlidersHorizontal, Sparkles } from "lucide-react";
import { Project, projectsData } from "@/data/siteConfig";
import { ProjectCover } from "./ProjectCover";

interface ProjectsSectionProps {
  onCustomSimilar: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onCustomSimilar,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projectsData
      .filter((p) => p.visible)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .filter((project) => {
        if (!q) return true;
        return (
          project.title.toLowerCase().includes(q) ||
          (project.description && project.description.toLowerCase().includes(q))
        );
      });
  }, [searchQuery]);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#F7F5F0] border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-gold font-mono mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            SHOWCASE PORTFOLIO
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-green tracking-tight">
            探索我们的演示作品
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            点击进入独立演示页面，亲自体验各项功能。每个系统均为真实线上版本，支持手机与电脑端直接操作。
          </p>
        </div>

        {/* Search Bar & Counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-border/60">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            <input
              type="text"
              placeholder="按项目名称快速查找..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-text"
              >
                清空
              </button>
            )}
          </div>

          <div className="text-xs text-brand-muted font-mono flex items-center gap-2">
            <span>共收录 {projectsData.length} 个独立演示</span>
            <span className="text-brand-border">•</span>
            <span>当前显示 {filteredProjects.length} 个</span>
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project: Project) => {
              // Hide category if "待分类", and only display verified tags if any
              const hasVisibleCategory =
                project.category && project.category !== "待分类";
              const visibleTags = project.tags.filter((t) => t !== "待分类");

              return (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl border border-brand-border/90 shadow-card hover:shadow-hover hover:border-brand-gold/60 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Card Cover */}
                  <div className="relative">
                    <ProjectCover
                      title={project.title}
                      pattern={project.coverPattern}
                      accentColor={project.accentColor}
                      imageUrl={project.coverImage}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Status Badges & Category */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          演示项目
                        </span>

                        {hasVisibleCategory && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] text-brand-muted bg-stone-100 border border-stone-200">
                            {project.category}
                          </span>
                        )}

                        {visibleTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] text-brand-muted bg-stone-100 border border-stone-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-serif font-medium text-brand-green group-hover:text-brand-gold transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-2">
                        {project.description || "打开演示页面，亲自探索与体验"}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 mt-4 border-t border-brand-border/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      {/* Primary Link: Enter Experience */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs group/btn flex-1"
                        aria-label={`进入 ${project.title} 演示体验（将在新窗口打开）`}
                      >
                        进入体验
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>

                      {/* Secondary: Custom Similar System */}
                      <button
                        type="button"
                        onClick={() => onCustomSimilar(project.title)}
                        className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-stone-50 text-brand-text border border-brand-border hover:border-brand-gold hover:text-brand-green transition-all"
                        aria-label={`定制类似 ${project.title} 的系统`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                        定制类似系统
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-brand-border/80 p-8 max-w-lg mx-auto">
            <SlidersHorizontal className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h4 className="text-base font-serif font-medium text-brand-green">
              未找到与 “{searchQuery}” 相关的演示项目
            </h4>
            <p className="text-xs text-brand-muted mt-1.5 leading-relaxed">
              请尝试其他关键词，或清空搜索栏查看所有 8 个在线系统。
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors"
            >
              清空搜索条件
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
