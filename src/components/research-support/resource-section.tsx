"use client";

import { jsPDF } from "jspdf";
import { ArrowUpRight } from "lucide-react";

type Resource = {
    id: string;
    title: string;
    category: string | null;
    description: string | null;
    file_url: string | null;
    content: string | null;
    badge: string | null;
    created_at: string;
};

function downloadResourcePdf(resource: Resource) {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentW = pageW - margin * 2;

    doc.setFillColor(13, 42, 32);
    doc.rect(0, 0, pageW, 28, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(182, 199, 189);
    doc.text("ISLINGTON COLLEGE · RESEARCH SUPPORT", margin, 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 131, 123);
    doc.text((resource.category ?? "RESOURCE").toUpperCase(), margin, 16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(182, 199, 189);
    doc.text("PDF", pageW - margin, 10, { align: "right" });

    doc.setDrawColor(38, 116, 87);
    doc.setLineWidth(0.6);
    doc.line(0, 28, pageW, 28);

    let y = 42;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(23, 37, 31);
    const titleLines = doc.splitTextToSize(resource.title, contentW);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8 + 4;

    doc.setDrawColor(229, 228, 222);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 131, 123);
    const publishedStr = new Date(resource.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    doc.text(`Published: ${publishedStr}`, margin, y);
    doc.text(resource.badge ? resource.badge.toUpperCase() : "STATUS: PUBLISHED", pageW - margin, y, { align: "right" });
    y += 5;

    doc.setDrawColor(229, 228, 222);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(64, 81, 73);
    doc.setLineHeightFactor(1.55);
    const bodyLines = doc.splitTextToSize(resource.description ?? "No description available.", contentW);

    bodyLines.forEach((line: string) => {
        if (y > pageH - 28) {
            doc.addPage();
            y = 24;
        }
        doc.text(line, margin, y);
        y += 5.5;
    });

    if (resource.content) {
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(64, 81, 73);
        const contentLines = doc.splitTextToSize(resource.content, contentW);
        contentLines.forEach((line: string) => {
            if (y > pageH - 28) {
                doc.addPage();
                y = 24;
            }
            doc.text(line, margin, y);
            y += 5.5;
        });
    }

    if (resource.file_url) {
        if (y > pageH - 40) {
            doc.addPage();
            y = 24;
        }
        y += 4;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(38, 116, 87);
        doc.text("Original file:", margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(64, 81, 73);
        const urlLines = doc.splitTextToSize(resource.file_url, contentW);
        doc.text(urlLines, margin, y);
        y += urlLines.length * 5;
    }

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(150, 158, 152);
    doc.text(`Reference ID: res_${resource.id.slice(0, 8)}`, margin, y);

    const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(229, 228, 222);
        doc.setLineWidth(0.2);
        doc.line(margin, pageH - 14, pageW - margin, pageH - 14);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(115, 131, 123);
        doc.text("Islington College — Research Support Library", margin, pageH - 9);
        doc.text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 9, { align: "right" });
    }

    doc.save(`${resource.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`);
}

function formatCategory(category: string) {
    return category.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ResourceSection({
    category,
    resources,
    index,
    searchQuery = "",
}: {
    category: string;
    resources: Resource[];
    index: number;
    searchQuery?: string;
}) {
    const isAlt = index % 2 === 1;

    const filtered = searchQuery.trim()
        ? resources.filter((r) => {
            const q = searchQuery.toLowerCase();
            return r.title.toLowerCase().includes(q) || (r.description ?? "").toLowerCase().includes(q);
        })
        : resources;

    if (filtered.length === 0) return null;

    return (
        <section className={`py-16 ${isAlt ? "bg-[#f5f4ef]" : "bg-white"}`}>
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                        {formatCategory(category)}
                    </h2>
                    <span className="text-xs text-[#73837b]">
                        {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
                    </span>
                </div>

                <div className="divide-y divide-[#e5e4de] border-b border-[#e5e4de]">
                    {filtered.map((resource) => (
                        <article
                            key={resource.id}
                            className="group flex flex-col gap-4 py-8 transition-colors duration-300 hover:bg-[#faf9f5] md:flex-row md:items-start md:justify-between"
                        >
                            <a
                                href={resource.file_url ?? undefined}
                                target={resource.file_url ? "_blank" : undefined}
                                rel={resource.file_url ? "noopener noreferrer" : undefined}
                                className={`max-w-3xl px-1 ${resource.file_url ? "cursor-pointer" : "pointer-events-none"}`}
                            >
                                {resource.badge && (
                                    <span className="mb-2 inline-block rounded bg-[#eae7e0] px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-[#17251f]">
                                        {resource.badge}
                                    </span>
                                )}
                                <h3 className="mb-2 text-2xl font-normal leading-tight text-[#17251f] underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 group-hover:decoration-[#17251f]">
                                    {resource.title}
                                </h3>
                                {resource.description && (
                                    <p className="whitespace-pre-line text-sm leading-relaxed text-[#405149]">
                                        {resource.description}
                                    </p>
                                )}
                            </a>
                            <div className="flex shrink-0 items-center gap-4 px-1">


                                <button
                                    type="button"
                                    onClick={() => downloadResourcePdf(resource)}
                                    className="group inline-flex cursor-pointer items-center gap-1 border-b border-transparent pb-px font-sans uppercase tracking-widest transition-all duration-200 hover:border-[#267457] hover:text-[#267457]"
                                    style={{ color: "#17251f", fontSize: "15px", fontWeight: 500 }}
                                >
                                    Download PDF
                                    <ArrowUpRight
                                        size={10}
                                        strokeWidth={1.8}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section >
    );
}