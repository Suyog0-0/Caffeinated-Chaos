// src/app/people/[id]/loading.tsx
export default function LoadingProfile() {
    return (
        <div className="flex min-h-screen flex-col bg-[#FBF9F5]" aria-hidden="true">
            <main className="mx-auto w-[min(calc(100%_-_48px),1240px)] flex-grow animate-pulse py-10 max-sm:w-[calc(100%_-_32px)]">
                <section className="border-b border-[#E6DFD5] pb-10">
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
                        <div className="h-28 w-28 shrink-0 rounded-full bg-[#EFEAE0] sm:h-36 sm:w-36" />
                        <div className="w-full space-y-3 pt-2">
                            <div className="h-3 w-24 rounded bg-[#EFEAE0]" />
                            <div className="h-10 w-2/3 rounded bg-[#EFEAE0]" />
                            <div className="h-4 w-1/3 rounded bg-[#EFEAE0]" />
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-10 pt-10 sm:gap-14 lg:grid-cols-12">
                    <section className="space-y-4 lg:col-span-8">
                        <div className="h-6 w-40 rounded bg-[#EFEAE0]" />
                        <div className="h-4 w-full rounded bg-[#EFEAE0]" />
                        <div className="h-4 w-11/12 rounded bg-[#EFEAE0]" />
                        <div className="h-4 w-3/4 rounded bg-[#EFEAE0]" />
                    </section>
                    <aside className="space-y-3 lg:col-span-4">
                        <div className="h-6 w-24 rounded bg-[#EFEAE0]" />
                        <div className="h-16 w-full rounded bg-[#EFEAE0]" />
                        <div className="h-16 w-full rounded bg-[#EFEAE0]" />
                    </aside>
                </div>
            </main>
        </div>
    );
}