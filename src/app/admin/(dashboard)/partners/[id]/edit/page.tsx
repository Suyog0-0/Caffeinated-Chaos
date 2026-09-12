import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PartnerForm, type PartnerFormValues } from "@/components/admin/partner-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: partner, error } = await supabase
    .from("partner")
    .select("id, name, description, website, logo_url, partner_type, publish_status, is_demo_data")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Partner could not be loaded: ${error.message}`);
  if (!partner) notFound();

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}><div><Link className={adminTw.headerBackLink} href="/admin/partners"><ArrowLeft size={16} /> Partners</Link><h1>Edit partner</h1></div></header>
      <PartnerForm partner={partner as PartnerFormValues} />
    </div>
  );
}
