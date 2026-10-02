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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase 尚未配置环境变量，无法保存修改" },
      { status: 503 }
    );
  }

  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "未授权的操作" }, { status: 401 });
  }

  const projectId = params.id;
  if (!projectId) {
    return NextResponse.json({ error: "缺少作品 ID" }, { status: 400 });
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
        { error: "Slug 格式不正确（仅允许小写字母、数字与连字符）" },
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
      return NextResponse.json({ error: "数据库连接不可用" }, { status: 500 });
    }

    // Check slug uniqueness across other projects
    const { data: existingWithSlug } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug.trim())
      .neq("id", projectId)
      .maybeSingle();

    if (existingWithSlug) {
      return NextResponse.json(
        { error: `Slug "${slug}" 已被其他作品占用，请换用不同的唯一标识` },
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
      visible: Boolean(visible),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", projectId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "更新处理异常" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase 尚未配置环境变量" },
      { status: 503 }
    );
  }

  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "未授权的操作" }, { status: 401 });
  }

  const projectId = params.id;
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "数据库连接失败" }, { status: 500 });
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: projectId });
}
