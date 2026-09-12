import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  ResearchAreaForm,
  type ResearchAreaFormValues,
} from "@/components/admin/research-area-form";
import { requireAdmin } from "@/app/admin/admin-auth";

const postgresUuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditResearchAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!postgresUuidPattern.test(id)) notFound();

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("research_area")
    .select("id, slug, name, description, is_active, publish_status, is_demo_data")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div className="mx-auto w-[min(calc(100%-2rem),55rem)] py-10 sm:w-[min(calc(100%-2.75rem),55rem)] sm:py-14">
      <header className="border-b border-[#c9cbc4] pb-5">
        <div>
          <Link className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#53645c] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href="/admin/research-areas">
            <ArrowLeft size={16} /> Research Areas
          </Link>
          <h1 className="text-4xl font-medium tracking-[-0.035em] text-[#17251f] sm:text-[3.25rem] sm:leading-none">Edit research area</h1>
        </div>
      </header>
      <ResearchAreaForm researchArea={data as ResearchAreaFormValues} />
    </div>
  );
}
