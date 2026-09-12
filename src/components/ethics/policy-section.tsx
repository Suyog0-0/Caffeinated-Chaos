"use client";

import { jsPDF } from "jspdf";
import { ArrowUpRight } from "lucide-react";

type Policy = {
    id: string;
    title: string;
    content: string | null;
    file_url: string | null;
};

function downloadPolicyPdf(policy: Policy) {
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
    doc.text("ISLINGTON COLLEGE · ETHICS & GOVERNANCE", margin, 10);


    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 131, 123);
    doc.text("INSTITUTIONAL POLICY DOCUMENT", margin, 16);


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
    const titleLines = doc.splitTextToSize(policy.title, contentW);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8 + 4;


    doc.setDrawColor(229, 228, 222);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 8;


    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 131, 123);
    const dateStr = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    doc.text(`Downloaded: ${dateStr}`, margin, y);
    doc.text("Status: Published", pageW - margin, y, { align: "right" });
    y += 5;


    doc.setDrawColor(229, 228, 222);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 10;


    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(64, 81, 73);
    doc.setLineHeightFactor(1.55);
    const bodyLines = doc.splitTextToSize(
        policy.content ?? "No content available.",
        contentW
    );

    bodyLines.forEach((line: string) => {
        if (y > pageH - 28) {
            doc.addPage();
            y = 24;
        }
        doc.text(line, margin, y);
        y += 5.5;
    });


    const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(229, 228, 222);
        doc.setLineWidth(0.2);
        doc.line(margin, pageH - 14, pageW - margin, pageH - 14);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(115, 131, 123);
        doc.text("Islington College — Ethics & Governance Office", margin, pageH - 9);
        doc.text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 9, { align: "right" });
    }

    doc.save(`${policy.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`);
}

function formatCategory(category: string) {
    return category
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PolicySection({
    category,
    policies,
    index,
    searchQuery = "",
}: {
    category: string;
    policies: Policy[];
    index: number;
    searchQuery?: string;
}) {
    const isAlt = index % 2 === 1;

    const filtered = searchQuery.trim()
        ? policies.filter((p) => {
            const q = searchQuery.toLowerCase();
            return (
                p.title.toLowerCase().includes(q) ||
                (p.content ?? "").toLowerCase().includes(q)
            );
        })
        : policies;

    if (filtered.length === 0) return null;

    return (
        <section className={`py-16 ${isAlt ? "bg-[#f5f4ef]" : "bg-white"}`}>
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                        {formatCategory(category)}
                    </h2>
                    <span className="text-xs text-[#73837b]">
                        {filtered.length} {filtered.length === 1 ? "document" : "documents"}
                    </span>
                </div>

                <div className="divide-y divide-[#e5e4de] border-b border-[#e5e4de]">
                    {filtered.map((policy) => (
                        <article
                            key={policy.id}
                            className="flex flex-col gap-4 py-8 md:flex-row md:items-start md:justify-between"
                        >
                            <div className="max-w-3xl">
                                <h3 className="mb-2 text-2xl font-normal leading-tight text-[#17251f]">
                                    {policy.title}
                                </h3>
                                {policy.content && (
                                    <p className="whitespace-pre-line text-sm leading-relaxed text-[#405149]">
                                        {policy.content}
                                    </p>
                                )}
                            </div>
                            <div className="flex shrink-0 items-center gap-4">
                                {policy.file_url && (
                                    <a
                                        href={policy.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-1 border-b border-transparent pb-px font-sans uppercase tracking-widest transition-all duration-200 hover:border-[#267457] hover:text-[#267457]"
                                        style={{ color: "#17251f", fontSize: "15px", fontWeight: 500 }}
                                    >
                                        Download
                                        <ArrowUpRight
                                            size={10}
                                            strokeWidth={1.8}
                                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            aria-hidden="true"
                                        />
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={() => downloadPolicyPdf(policy)}
                                    className="group inline-flex items-center gap-1 border-b border-transparent pb-px font-sans uppercase tracking-widest transition-all duration-200 hover:border-[#267457] hover:text-[#267457]"
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
        </section>
    );
}