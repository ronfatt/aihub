import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { verifyAdminSession, createSupabaseAdminClient } from "@/lib/supabase/server";

function isValidUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase 尚未配置环境变量" },
      { status: 503 }
    );
  }

  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "无权限访问" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "数据库连接失败" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase 尚未配置环境变量，无法保存数据" },
      { status: 503 }
    );
  }

  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "未授权的操作" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      url,
      description,
      cover_image,
      category,
      tags,
      screenshots,
      suitable_for,
      custom_directions,
      featured,
      sort_order,
      visible,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "项目名称不能为空" }, { status: 400 });
    }

    if (!slug || !isValidSlug(slug.trim())) {
      return NextResponse.json(
        { error: "Slug 格式不正确（仅允许小写字母、数字与连字符，如 'my-project'）" },
        { status: 400 }
      );
    }

    if (!url || !isValidUrl(url.trim())) {
      return NextResponse.json(
        { error: "Demo URL 必须是有效的 http:// 或 https:// 网址" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "数据库客户端创建失败" }, { status: 500 });
    }

    // Check slug uniqueness
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug.trim())
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `Slug "${slug}" 已被其他作品使用，请使用不同的唯一标识` },
        { status: 409 }
      );
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      url: url.trim(),
      description: description?.trim() || "打开演示页面，亲自探索与体验",
      cover_image: cover_image || null,
      category: category || "待分类",
      tags: Array.isArray(tags) ? tags : [],
      screenshots: Array.isArray(screenshots) ? screenshots : [],
      suitable_for: Array.isArray(suitable_for) ? suitable_for : [],
      custom_directions: Array.isArray(custom_directions) ? custom_directions : [],
      featured: Boolean(featured),
      sort_order: Number(sort_order ?? 0),
      visible: visible !== undefined ? Boolean(visible) : true,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "请求处理异常" },
      { status: 500 }
    );
  }
}
