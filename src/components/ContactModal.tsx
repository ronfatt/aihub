"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Send, Sparkles, MessageSquare } from "lucide-react";
import { siteConfig, projectsData } from "@/data/siteConfig";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectTitle?: string;
}

const DOMAIN_OPTIONS = [
  "八字命理",
  "紫微斗数",
  "玄空风水 / 堪舆",
  "六爻 / 奇门遁甲 / 梅花易数",
  "姓名学 / 数字能量",
  "西方占星 / 塔罗牌",
  "身心灵 / 颂钵冥想 / 疗愈",
  "综合传统文化体系",
  "其他",
];

const FEATURE_OPTIONS = [
  "自动化精准排盘算法",
  "案主档案与咨询记录归档",
  "线上深度解读报告生成与导出",
  "品牌官网与形象展示入口",
  "预约排期与咨询须知流程",
  "弟子传承 / 会员专栏 / 音频课程",
  "测算互动小工具引流",
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialProjectTitle = "",
}) => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedDemo, setSelectedDemo] = useState(initialProjectTitle);
  const [customFeature, setCustomFeature] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const initialFocusRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync initial project title when opened
  useEffect(() => {
    if (initialProjectTitle) {
      setSelectedDemo(initialProjectTitle);
    }
  }, [initialProjectTitle]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle focus when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "unset";
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  // Compile formatted inquiry text
  const combinedFeatures = [
    ...selectedFeatures,
    ...(customFeature.trim() ? [customFeature.trim()] : []),
  ];

  const generatedInquiryText = `【RMS 专属数字系统定制咨询】
您好！我想了解命理/身心灵专属数字系统定制开发：
· 我的称呼：${name.trim() || "老师/主理人"}
· 专业领域：${domain || "未选择（待沟通）"}
· 参考演示项目：${selectedDemo || "待定 / 整体咨询"}
· 期望核心功能：${combinedFeatures.length > 0 ? combinedFeatures.join("、") : "探讨专属定制方案"}

希望进一步探讨开发范围与实现方案。`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedInquiryText);
      } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = generatedInquiryText;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch (err) {
      console.error("复制失败", err);
    }
  };

  // Check if WhatsApp is configured
  const hasWhatsApp = Boolean(siteConfig.whatsappNumber && siteConfig.whatsappNumber.trim());
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        generatedInquiryText
      )}`
    : "#";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#173D35]/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F7F5F0] border border-brand-border rounded-2xl shadow-modal flex flex-col text-brand-text animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-brand-border/70 bg-[#F7F5F0]/95 backdrop-blur-sm">
          <div>
            <h3
              id="contact-modal-title"
              className="text-lg sm:text-xl font-serif font-medium text-brand-green tracking-wide"
            >
              讨论专属数字系统定制
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              填写您的专业偏好，即可一键生成结构化咨询方案
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭面板"
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-green hover:bg-brand-border/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Step 1: Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brand-green mb-1.5">
                您的称呼 / 堂号 / 品牌
              </label>
              <input
                ref={initialFocusRef}
                type="text"
                placeholder="例如：陈老师、玄真堂"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-green mb-1.5">
                参考的演示 Demo
              </label>
              <select
                value={selectedDemo}
                onChange={(e) => setSelectedDemo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
              >
                <option value="">未确定（全案交流）</option>
                {projectsData.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 2: Domain selection */}
          <div>
            <label className="block text-xs font-medium text-brand-green mb-2">
              专业领域分类
            </label>
            <div className="flex flex-wrap gap-2">
              {DOMAIN_OPTIONS.map((item) => {
                const isSelected = domain === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDomain(isSelected ? "" : item)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      isSelected
                        ? "bg-brand-green text-bg-warm border-brand-green font-medium shadow-xs"
                        : "bg-white text-brand-text border-brand-border hover:border-brand-green/60"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Desired features */}
          <div>
            <label className="block text-xs font-medium text-brand-green mb-2">
              想制作的核心功能（可多选）
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FEATURE_OPTIONS.map((feat) => {
                const active = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`text-left px-3 py-2 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      active
                        ? "bg-brand-green/10 text-brand-green border-brand-green font-medium"
                        : "bg-white text-stone-700 border-brand-border hover:border-brand-green/40"
                    }`}
                  >
                    <span>{feat}</span>
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ml-2 ${
                        active
                          ? "bg-brand-green text-white"
                          : "border border-brand-border text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3">
              <input
                type="text"
                placeholder="补充其他具体想法或特殊算法需求..."
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-brand-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Preview of generated inquiry text */}
          <div className="bg-white/80 border border-brand-border rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-brand-muted">
              <span className="flex items-center gap-1.5 font-medium text-brand-green">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                自动生成的咨询概要
              </span>
              <span className="text-[11px] text-stone-400">实时预览</span>
            </div>
            <pre className="text-xs text-brand-text font-sans whitespace-pre-wrap bg-stone-50/60 p-3 rounded-lg border border-stone-200/60 leading-relaxed font-normal">
              {generatedInquiryText}
            </pre>
          </div>

          {/* Notice & Honest transmission statement */}
          <div className="rounded-xl p-3.5 bg-amber-50/60 border border-amber-200/60 text-xs text-stone-600 space-y-1">
            <div className="font-medium text-stone-800 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              沟通说明
            </div>
            <p>
              本展示中心第一版不存储您的表单数据，也不会显示虚假的“后台已提交”。
              {hasWhatsApp
                ? "您可直接通过 WhatsApp 发送，或一键复制后通过微信沟通。"
                : "当前未直接开放外呼接口，请点击下方【复制咨询内容】，粘贴发送至我们现有的微信或沟通渠道即可。"}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 z-10 px-6 py-4 border-t border-brand-border/70 bg-[#F7F5F0]/95 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              copied
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white text-brand-green border border-brand-green/30 hover:border-brand-green hover:bg-stone-50"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                已复制咨询内容，请发送给开发团队
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                复制咨询内容
              </>
            )}
          </button>

          {hasWhatsApp && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
              通过 WhatsApp 发送
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
