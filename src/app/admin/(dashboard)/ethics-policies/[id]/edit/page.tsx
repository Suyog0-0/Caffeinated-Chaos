import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  EthicsPolicyForm,
  type EthicsPolicyFormValues,
} from "@/components/admin/ethics-policy-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function EditEthicsPolicyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: policy, error } = await supabase
    .from("ethics_policy")
    .select("id, title, category, content, file_url, publish_status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Ethics policy could not be loaded: ${error.message}`);
  if (!policy) notFound();

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}>
        <div>
          <Link className={adminTw.headerBackLink} href="/admin/ethics-policies"><ArrowLeft size={16} /> Ethics Policies</Link>
          <h1>Edit policy</h1>
        </div>
      </header>
      <EthicsPolicyForm policy={policy as EthicsPolicyFormValues} />
    </div>
  );
}
