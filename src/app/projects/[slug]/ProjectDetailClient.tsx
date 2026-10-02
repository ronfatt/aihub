"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Compass,
  CheckCircle2,
  ZoomIn,
  X,
  Layers,
  Users,
} from "lucide-react";
import { Project, siteConfig } from "@/data/siteConfig";
import { ProjectCover } from "@/components/ProjectCover";
import { ContactModal } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";

interface ProjectDetailClientProps {
  project: Project;
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  const hasVisibleTags = (project.tags || []).filter((t) => t !== "待分类").length > 0;
  const hasSuitableFor = (project.suitableFor || []).length > 0;
  const hasCustomDirections = (project.customDirections || []).length > 0;
  const screenshots = project.screenshots || [];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-brand-text flex flex-col selection:bg-brand-green selection:text-bg-warm">
      {/* Top Simple Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-brand-border/60 bg-[#F7F5F0]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-green hover:text-brand-gold transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回作品列表
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-brand-muted hidden sm:inline">
              {siteConfig.brandName}
            </span>
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              定制类似系统
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Project Header Card */}
        <div className="bg-white rounded-2xl border border-brand-border/80 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Left Cover Preview */}
            <div className="lg:col-span-6 w-full">
              <div className="rounded-xl overflow-hidden border border-brand-border/70 shadow-sm relative group">
                <ProjectCover
                  title={project.title}
                  pattern={project.coverPattern}
                  accentColor={project.accentColor}
                  imageUrl={project.coverImage}
                />
                {project.coverImage && (
                  <button
                    onClick={() => setActiveImageModal(project.coverImage!)}
                    aria-label="查看全图"
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Meta & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    演示项目 · 在线可用
                  </span>
                  {project.category && project.category !== "待分类" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs text-brand-muted bg-stone-100 border border-stone-200">
                      {project.category}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-medium text-brand-green tracking-tight">
                  {project.title}
                </h1>

                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  {project.description || "打开演示页面，亲自探索与体验"}
                </p>
              </div>

              {/* Functional tags if verified */}
              {hasVisibleTags && (
                <div className="pt-2">
                  <div className="text-xs text-brand-muted font-medium mb-2">已验证功能标签</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags
                      .filter((t) => t !== "待分类")
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 text-stone-700 border border-stone-200"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs flex-1"
                >
                  打开 Demo
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white text-brand-green border border-brand-green/30 hover:border-brand-green hover:bg-stone-50 transition-all flex-1"
                >
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  我想定制类似系统
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot Gallery Section */}
        {screenshots.length > 0 && (
          <section className="bg-white rounded-2xl border border-brand-border/80 p-6 sm:p-8 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <div>
                <h2 className="text-xl font-serif font-medium text-brand-green flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-gold" />
                  页面真实截图
                </h2>
                <p className="text-xs text-brand-muted mt-1">
                  真实线上页面截图展示，点击可放大查看细节
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden border border-brand-border/80 bg-stone-50 cursor-pointer shadow-xs"
                  onClick={() => setActiveImageModal(s.url)}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.url}
                      alt={s.alt || `${project.title} 截图 ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                    <span className="truncate">{s.alt || `界面展示 0${idx + 1}`}</span>
                    <span className="text-brand-gold font-mono text-[11px] shrink-0">
                      放大查看 ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Suitable Scenarios (Only rendered if confirmed) */}
        {hasSuitableFor && (
          <section className="bg-white rounded-2xl border border-brand-border/80 p-6 sm:p-8 space-y-4 shadow-subtle">
            <h2 className="text-xl font-serif font-medium text-brand-green flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-gold" />
              适合哪些老师或服务场景
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.suitableFor!.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-stone-50 border border-brand-border/60 text-xs sm:text-sm text-stone-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Customizable Directions (Clearly differentiated from existing features) */}
        {hasCustomDirections && (
          <section className="bg-[#173D35] text-[#F7F5F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-brand-gold/40 text-[11px] tracking-wider text-brand-gold font-mono mb-2 uppercase">
                Custom Roadmap Options
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-medium tracking-tight">
                可讨论的专属定制方向
              </h2>
              <p className="text-xs sm:text-sm text-[#F7F5F0]/70 mt-1">
                注意：以下为基于此原型为您量身打造独立系统时的拓展建议，明确与该 Demo 的现有轻量功能区分。
              </p>
            </div>

            <div className="space-y-3">
              {project.customDirections!.map((dir, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/50 transition-colors"
                >
                  <span className="font-mono text-xs text-brand-gold pt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#F7F5F0]/90 leading-relaxed">
                    {dir}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <span className="text-xs text-[#F7F5F0]/60">
                有您自己独特的断法体系或流程要求？
              </span>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#B49761] text-white hover:bg-[#9E824F] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                探讨我的定制方案
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Image Lightbox Modal */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveImageModal(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="关闭预览"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImageModal}
              alt="全图预览"
              className="max-h-[85vh] w-auto object-contain rounded"
            />
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialProjectTitle={project.title}
        initialProjectUrl={project.url}
      />

      <Footer />
    </div>
  );
};
