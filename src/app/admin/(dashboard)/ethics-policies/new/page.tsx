import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EthicsPolicyForm } from "@/components/admin/ethics-policy-form";
import { adminTw } from "@/components/admin/admin-tailwind";

export default function NewEthicsPolicyPage() {
  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}>
        <div>
          <Link className={adminTw.headerBackLink} href="/admin/ethics-policies"><ArrowLeft size={16} /> Ethics Policies</Link>
          <h1>Add policy</h1>
        </div>
      </header>
      <EthicsPolicyForm />
    </div>
  );
}
