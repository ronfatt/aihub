"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Settings,
  Database,
  Layers,
  ArrowLeft,
  X,
  Sparkles,
  Info,
  ShieldAlert,
} from "lucide-react";
import { Project, projectsData, siteConfig } from "@/data/siteConfig";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface AdminDashboardProps {
  configured: boolean;
  initialProjects?: Project[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  configured: initialConfigured,
  initialProjects = projectsData,
}) => {
  const router = useRouter();
  const [configured, setConfigured] = useState(initialConfigured);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Data state
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<"projects" | "settings" | "migration">("projects");

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [originalSlug, setOriginalSlug] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete modal state
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Settings state
  const [whatsappNumber, setWhatsappNumber] = useState(siteConfig.whatsappNumber || "");
  const [brandTagline, setBrandTagline] = useState(siteConfig.brandTagline || "");
  const [headline, setHeadline] = useState(siteConfig.headline || "");
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  // Migration state
  const [migrating, setMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<string | null>(null);

  // Check auth and fetch live projects on mount
  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then((res) => res.json())
      .then((data) => {
        setConfigured(data.configured);
        if (data.configured) {
          if (!data.isAuthenticated) {
            router.replace("/admin/login");
            return;
          }
          setUserEmail(data.user?.email || "Admin");
          loadLiveProjects();
          loadLiveSettings();
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setCheckingAuth(false));
  }, [router]);

  const loadLiveProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          // Map DB columns if needed
          const mapped: Project[] = json.data.map((row: any) => ({
            id: row.id,
            slug: row.slug || row.id,
            title: row.title,
            description: row.description || "打开演示页面，亲自探索与体验",
            url: row.url,
            coverImage: row.cover_image || undefined,
            coverAlt: row.cover_alt || `${row.title} 封面`,
            category: row.category || "待分类",
            tags: Array.isArray(row.tags) ? row.tags : [],
            screenshots: Array.isArray(row.screenshots) ? row.screenshots : [],
            suitableFor: Array.isArray(row.suitable_for) ? row.suitable_for : [],
            customDirections: Array.isArray(row.custom_directions) ? row.custom_directions : [],
            featured: Boolean(row.featured),
            sortOrder: Number(row.sort_order ?? 0),
            visible: Boolean(row.visible ?? true),
          }));
          setProjects(mapped);
        }
      }
    } catch (e) {
      console.error("加载线上作品失败:", e);
    }
  };

  const loadLiveSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setWhatsappNumber(json.data.whatsappNumber || "");
          setBrandTagline(json.data.brandTagline || "");
          setHeadline(json.data.headline || "");
        }
      }
    } catch (e) {
      console.error("加载设置失败:", e);
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.replace("/admin/login");
  };

  // Open Project Form
  const openNewProject = () => {
    setCurrentProject({
      id: "",
      slug: "",
      title: "",
      description: "打开演示页面，亲自探索与体验",
      url: "",
      category: "待分类",
      tags: [],
      screenshots: [],
      suitableFor: [],
      customDirections: [],
      featured: false,
      sortOrder: projects.length + 1,
      visible: true,
      accentColor: "#173D35",
      coverPattern: "wave",
    });
    setOriginalSlug("");
    setFormError("");
    setFormSuccess("");
    setIsEditing(true);
  };

  const openEditProject = (p: Project) => {
    setCurrentProject({ ...p });
    setOriginalSlug(p.slug);
    setFormError("");
    setFormSuccess("");
    setIsEditing(true);
  };

  // Handle Image Upload to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "cover" | "screenshot") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!configured) {
      alert("Supabase 尚未连接，无法上传真实文件至存储桶");
      return;
    }

    setUploadingImage(true);
    setFormError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "图片上传失败");
      }

      if (target === "cover") {
        setCurrentProject((prev) => ({
          ...prev,
          coverImage: json.url,
          coverAlt: prev.coverAlt || `${prev.title || "作品"} 封面`,
        }));
      } else {
        setCurrentProject((prev) => ({
          ...prev,
          screenshots: [
            ...(prev.screenshots || []),
            { url: json.url, alt: `${prev.title || "作品"} 界面截图` },
          ],
        }));
      }
    } catch (err: any) {
      setFormError(err.message || "上传失败");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!configured) {
      setFormError("当前 Supabase 环境变量未连接，无法将改动保存至正式数据库。");
      return;
    }

    if (!currentProject.title?.trim()) {
      setFormError("作品名称不能为空");
      return;
    }

    if (!currentProject.slug?.trim()) {
      setFormError("Slug 不能为空，且只能使用小写字母、数字及连字符");
      return;
    }

    if (!currentProject.url?.trim() || !/^https?:\/\/.+/i.test(currentProject.url.trim())) {
      setFormError("请输入以 http:// 或 https:// 开头的有效演示链接");
      return;
    }

    setIsSaving(true);
    try {
      const isNew = !currentProject.id;
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${currentProject.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: currentProject.title,
          slug: currentProject.slug,
          url: currentProject.url,
          description: currentProject.description,
          cover_image: currentProject.coverImage,
          category: currentProject.category,
          tags: currentProject.tags,
          screenshots: currentProject.screenshots,
          suitable_for: currentProject.suitableFor,
          custom_directions: currentProject.customDirections,
          featured: currentProject.featured,
          sort_order: currentProject.sortOrder,
          visible: currentProject.visible,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "保存失败");
      }

      setFormSuccess("作品已成功持久化保存！");
      await loadLiveProjects();
      setTimeout(() => {
        setIsEditing(false);
      }, 1000);
    } catch (err: any) {
      // Retain form content upon error
      setFormError(err.message || "保存发生异常");
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Project Visibility Quickly
  const toggleVisibility = async (project: Project) => {
    if (!configured) {
      alert("Supabase 尚未连接，无法持久化切换可见性");
      return;
    }

    try {
      const newVisible = !project.visible;
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          visible: newVisible,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        alert(json.error || "切换状态失败");
        return;
      }
      await loadLiveProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Execute Project Deletion (After secondary confirmation)
  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    if (!configured) {
      alert("Supabase 尚未连接，无法删除数据库记录");
      setProjectToDelete(null);
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects/${projectToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const json = await res.json();
        alert(json.error || "删除失败");
      } else {
        await loadLiveProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProjectToDelete(null);
    }
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (!configured) {
      setSettingsError("Supabase 尚未连接，无法保存站点设置");
      return;
    }

    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsappNumber,
          brandTagline,
          headline,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "保存失败");
      }

      setSettingsSuccess("站点设置已成功持久化更新！");
      setTimeout(() => setSettingsSuccess(""), 3000);
    } catch (err: any) {
      setSettingsError(err.message || "更新设置异常");
    } finally {
      setSavingSettings(false);
    }
  };

  // Run Initial Data Migration
  const handleRunMigration = async () => {
    if (!configured) {
      alert("请先配置 Supabase 环境变量再执行迁移");
      return;
    }

    setMigrating(true);
    setMigrationResult(null);
    try {
      const res = await fetch("/api/admin/migrate", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "迁移执行失败");
      }
      setMigrationResult(json.message);
      await loadLiveProjects();
    } catch (err: any) {
      setMigrationResult(`错误: ${err.message}`);
    } finally {
      setMigrating(false);
    }
  };

  if (checkingAuth && configured) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-6 text-brand-green">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-brand-muted">正在验证管理员身份...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-brand-text flex flex-col selection:bg-brand-green selection:text-bg-warm">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 w-full border-b border-brand-border/70 bg-[#F7F5F0]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg text-brand-muted hover:text-brand-green hover:bg-brand-border/30 transition-colors"
              title="返回前台主页"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-lg font-medium text-brand-green tracking-tight">
                RMS 管理中心
              </h1>
              <div className="flex items-center gap-2 text-[11px]">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    configured ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-brand-muted">
                  {configured ? "Supabase 已连接" : "未连接 Supabase (本地配置只读)"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-brand-border bg-white text-stone-700 hover:text-brand-green"
            >
              前台预览
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {configured && userEmail && (
              <span className="hidden md:inline-block text-brand-muted">
                {userEmail}
              </span>
            )}

            {configured && (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                退出
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Supabase Unconfigured Warning & Step-by-Step Instructions */}
        {!configured && (
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-5 text-amber-900 shadow-subtle">
            <div className="flex items-start gap-3.5">
              <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-serif font-medium text-amber-950">
                  当前处于本地回退模式（尚未配置 Supabase 环境变量）
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  前台正通过第一轮的静态配置正常展示 8 款演示作品与真实截图。
                  本系统坚持真实持久化设计，<strong>不使用 localStorage 冒充正式后台，亦不显示假的保存成功</strong>。
                  按以下四步完成配置后即可获得完整受保护的后台：
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white border border-amber-200/60 space-y-2">
                <div className="font-medium text-stone-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-bold">1</span>
                  创建 Supabase 项目与表结构
                </div>
                <p className="text-stone-600 leading-relaxed">
                  打开 Supabase 控制台的 SQL Editor，执行项目中预置的迁移脚本：
                  <code className="block mt-1 p-1.5 bg-stone-100 rounded text-stone-700 font-mono text-[11px]">
                    supabase/migrations/001_initial_schema.sql
                  </code>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200/60 space-y-2">
                <div className="font-medium text-stone-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-bold">2</span>
                  配置环境变量文件
                </div>
                <p className="text-stone-600 leading-relaxed">
                  在项目根目录创建 <code>.env.local</code>，填入 Supabase URL、Anon Key 及授权管理员邮箱：
                  <code className="block mt-1 p-1.5 bg-stone-100 rounded text-stone-700 font-mono text-[11px]">
                    NEXT_PUBLIC_SUPABASE_URL=https://...
                    <br />NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
                    <br />ADMIN_EMAILS=your-admin@example.com
                  </code>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200/60 space-y-2">
                <div className="font-medium text-stone-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-bold">3</span>
                  创建第一个管理员账号
                </div>
                <p className="text-stone-600 leading-relaxed">
                  在 Supabase 控制台的 <strong>Authentication → Users</strong> 页面，点击 <strong>Add user</strong>，输入管理员邮箱与密码直接创建，无需开放前端注册。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200/60 space-y-2">
                <div className="font-medium text-stone-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-bold">4</span>
                  一键导入初始 8 个项目
                </div>
                <p className="text-stone-600 leading-relaxed">
                  配置完成后，在后台点击【导入初始 8 个项目】，系统将以幂等方式安全导入数据，不覆盖已修改内容。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-brand-border/70 gap-6">
          <button
            onClick={() => {
              setActiveTab("projects");
              setIsEditing(false);
            }}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "projects"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-brand-muted hover:text-brand-green"
            }`}
          >
            <Layers className="w-4 h-4" />
            演示作品管理 ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-brand-muted hover:text-brand-green"
            }`}
          >
            <Settings className="w-4 h-4" />
            站点与 WhatsApp 设置
          </button>

          {configured && (
            <button
              onClick={() => setActiveTab("migration")}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "migration"
                  ? "border-brand-green text-brand-green"
                  : "border-transparent text-brand-muted hover:text-brand-green"
              }`}
            >
              <Database className="w-4 h-4" />
              数据导入与迁移
            </button>
          )}
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {!isEditing ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-serif font-medium text-brand-green">
                      所有作品列表
                    </h2>
                    <p className="text-xs text-brand-muted mt-0.5">
                      管理展示在前台的命理与身心灵原型项目，支持隐藏、编辑与排序
                    </p>
                  </div>

                  <button
                    onClick={openNewProject}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    新建作品
                  </button>
                </div>

                {/* Table of projects */}
                <div className="bg-white rounded-2xl border border-brand-border/80 shadow-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 border-b border-brand-border/60 text-brand-green uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="py-3.5 px-4 font-medium">排序</th>
                          <th className="py-3.5 px-4 font-medium">封面</th>
                          <th className="py-3.5 px-4 font-medium">名称 / Slug</th>
                          <th className="py-3.5 px-4 font-medium">Demo 链接</th>
                          <th className="py-3.5 px-4 font-medium">状态</th>
                          <th className="py-3.5 px-4 font-medium text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/40">
                        {projects.map((p) => (
                          <tr key={p.id || p.slug} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-stone-500">
                              {p.sortOrder}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="w-16 h-10 rounded-lg overflow-hidden border border-brand-border bg-stone-100 flex items-center justify-center">
                                {p.coverImage ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={p.coverImage}
                                    alt={p.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-[10px] text-stone-400 font-mono">占位封面</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-stone-900 text-sm">
                                {p.title}
                              </div>
                              <div className="text-[11px] text-brand-muted font-mono">
                                /projects/{p.slug}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-gold hover:underline flex items-center gap-1 truncate"
                              >
                                {p.url}
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => toggleVisibility(p)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                                  p.visible
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                    : "bg-stone-100 text-stone-500 border border-stone-200"
                                }`}
                                title="点击切换公开/隐藏"
                              >
                                {p.visible ? (
                                  <>
                                    <Eye className="w-3 h-3 text-emerald-600" />
                                    已发布
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3" />
                                    已隐藏
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-2">
                                <Link
                                  href={`/projects/${p.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg text-stone-500 hover:text-brand-green hover:bg-stone-100"
                                  title="查看详情页"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => openEditProject(p)}
                                  className="p-1.5 rounded-lg text-stone-500 hover:text-brand-green hover:bg-stone-100"
                                  title="编辑"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setProjectToDelete(p)}
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                                  title="删除作品"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* Project Edit Form */
              <div className="bg-white rounded-2xl border border-brand-border/80 shadow-card p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-brand-green">
                      {currentProject.id ? `编辑作品: ${currentProject.title}` : "新建作品"}
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">
                      填写作品基础信息、真实截图、适合场景与可讨论定制方向
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 rounded-lg text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {formError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {formSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProject} className="space-y-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Title */}
                    <div>
                      <label className="block font-medium text-brand-green mb-1.5">
                        作品名称 *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentProject.title || ""}
                        onChange={(e) =>
                          setCurrentProject((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="例如：SoulFlow"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block font-medium text-brand-green mb-1.5">
                        唯一 Slug (网址标识) *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentProject.slug || ""}
                        onChange={(e) =>
                          setCurrentProject((prev) => ({
                            ...prev,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                          }))
                        }
                        placeholder="例如：soulflow"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green font-mono"
                      />
                      {originalSlug && originalSlug !== currentProject.slug && (
                        <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1">
                          <Info className="w-3 h-3 shrink-0" />
                          修改 Slug 将使原有网址 <code>/projects/{originalSlug}</code> 失效，请谨慎修改。
                        </p>
                      )}
                    </div>

                    {/* Demo URL */}
                    <div>
                      <label className="block font-medium text-brand-green mb-1.5">
                        实际 Demo 访问链接 (URL) *
                      </label>
                      <input
                        type="url"
                        required
                        value={currentProject.url || ""}
                        onChange={(e) =>
                          setCurrentProject((prev) => ({ ...prev, url: e.target.value }))
                        }
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                    </div>

                    {/* Sort Order */}
                    <div>
                      <label className="block font-medium text-brand-green mb-1.5">
                        展示排序权重（数字越小越靠前）
                      </label>
                      <input
                        type="number"
                        value={currentProject.sortOrder ?? 0}
                        onChange={(e) =>
                          setCurrentProject((prev) => ({
                            ...prev,
                            sortOrder: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-medium text-brand-green mb-1.5">
                      一句话说明 (Description)
                    </label>
                    <input
                      type="text"
                      value={currentProject.description || ""}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({ ...prev, description: e.target.value }))
                      }
                      placeholder="打开演示页面，亲自探索与体验"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>

                  {/* Cover Image Upload & Preview */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-brand-border/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-brand-green">封面图片 (16:10 比例)</span>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-border text-stone-700 hover:text-brand-green shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        {uploadingImage ? "正在上传..." : "上传新封面"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "cover")}
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <input
                          type="text"
                          value={currentProject.coverImage || ""}
                          onChange={(e) =>
                            setCurrentProject((prev) => ({ ...prev, coverImage: e.target.value }))
                          }
                          placeholder="或者直接输入图片相对路径 / 网络 URL"
                          className="w-full px-3.5 py-2 rounded-lg border border-brand-border bg-white text-xs"
                        />
                        <input
                          type="text"
                          value={currentProject.coverAlt || ""}
                          onChange={(e) =>
                            setCurrentProject((prev) => ({ ...prev, coverAlt: e.target.value }))
                          }
                          placeholder="图片替代文本 (Alt Text)"
                          className="w-full px-3.5 py-2 rounded-lg border border-brand-border bg-white text-xs mt-2"
                        />
                      </div>

                      <div className="w-full max-w-[200px] aspect-[16/10] rounded-lg overflow-hidden border border-brand-border bg-stone-200">
                        {currentProject.coverImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={currentProject.coverImage}
                            alt="封面预览"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400 text-[10px]">
                            未设置封面（显示占位封面）
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Screenshots gallery */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-brand-border/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-brand-green">
                        详情页截图画廊 ({currentProject.screenshots?.length || 0})
                      </span>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-border text-stone-700 hover:text-brand-green shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        添加截图
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "screenshot")}
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(currentProject.screenshots || []).map((s, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-lg overflow-hidden border border-brand-border bg-white"
                        >
                          <div className="aspect-[16/10] bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={s.url} alt={s.alt} className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentProject((prev) => ({
                                ...prev,
                                screenshots: prev.screenshots?.filter((_, i) => i !== idx),
                              }))
                            }
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customizable Directions */}
                  <div>
                    <label className="block font-medium text-brand-green mb-1.5">
                      可讨论的专属定制方向（每行一条）
                    </label>
                    <textarea
                      rows={3}
                      value={(currentProject.customDirections || []).join("\n")}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          customDirections: e.target.value.split("\n").filter((s) => s.trim()),
                        }))
                      }
                      placeholder="例如：可拓展为手机号、身份证或门牌号的专属数字能量解析系统"
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                    <span className="text-[11px] text-brand-muted">
                      注意：此区域内容与已有功能明确区分，前台将以“可讨论的专属定制方向”标识展示。
                    </span>
                  </div>

                  {/* Suitable Scenarios */}
                  <div>
                    <label className="block font-medium text-brand-green mb-1.5">
                      适合哪些老师或服务场景（每行一条，未确认可留空）
                    </label>
                    <textarea
                      rows={2}
                      value={(currentProject.suitableFor || []).join("\n")}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          suitableFor: e.target.value.split("\n").filter((s) => s.trim()),
                        }))
                      }
                      placeholder="留空则详情页自动隐藏该板块，不编造内容"
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(currentProject.visible)}
                        onChange={(e) =>
                          setCurrentProject((prev) => ({ ...prev, visible: e.target.checked }))
                        }
                        className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                      />
                      <span className="font-medium text-stone-800">
                        公开可见（取消勾选则隐藏作品，公众无法访问）
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(currentProject.featured)}
                        onChange={(e) =>
                          setCurrentProject((prev) => ({ ...prev, featured: e.target.checked }))
                        }
                        className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                      />
                      <span className="font-medium text-stone-800">设为精选 (Featured)</span>
                    </label>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl border border-brand-border text-stone-700 hover:bg-stone-50"
                    >
                      取消
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors font-medium shadow-xs disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? "正在持久化保存..." : "保存作品"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Site Settings & WhatsApp */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-2xl border border-brand-border/80 shadow-card p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-medium text-brand-green">
                站点设置与联系方式
              </h2>
              <p className="text-xs text-brand-muted mt-0.5">
                配置全局 WhatsApp 号码与品牌口号，修改后前台咨询面板自动生效
              </p>
            </div>

            {settingsError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{settingsError}</span>
              </div>
            )}

            {settingsSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{settingsSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div>
                <label className="block font-medium text-brand-green mb-1.5">
                  WhatsApp 咨询号码（国际代码+纯数字，未配置时留空）
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="例如：85291234567 或 8613800000000（留空则不开启直跳）"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green font-mono"
                />
                <span className="text-[11px] text-brand-muted mt-1 block">
                  未配置号码时，前台仅显示“复制咨询内容”；配置有效号码后，前台将自动显示“通过 WhatsApp 发送”绿色按钮。
                </span>
              </div>

              <div>
                <label className="block font-medium text-brand-green mb-1.5">
                  品牌副标题 / 业务定位
                </label>
                <input
                  type="text"
                  value={brandTagline}
                  onChange={(e) => setBrandTagline(e.target.value)}
                  placeholder="命理与身心灵数字产品演示中心"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="block font-medium text-brand-green mb-1.5">
                  Hero 首屏主标题
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="让专业，被体验。"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
              </div>

              <div className="pt-4 border-t border-brand-border/60">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors font-medium shadow-xs disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingSettings ? "正在保存..." : "保存设置"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Initial Migration Tool */}
        {activeTab === "migration" && (
          <div className="max-w-2xl bg-white rounded-2xl border border-brand-border/80 shadow-card p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-medium text-brand-green">
                初始数据导入与同步
              </h2>
              <p className="text-xs text-brand-muted mt-0.5">
                将第一轮的 8 个初始项目导入到 Supabase Postgres 数据库
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-brand-border/70 text-xs text-stone-700 space-y-2">
              <div className="font-medium text-brand-green flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                安全与幂等保障
              </div>
              <ul className="list-disc pl-4 space-y-1 text-stone-600">
                <li>基于稳定 Slug 判断，重复运行不会产生重复作品。</li>
                <li>如果数据库中已有修改过的同名作品，系统会自动跳过，绝不覆盖已有改动。</li>
                <li>保留全部 8 个 Demo 的真实链接、说明与真实截图配置。</li>
              </ul>
            </div>

            {migrationResult && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                {migrationResult}
              </div>
            )}

            <div>
              <button
                onClick={handleRunMigration}
                disabled={migrating}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors font-medium shadow-xs disabled:opacity-50"
              >
                <Database className="w-4 h-4" />
                {migrating ? "正在执行数据迁移..." : "立即导入 8 个初始作品"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal (Secondary Confirmation) */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-brand-border shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-stone-900">
                  确认删除作品 “{projectToDelete.title}”？
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  删除后该作品及其详情页（/projects/{projectToDelete.slug}）将无法访问。
                  日常维护推荐优先使用<strong>【隐藏】</strong>功能。
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 text-xs">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl border border-brand-border text-stone-700 hover:bg-stone-50"
              >
                取消
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium"
              >
                确认彻底删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
