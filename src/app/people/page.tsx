// src/app/people/page.tsx
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { PeopleHeader } from "@/components/people/people-hero";
import { PersonFilters } from "@/components/people/person-filters";
import { PersonResults } from "@/components/people/person-results";
import { PersonListSkeleton } from "@/components/people/person-list-skeleton";
import { createServerClient } from "@/supabase/server";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

async function getDepartments(): Promise<string[]> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("researcher")
    .select("department")
    .eq("publish_status", "published");

  const unique = new Set(
    (data ?? [])
      .map((r) => r.department)
      .filter((d): d is string => Boolean(d))
  );

  return Array.from(unique).sort();
}

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; department?: string; area?: string }>;
}) {
  const { query, department, area } = await searchParams;
  const departments = await getDepartments();

  return (
    <main className={`${inter.className} flex-grow bg-[#F8F7F3] pb-14 md:bg-[#FAF7F2] md:pb-24`}>
      <PeopleHeader />
      <PersonFilters departments={departments} />
      {/* Suspense lets the header/filters above render immediately instead of
          waiting on the Supabase round trip; the grid streams in once ready. */}
      <Suspense fallback={<PersonListSkeleton />}>
        <PersonResults query={query} department={department} area={area} />
      </Suspense>
    </main>
  );
} 