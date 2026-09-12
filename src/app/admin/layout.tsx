import type { Metadata } from "next";
import { adminTw } from "@/components/admin/admin-tailwind";

export const metadata: Metadata = {
  title: "Admin | Islington Research",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={adminTw.surface}>{children}</div>;
}
