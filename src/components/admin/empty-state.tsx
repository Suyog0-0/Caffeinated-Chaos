import type { LucideIcon } from "lucide-react";
import { adminTw } from "@/components/admin/admin-tailwind";

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className={adminTw.emptyState}>
      <span><Icon size={25} strokeWidth={1.6} /></span>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
