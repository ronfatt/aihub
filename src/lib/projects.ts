import { Project, projectsData, siteConfig, SiteConfig } from "@/data/siteConfig";
import { isSupabaseConfigured } from "./supabase/status";
import { createSupabaseServerClient, createSupabaseAdminClient } from "./supabase/server";

function mapDbRowToProject(row: any): Project {
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title,
    description: row.description || "打开演示页面，亲自探索与体验",
    url: row.url,
    coverImage: row.cover_image || undefined,
    coverAlt: row.cover_alt || `${row.title} 封面`,
    accentColor: row.accent_color || "#173D35",
    coverPattern: row.cover_pattern || "wave",
    category: row.category || "待分类",
    tags: Array.isArray(row.tags) ? row.tags : [],
    screenshots: Array.isArray(row.screenshots) ? row.screenshots : [],
    suitableFor: Array.isArray(row.suitable_for) ? row.suitable_for : [],
    customDirections: Array.isArray(row.custom_directions) ? row.custom_directions : [],
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order ?? 0),
    visible: Boolean(row.visible ?? true),
  };
}

/**
 * Get all visible published projects for public visitors
 */
export async function getPublishedProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("visible", true)
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map(mapDbRowToProject);
        }
      }
    } catch (e) {
      console.warn("Supabase fetch projects error, falling back to local data:", e);
    }
  }

  // Graceful fallback to static data
  return projectsData
    .filter((p) => p.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get single published project by slug for public detail page
 * Hidden projects return null
 */
export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .eq("visible", true)
          .maybeSingle();

        if (!error && data) {
          return mapDbRowToProject(data);
        }
      }
    } catch (e) {
      console.warn("Supabase fetch project by slug error, falling back to local data:", e);
    }
  }

  // Graceful fallback
  const found = projectsData.find((p) => p.slug === slug);
  if (found && found.visible) {
    return found;
  }
  return null;
}

/**
 * Get all projects (including hidden) for admin management
 */
export async function getAllProjectsForAdmin(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseAdminClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && data) {
          return data.map(mapDbRowToProject);
        }
      }
    } catch (e) {
      console.warn("Admin fetch error:", e);
    }
  }

  return [...projectsData].sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get site settings (WhatsApp number, etc.)
 */
export async function getEffectiveSiteConfig(): Promise<SiteConfig> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data } = await supabase
          .from("site_settings")
          .select("*")
          .eq("key", "main")
          .maybeSingle();

        if (data && data.value) {
          return {
            ...siteConfig,
            ...data.value,
          };
        }
      }
    } catch (e) {
      console.warn("Supabase settings fetch error:", e);
    }
  }

  return siteConfig;
}
