import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResourceForm } from "@/components/admin/resource-form";
import { adminTw } from "@/components/admin/admin-tailwind";

export default function NewResourcePage() {
  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}>
        <div><Link className={adminTw.headerBackLink} href="/admin/research-support"><ArrowLeft size={16} /> Research Support</Link><h1>Add resource</h1></div>
      </header>
      <ResourceForm />
    </div>
  );
}
