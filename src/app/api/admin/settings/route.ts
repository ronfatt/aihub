import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { verifyAdminSession, createSupabaseAdminClient } from "@/lib/supabase/server";
import { siteConfig } from "@/data/siteConfig";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: siteConfig, configured: false });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ data: siteConfig, configured: false });
  }

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", "main")
    .maybeSingle();

  if (data && data.value) {
    return NextResponse.json({ data: { ...siteConfig, ...data.value }, configured: true });
  }

  return NextResponse.json({ data: siteConfig, configured: true });
}

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase 尚未配置环境变量，无法保存站点设置" },
      { status: 503 }
    );
  }

  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "未授权的操作" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { whatsappNumber, brandName, brandTagline, headline, intro } = body;

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "数据库连接失败" }, { status: 500 });
    }

    const payload = {
      key: "main",
      value: {
        whatsappNumber: (whatsappNumber || "").replace(/[^0-9]/g, ""),
        brandName: brandName?.trim() || siteConfig.brandName,
        brandTagline: brandTagline?.trim() || siteConfig.brandTagline,
        headline: headline?.trim() || siteConfig.headline,
        intro: intro?.trim() || siteConfig.intro,
      },
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("site_settings")
      .upsert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "保存站点设置失败" },
      { status: 500 }
    );
  }
}
