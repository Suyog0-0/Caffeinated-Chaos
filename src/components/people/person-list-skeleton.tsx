// src/components/people/person-list-skeleton.tsx
export function PersonListSkeleton() {
    return (
        <section className="py-4 md:py-12 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse bg-[#FFFFFF] border border-[#E8E4DA]/90 md:border-[#E2DBD0] rounded-2xl md:rounded-lg p-4 md:p-6 h-[220px] md:h-[240px]"
                    >
                        <div className="w-[52px] h-[52px] md:w-14 md:h-14 rounded-full bg-[#F0ECE4]" />
                        <div className="mt-5 h-5 w-3/4 rounded bg-[#F0ECE4]" />
                        <div className="mt-2 h-3 w-1/2 rounded bg-[#F0ECE4]" />
                    </div>
                ))}
            </div>
        </section>
    );
}