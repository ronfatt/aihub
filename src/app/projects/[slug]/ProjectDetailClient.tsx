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
import { Project } from "@/data/siteConfig";
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
    <div className="min-h-screen bg-[#111215] text-white flex flex-col selection:bg-palette-red selection:text-white">
      {/* Top Gallery Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-white/[0.08] bg-[#111215]/90 backdrop-blur-xl">
        <div className="max-w-exhibition mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-palette-muted hover:text-palette-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO EXHIBITION ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-palette-red text-white hover:bg-palette-redHover shadow-redGlow transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-palette-gold" />
              <span>定制类似系统</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16 space-y-10">
        {/* Project Header Card */}
        <div className="bg-[#181A20] rounded-2xl border border-white/[0.08] shadow-atelier overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Left Cover Preview */}
            <div className="lg:col-span-6 w-full">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <ProjectCover
                  title={project.title}
                  imageUrl={project.coverImage}
                  index={project.sortOrder || 1}
                />
                {project.coverImage && (
                  <button
                    onClick={() => setActiveImageModal(project.coverImage!)}
                    aria-label="查看全图"
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 text-white hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Meta & Actions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-palette-gold uppercase tracking-widest font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-palette-red" />
                  <span>DOSSIER // 0{project.sortOrder || 1} · INTERACTIVE</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
                  {project.title}
                </h1>

                <p className="text-xs sm:text-sm text-palette-muted font-sans leading-relaxed">
                  {project.description || "打开演示页面，亲自探索与体验"}
                </p>
              </div>

              {/* Functional tags if verified */}
              {hasVisibleTags && (
                <div className="pt-1">
                  <div className="text-[10px] font-mono text-palette-gold uppercase tracking-widest mb-2">
                    VERIFIED PROTOCOLS // 功能标签
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags
                      .filter((t) => t !== "待分类")
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] text-white/90 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-palette-red text-white hover:bg-palette-redHover shadow-redGlow transition-colors flex-1"
                >
                  <span>打开实际 DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-white/[0.04] text-white border border-palette-gold/40 hover:border-palette-gold hover:text-palette-gold transition-colors flex-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-palette-gold" />
                  <span>定制类似系统</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot Gallery Section */}
        {screenshots.length > 0 && (
          <section className="bg-[#181A20] rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-atelier">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-xl font-sans font-bold text-white flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-palette-red" />
                  页面真实截图画廊
                </h2>
                <p className="text-xs text-palette-muted font-mono mt-1">
                  EXHIBITION ARTIFACTS // 点击放大查看高清界面细节
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#14161C] cursor-pointer shadow-lg"
                  onClick={() => setActiveImageModal(s.url)}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#111215]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.url}
                      alt={s.alt || `${project.title} 截图 ${idx + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-[#1C1F27] border-t border-white/[0.06] flex items-center justify-between text-xs text-palette-muted">
                    <span className="truncate font-sans">{s.alt || `界面展示 0${idx + 1}`}</span>
                    <span className="text-palette-gold font-mono text-[11px] shrink-0 font-medium">
                      VIEW FULLSCREEN ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Suitable Scenarios (Only rendered if confirmed) */}
        {hasSuitableFor && (
          <section className="bg-[#181A20] rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-4 shadow-atelier">
            <h2 className="text-xl font-sans font-bold text-white flex items-center gap-2.5">
              <Users className="w-4 h-4 text-palette-gold" />
              适合哪些老师或服务场景
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {project.suitableFor!.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-palette-muted"
                >
                  <CheckCircle2 className="w-4 h-4 text-palette-red shrink-0 mt-0.5" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Customizable Directions */}
        {hasCustomDirections && (
          <section className="bg-gradient-to-br from-[#1A1D24] via-[#241316] to-[#121317] border border-palette-gold/30 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-palette-gold uppercase mb-1.5 font-bold">
                BESPOKE ROADMAP // 专属定制方向
              </div>
              <h2 className="text-2xl font-sans font-extrabold tracking-tight text-white">
                可讨论的专属定制方向
              </h2>
              <p className="text-xs text-palette-muted font-sans mt-1">
                注意：以下方向为基于该原型的可拓展定制建议，明确与该 Demo 的现有轻量功能区分。
              </p>
            </div>

            <div className="space-y-3">
              {project.customDirections!.map((dir, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                >
                  <span className="font-mono text-xs text-palette-gold font-bold pt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-palette-muted leading-relaxed font-sans">
                    {dir}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <span className="text-xs text-palette-muted font-sans">
                有您自己独特的学术体系或业务流程需求？
              </span>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-palette-red text-white hover:bg-palette-redHover shadow-redGlow transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-palette-gold" />
                <span>探讨我的定制方案</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Image Lightbox Modal */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveImageModal(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-[#181A20] border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
              aria-label="关闭预览"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImageModal}
              alt="全屏展品预览"
              className="max-h-[85vh] w-auto object-contain rounded-xl"
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
