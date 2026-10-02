import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { verifyAdminSession } from "@/lib/supabase/server";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        isAuthenticated: false,
        message: "Supabase 尚未配置环境变量",
      },
      { status: 200 }
    );
  }

  const { isAdmin, user, error } = await verifyAdminSession();

  return NextResponse.json({
    configured: true,
    isAuthenticated: isAdmin,
    user: isAdmin ? { email: user?.email, id: user?.id } : null,
    error: error || null,
  });
}
