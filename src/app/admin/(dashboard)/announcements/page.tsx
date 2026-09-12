import { SecondaryContentPage } from "@/components/admin/secondary-content-page";

export default function AnnouncementsAdminPage({ searchParams }: { searchParams: Promise<{ query?: string; status?: string; notice?: string; error?: string; page?: string }> }) {
  return <SecondaryContentPage kind="announcement" searchParams={searchParams} />;
}
