import { createServerClient } from "@/supabase/server";
import { ResourceContent } from "@/components/research-support/resource-content";

export const revalidate = 300;

type ResourceRow = {
    id: string;
    title: string;
    category: string | null;
    description: string | null;
    file_url: string | null;
    content: string | null;
    badge: string | null;
    created_at: string;
};

export default async function ResearchSupportPage() {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("resource")
        .select("id, title, category, description, file_url, content, created_at")
        .eq("publish_status", "published")
        .order("category", { ascending: true })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to load resources:", error);
    }

    const resources = (data ?? []) as ResourceRow[];
    const categories = Array.from(new Set(resources.map((r) => r.category ?? "General")));

    return (
        <main>
            <ResourceContent categories={categories} resources={resources} />
        </main>
    );
}