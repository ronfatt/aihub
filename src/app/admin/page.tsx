import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { verifyAdminSession } from "@/lib/supabase/server";
import { AdminDashboard } from "./AdminDashboard";
import { getAllProjectsForAdmin } from "@/lib/projects";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `管理中心 | ${siteConfig.brandName}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const configured = isSupabaseConfigured();

  // If Supabase is configured, enforce strict server-side authentication check
  if (configured) {
    const { isAdmin } = await verifyAdminSession();
    if (!isAdmin) {
      redirect("/admin/login");
    }
  }

  // Fetch initial projects for the admin view
  const initialProjects = await getAllProjectsForAdmin();

  return (
    <AdminDashboard
      configured={configured}
      initialProjects={initialProjects}
    />
  );
}
