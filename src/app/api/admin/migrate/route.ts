import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { verifyAdminSession, createSupabaseAdminClient } from "@/lib/supabase/server";
import { projectsData } from "@/data/siteConfig";

export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase 尚未配置环境变量，无法执行数据迁移" },
      { status: 503 }
    );
  }

  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "未授权的操作" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "数据库连接失败" }, { status: 500 });
  }

  try {
    let insertedCount = 0;
    let skippedCount = 0;

    for (const project of projectsData) {
      // Check if project with this slug already exists
      const { data: existing } = await supabase
        .from("projects")
        .select("id, slug")
        .eq("slug", project.slug)
        .maybeSingle();

      if (existing) {
        // Do not overwrite existing database records
        skippedCount++;
        continue;
      }

      // Insert new record
      const { error: insertError } = await supabase.from("projects").insert({
        slug: project.slug,
        title: project.title,
        description: project.description,
        url: project.url,
        cover_image: project.coverImage || null,
        category: project.category || "待分类",
        tags: project.tags || [],
        screenshots: project.screenshots || [],
        suitable_for: project.suitableFor || [],
        custom_directions: project.customDirections || [],
        featured: project.featured || false,
        sort_order: project.sortOrder || 0,
        visible: project.visible !== undefined ? project.visible : true,
        accent_color: project.accentColor || "#173D35",
        cover_pattern: project.coverPattern || "wave",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error(`迁移失败 [${project.slug}]:`, insertError);
      } else {
        insertedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `迁移完成：新导入 ${insertedCount} 个作品，跳过 ${skippedCount} 个已存在作品`,
      inserted: insertedCount,
      skipped: skippedCount,
      total: projectsData.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "迁移过程发生异常" },
      { status: 500 }
    );
  }
}
