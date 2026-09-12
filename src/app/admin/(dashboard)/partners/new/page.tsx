import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PartnerForm } from "@/components/admin/partner-form";
import { adminTw } from "@/components/admin/admin-tailwind";

export default function NewPartnerPage() {
  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}><div><Link className={adminTw.headerBackLink} href="/admin/partners"><ArrowLeft size={16} /> Partners</Link><h1>Add partner</h1></div></header>
      <PartnerForm />
    </div>
  );
}
