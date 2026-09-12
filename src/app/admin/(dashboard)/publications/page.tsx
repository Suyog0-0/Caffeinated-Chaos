import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { PublicationDirectory } from "@/components/admin/publication-directory";
import { adminTw } from "@/components/admin/admin-tailwind";

function PublicationListLoading() {
  return <div aria-label="Loading publications" className="mt-6 grid gap-px border-y border-[#d4d5ce] bg-[#d4d5ce]">{Array.from({ length: 3 }, (_, index) => <i className={`${adminTw.skeleton} h-[82px] !bg-[#fffefb]`} key={index} />)}</div>;
}

export default async function PublicationsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string; page?: string; query?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = params.query?.slice(0, 100) ?? "";
  const status = ["draft", "preview", "published"].includes(params.status ?? "") ? params.status! : "all";
  const parsedPage = Number(params.page ?? "1");
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div><p>Content</p><h1>Publications</h1></div>
        <div className={adminTw.headerActions}>
          <Link href="/admin/publications/new"><Plus size={18} /> Add publication</Link>
        </div>
      </header>

      {params.notice && (
        <p className={adminTw.notice} role="status">
          {params.notice === "created" && "Publication created successfully."}
          {params.notice === "updated" && "Publication updated successfully."}
          {params.notice === "deleted" && "Publication deleted permanently."}
        </p>
      )}
      {params.error && (
        <p className={`${adminTw.notice} ${adminTw.noticeError}`} role="alert">
          {params.error === "delete-failed"
            ? "The publication could not be deleted. Check linked records and try again."
            : "The publication ID was invalid."}
        </p>
      )}

      <Suspense key={`${query}:${status}:${page}`} fallback={<PublicationListLoading />}>
        <PublicationDirectory page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
