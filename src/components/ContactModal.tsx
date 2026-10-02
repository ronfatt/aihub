"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Send, Sparkles, MessageSquare } from "lucide-react";
import { siteConfig, projectsData } from "@/data/siteConfig";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectTitle?: string;
  initialProjectUrl?: string;
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
  initialProjectUrl = "",
}) => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedDemoTitle, setSelectedDemoTitle] = useState(initialProjectTitle);
  const [selectedDemoUrl, setSelectedDemoUrl] = useState(initialProjectUrl);
  const [customFeature, setCustomFeature] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const initialFocusRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialProjectTitle) {
      setSelectedDemoTitle(initialProjectTitle);
    }
    if (initialProjectUrl) {
      setSelectedDemoUrl(initialProjectUrl);
    } else if (initialProjectTitle) {
      const match = projectsData.find((p) => p.title === initialProjectTitle);
      if (match) setSelectedDemoUrl(match.url);
    }
  }, [initialProjectTitle, initialProjectUrl]);

  const handleDemoChange = (title: string) => {
    setSelectedDemoTitle(title);
    const match = projectsData.find((p) => p.title === title);
    setSelectedDemoUrl(match ? match.url : "");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

  const combinedFeatures = [
    ...selectedFeatures,
    ...(customFeature.trim() ? [customFeature.trim()] : []),
  ];

  const demoDisplay = selectedDemoTitle
    ? selectedDemoUrl
      ? `${selectedDemoTitle}（${selectedDemoUrl}）`
      : selectedDemoTitle
    : "待定 / 全案交流";

  const generatedInquiryText = `【RMS 专属数字系统定制咨询】
您好！我想了解命理/身心灵专属数字系统定制开发：
· 我的称呼：${name.trim() || "老师/主理人"}
· 专业领域：${domain || "未选择（待沟通）"}
· 参考演示项目：${demoDisplay}
· 期望核心功能：${combinedFeatures.length > 0 ? combinedFeatures.join("、") : "探讨专属定制方案"}

希望进一步探讨开发范围与实现方案。`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedInquiryText);
      } else {
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

  const cleanNumber = (siteConfig.whatsappNumber || "").replace(/[^0-9]/g, "");
  const hasValidWhatsApp = cleanNumber.length >= 7;
  const whatsappUrl = hasValidWhatsApp
    ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(generatedInquiryText)}`
    : "#";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0E1115] border border-white/10 rounded-2xl shadow-2xl flex flex-col text-white animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0E1115]/95 backdrop-blur-md">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-atelier-gold" />
              <h3
                id="contact-modal-title"
                className="text-base sm:text-lg font-sans font-bold text-white tracking-tight"
              >
                专属数字系统定制咨询
              </h3>
            </div>
            <p className="text-xs font-mono text-atelier-muted">
              ATELIER COMMISSION DOSSIER // 填写偏好即时生成结构化方案
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭面板"
            className="p-1.5 rounded-lg text-atelier-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs font-sans">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-atelier-muted uppercase mb-1.5">
                您的称呼 / 堂号 / 品牌
              </label>
              <input
                ref={initialFocusRef}
                type="text"
                placeholder="例如：陈老师、玄真堂"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#14181F] text-white text-xs placeholder:text-atelier-muted/60 focus:outline-none focus:border-atelier-emerald"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-atelier-muted uppercase mb-1.5">
                参考的演示 DEMO
              </label>
              <select
                value={selectedDemoTitle}
                onChange={(e) => handleDemoChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#14181F] text-white text-xs focus:outline-none focus:border-atelier-emerald"
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

          {/* Domain Selection */}
          <div>
            <label className="block text-[11px] font-mono text-atelier-muted uppercase mb-2">
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
                    className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                      isSelected
                        ? "bg-atelier-emerald text-black border-atelier-emerald font-bold"
                        : "bg-white/[0.03] text-atelier-secondary border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-[11px] font-mono text-atelier-muted uppercase mb-2">
              期望打造的核心功能（可多选）
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FEATURE_OPTIONS.map((feat) => {
                const active = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`text-left px-3 py-2 rounded-md border text-xs flex items-center justify-between transition-all ${
                      active
                        ? "bg-atelier-emerald/10 text-white border-atelier-emerald/60"
                        : "bg-white/[0.02] text-atelier-secondary border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>{feat}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ml-2 ${
                        active
                          ? "bg-atelier-emerald text-black font-bold"
                          : "border border-white/20 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5">
              <input
                type="text"
                placeholder="补充其他具体想法或特殊算法需求..."
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-[#14181F] text-white text-xs placeholder:text-atelier-muted/60 focus:outline-none focus:border-atelier-emerald"
              />
            </div>
          </div>

          {/* Code Dossier Preview */}
          <div className="bg-[#12161C] border border-white/10 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-atelier-muted">
              <span className="flex items-center gap-1.5 text-atelier-gold font-medium">
                <Sparkles className="w-3.5 h-3.5 text-atelier-gold" />
                自动生成的咨询方案概要
              </span>
              <span>LIVE DOSSIER</span>
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap bg-[#0A0C0E] p-3 rounded-lg border border-white/[0.06] text-white/90 leading-relaxed">
              {generatedInquiryText}
            </pre>
          </div>

          {/* Notice */}
          <div className="rounded-xl p-3.5 bg-white/[0.02] border border-white/10 text-xs text-atelier-secondary space-y-1">
            <div className="font-mono text-atelier-gold flex items-center gap-1.5 text-[11px]">
              <MessageSquare className="w-3.5 h-3.5 text-atelier-gold" />
              沟通提示 // STATEMENT
            </div>
            <p className="leading-relaxed">
              本中心第一版不存储表单临时数据。
              {hasValidWhatsApp
                ? "您可直接点击下方【通过 WhatsApp 发送】唤起对话，或点击【复制咨询内容】后通过微信直接发送给我们。"
                : "请点击下方【复制咨询内容】，直接粘贴发送至我们现有的微信或沟通渠道即可。"}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 z-10 px-6 py-4 border-t border-white/[0.08] bg-[#0E1115]/95 backdrop-blur-md flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              copied
                ? "bg-atelier-emerald text-black shadow-glow"
                : "bg-white/[0.06] text-white border border-white/20 hover:border-white/40"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-black" />
                已复制咨询内容，请发送给团队
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                复制咨询内容
              </>
            )}
          </button>

          {hasValidWhatsApp && (
            <div className="w-full sm:w-auto flex flex-col items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-white text-black hover:bg-atelier-emerald transition-colors"
              >
                <Send className="w-4 h-4" />
                通过 WhatsApp 发送
              </a>
              <span className="text-[10px] font-mono text-atelier-muted mt-1">
                唤起后需在 WhatsApp 中点击发送
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
