import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./status";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Can happen in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Can happen in Server Components
          }
        },
      },
    }
  );
}

export function createSupabaseAdminClient() {
  if (!isSupabaseConfigured()) return null;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Server-side check if current user is an authorized admin
 */
export async function verifyAdminSession(): Promise<{
  isAdmin: boolean;
  user: any | null;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { isAdmin: false, user: null, error: "SUPABASE_NOT_CONFIGURED" };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { isAdmin: false, user: null, error: "CLIENT_ERROR" };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { isAdmin: false, user: null, error: "UNAUTHORIZED" };
  }

  // Check against ADMIN_EMAILS environment variable if defined
  const adminEmailsEnv = process.env.ADMIN_EMAILS;
  if (adminEmailsEnv && adminEmailsEnv.trim()) {
    const allowed = adminEmailsEnv
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const userEmail = (user.email || "").toLowerCase();
    if (!allowed.includes(userEmail)) {
      return { isAdmin: false, user, error: "FORBIDDEN_EMAIL" };
    }
  }

  return { isAdmin: true, user };
}
