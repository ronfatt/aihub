"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
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
    <div className="min-h-screen bg-[#F5F6F8] text-heading flex flex-col selection:bg-brand-green selection:text-white">
      {/* Top Simple Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-brand-border bg-[#F5F6F8]/95 backdrop-blur-md">
        <div className="max-w-container mx-auto px-5 lg:px-16 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-heading hover:text-brand-green transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回作品列表
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-brand-green text-white hover:bg-brand-green-hover transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              定制类似系统
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-5 lg:px-16 py-8 sm:py-12 space-y-8">
        {/* Project Header Card */}
        <div className="bg-white rounded-lg border border-brand-border shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-6 sm:p-8">
            {/* Left Cover Preview with clean browser frame */}
            <div className="lg:col-span-6 w-full">
              <div className="rounded-lg overflow-hidden border border-brand-border shadow-xs relative group">
                <ProjectCover
                  title={project.title}
                  imageUrl={project.coverImage}
                />
                {project.coverImage && (
                  <button
                    onClick={() => setActiveImageModal(project.coverImage!)}
                    aria-label="查看全图"
                    className="absolute bottom-3 right-3 p-1.5 rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Meta & Actions */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-sans font-bold text-heading tracking-tight">
                  {project.title}
                </h1>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {project.description || "打开演示页面，亲自探索与体验"}
                </p>
              </div>

              {/* Functional tags if verified */}
              {hasVisibleTags && (
                <div className="pt-1">
                  <div className="text-[11px] text-muted font-medium mb-1.5">已验证功能标签</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags
                      .filter((t) => t !== "待分类")
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-brand-border flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-brand-green text-white hover:bg-brand-green-hover transition-colors shadow-xs flex-1"
                >
                  打开 Demo
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-heading border border-brand-border hover:bg-slate-50 transition-colors flex-1"
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
          <section className="bg-white rounded-lg border border-brand-border p-6 sm:p-7 space-y-5 shadow-card">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h2 className="text-lg font-sans font-bold text-heading flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-gold" />
                  页面真实截图
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  真实线上页面截图展示，点击可放大查看细节
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-lg overflow-hidden border border-brand-border bg-slate-50 cursor-pointer shadow-xs"
                  onClick={() => setActiveImageModal(s.url)}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.url}
                      alt={s.alt || `${project.title} 截图 ${idx + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2.5 bg-white border-t border-brand-border flex items-center justify-between text-xs text-muted">
                    <span className="truncate">{s.alt || `界面展示 0${idx + 1}`}</span>
                    <span className="text-brand-gold text-[11px] shrink-0 font-medium">
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
          <section className="bg-white rounded-lg border border-brand-border p-6 sm:p-7 space-y-4 shadow-card">
            <h2 className="text-lg font-sans font-bold text-heading flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-gold" />
              适合哪些老师或服务场景
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {project.suitableFor!.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-md bg-[#F5F6F8] border border-brand-border/60 text-xs sm:text-sm text-heading"
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
          <section className="bg-[#173D35] text-white rounded-lg p-6 sm:p-8 space-y-5 shadow-card">
            <div>
              <div className="text-[11px] tracking-wider text-brand-gold font-mono uppercase mb-1">
                Custom Roadmap
              </div>
              <h2 className="text-xl font-sans font-bold tracking-tight text-white">
                可讨论的专属定制方向
              </h2>
              <p className="text-xs text-white/70 mt-1">
                注意：以下为基于此原型为您量身打造独立系统时的拓展建议，明确与该 Demo 的现有功能区分。
              </p>
            </div>

            <div className="space-y-2.5">
              {project.customDirections!.map((dir, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-white/5 border border-white/10"
                >
                  <span className="font-mono text-xs text-brand-gold pt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {dir}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <span className="text-xs text-white/60">
                有您自己独特的学术体系或业务流程？
              </span>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-white text-[#173D35] hover:bg-slate-100 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
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
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
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
