import type { LucideIcon } from "lucide-react";

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
    <section className="admin-empty-state">
      <span><Icon size={25} strokeWidth={1.6} /></span>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
