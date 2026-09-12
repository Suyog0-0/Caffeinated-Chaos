import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ResourceForm, type ResourceFormValues } from "@/components/admin/resource-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: resource, error } = await supabase
    .from("resource")
    .select("id, title, category, description, content, file_url, publish_status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Resource could not be loaded: ${error.message}`);
  if (!resource) notFound();

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}>
        <div><Link className={adminTw.headerBackLink} href="/admin/research-support"><ArrowLeft size={16} /> Research Support</Link><h1>Edit resource</h1></div>
      </header>
      <ResourceForm resource={resource as ResourceFormValues} />
    </div>
  );
}
