"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Database } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then((res) => res.json())
      .then((data) => {
        setConfigured(data.configured);
        if (data.isAuthenticated) {
          router.replace("/admin");
        }
      })
      .catch(() => setConfigured(false));
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("请填写完整的邮箱与密码");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg("Supabase 客户端尚未初始化，请先配置环境变量");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMsg(error.message || "登录失败，请核对账号与密码");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Double check authorization on backend
        const checkRes = await fetch("/api/admin/check-auth");
        const checkData = await checkRes.json();
        if (checkData.isAuthenticated) {
          router.replace("/admin");
        } else {
          setErrorMsg(
            checkData.error === "FORBIDDEN_EMAIL"
              ? "该账号未在 ADMIN_EMAILS 白名单授权列表中，无管理员访问权限"
              : "账号未获得管理员授权"
          );
          await supabase.auth.signOut();
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "登录过程出现异常");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-brand-text">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-green mb-6 px-4 sm:px-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          返回展示中心前台
        </Link>

        <div className="text-center px-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-green text-bg-warm flex items-center justify-center mx-auto mb-3 shadow-card">
            <Lock className="w-5 h-5 text-brand-gold" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-brand-green">
            RMS 管理后台
          </h2>
          <p className="mt-1 text-xs text-brand-muted">
            作品管理 · 内容维护 · 站点配置
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-2xl border border-brand-border/80">
          {configured === false && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <Database className="w-4 h-4 text-amber-700" />
                Supabase 尚未配置
              </div>
              <p className="leading-relaxed">
                当前项目尚未配置 Supabase 环境变量，请在根目录创建 <code>.env.local</code> 并填入 Supabase URL 和 Key。
              </p>
              <Link
                href="/admin"
                className="inline-block mt-1 font-medium text-amber-800 underline"
              >
                查看详细配置说明与本地预览 ↗
              </Link>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-brand-green mb-1.5">
                管理员账号（邮箱）
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-green mb-1.5">
                登录密码
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || configured === false}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-brand-green text-bg-warm hover:bg-brand-green-hover transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "正在验证..." : "登录后台"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-brand-border/60 text-[11px] text-stone-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              权限与安全说明
            </div>
            <p>
              本后台仅供授权管理员进入，不开放公众注册，不预置公开测试密码。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
