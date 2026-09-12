// src/app/people/page.tsx
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { PeopleHeader } from "@/components/people/people-hero";
import { PersonFilters } from "@/components/people/person-filters";
import { PersonResults } from "@/components/people/person-results";
import { PersonListSkeleton } from "@/components/people/person-list-skeleton";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; department?: string; area?: string }>;
}) {
  const { query, department, area } = await searchParams;

  return (
    <main className={`${inter.className} flex-grow bg-[#F8F7F3] pb-14 md:bg-[#FAF7F2] md:pb-24`}>
      <PeopleHeader />
      <PersonFilters />
      {/* Suspense lets the header/filters above render immediately instead of
          waiting on the Supabase round trip; the grid streams in once ready. */}
      <Suspense fallback={<PersonListSkeleton />}>
        <PersonResults query={query} department={department} area={area} />
      </Suspense>
    </main>
  );
}
