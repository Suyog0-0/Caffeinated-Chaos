import { createServerClient } from "@/supabase/server";
import { EthicsContent } from "@/components/ethics/ethics-content";
import { ReviewTiers } from "@/components/ethics/review-tiers";
import { SopList } from "@/components/ethics/sop-list";
import { AiPrinciples } from "@/components/ethics/ai-principles";
import { IrbCommittee } from "@/components/ethics/irb-committee";
import { IntegrityDisclosures } from "@/components/ethics/integrity-disclosures";

export const revalidate = 300;

type PolicyRow = {
    id: string;
    title: string;
    category: string | null;
    content: string | null;
    file_url: string | null;
};

export default async function EthicsPage() {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("ethics_policy")
        .select("id, title, category, content, file_url")
        .eq("publish_status", "published")
        .order("category", { ascending: true })
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Failed to load ethics policies:", error);
    }

    const policies = (data ?? []) as PolicyRow[];
    const categories = Array.from(new Set(policies.map((p) => p.category ?? "General")));

    return (
        <main>
            <EthicsContent categories={categories} policies={policies} />
            <ReviewTiers />
            <SopList />
            <AiPrinciples />
            <IrbCommittee />
            <IntegrityDisclosures />
        </main>
    );
}