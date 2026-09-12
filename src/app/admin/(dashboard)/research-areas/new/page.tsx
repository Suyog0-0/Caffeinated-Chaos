import { ResearchAreaForm } from "@/components/admin/research-area-form";
import { requireAdmin } from "@/app/admin/admin-auth";

export default async function NewResearchAreaPage() {
  await requireAdmin();

  return (
    <div className="mx-auto w-[min(calc(100%-2rem),55rem)] py-10 sm:w-[min(calc(100%-2.75rem),55rem)] sm:py-14">
      <header className="border-b border-[#c9cbc4] pb-5">
        <div><p className="mb-2 text-xs font-bold text-[#53645c]">Research Areas</p><h1 className="text-4xl font-medium tracking-[-0.035em] text-[#17251f] sm:text-[3.25rem] sm:leading-none">Add research area</h1></div>
      </header>
      <ResearchAreaForm />
    </div>
  );
}
