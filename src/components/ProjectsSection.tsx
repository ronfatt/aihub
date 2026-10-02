"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, SlidersHorizontal, ArrowRight } from "lucide-react";
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
    <section id="projects" className="py-10 sm:py-14 bg-[#F5F6F8]">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        {/* Section Header: Title and Search in one row on desktop */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-brand-border">
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-heading tracking-tight">
              可直接体验的数字作品
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              点击进入独立演示页面体验完整交互，所有项目均为真实线上版本。
            </p>
          </div>

          {/* Search bar aligned with title */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="按作品名称查找..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-lg border border-brand-border bg-white text-heading placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-heading"
              >
                清空
              </button>
            )}
          </div>
        </div>

        {/* Project Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="group bg-white rounded-lg border border-brand-border hover:border-slate-300 transition-all duration-200 shadow-card hover:shadow-hover flex flex-col overflow-hidden"
              >
                {/* 16:10 Cover with clean browser frame */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="block focus:outline-none"
                  title={`查看 ${project.title} 详情`}
                >
                  <ProjectCover
                    title={project.title}
                    imageUrl={project.coverImage}
                  />
                </Link>

                {/* Content: Title, description, and 2 clean buttons */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-base sm:text-lg font-sans font-semibold text-heading group-hover:text-brand-green transition-colors">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                      {project.description || "打开演示页面，亲自探索与体验"}
                    </p>
                  </div>

                  {/* Clean 2-button action row (Primary: Enter, Secondary: Details) */}
                  <div className="pt-3 border-t border-brand-border/60 flex items-center gap-2.5">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-brand-green text-white hover:bg-brand-green-hover transition-colors flex-1"
                      aria-label={`打开体验 ${project.title}（新窗口）`}
                    >
                      打开体验
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-slate-50 text-heading border border-brand-border hover:bg-slate-100 transition-colors"
                      aria-label={`查看 ${project.title} 介绍`}
                    >
                      查看介绍
                      <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-lg border border-dashed border-brand-border p-8 max-w-md mx-auto">
            <SlidersHorizontal className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-heading">
              未找到与 “{searchQuery}” 相关的作品
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              请检查关键词，或清空搜索栏查看全部在线作品。
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-brand-green text-white hover:bg-brand-green-hover transition-colors"
            >
              清空搜索
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
