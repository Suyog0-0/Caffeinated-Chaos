import { createClient } from "@supabase/supabase-js";

// Server-side client using the anon key — safe for public published reads.
// No cookie handling needed for unauthenticated Server Components.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
