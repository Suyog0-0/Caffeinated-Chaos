type OverviewStatusChartProps = {
  data: {
    type: string;
    published: number;
    preview: number;
    draft: number;
  }[];
};

const STATUS_META = [
  { key: "published", label: "Published", color: "#2d6650" },
  { key: "preview", label: "Preview", color: "#b88922" },
  { key: "draft", label: "Draft", color: "#cdd1cc" },
] as const;

function percentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

export function OverviewStatusChart({ data }: OverviewStatusChartProps) {
  const totals = data.reduce(
    (sum, row) => ({
      published: sum.published + row.published,
      preview: sum.preview + row.preview,
      draft: sum.draft + row.draft,
    }),
    { published: 0, preview: 0, draft: 0 },
  );
  const recordCount = totals.published + totals.preview + totals.draft;
  const publishedPercentage = percentage(totals.published, recordCount);

  return (
    <div className="px-6 py-6 max-[720px]:px-5 max-[720px]:py-5">
      <div className="flex items-end justify-between gap-8 border-b border-[#e2e4de] pb-5 max-sm:block">
        <div>
          <p className="text-[12px] font-medium text-[#68756f]">Published coverage</p>
          <p className="mt-1 flex items-baseline gap-2 font-sans">
            <strong className="text-[34px] font-semibold leading-none tracking-[-0.025em] text-[#17251f]">
              {publishedPercentage}%
            </strong>
            <span className="text-[12px] text-[#68756f]">
              {totals.published} of {recordCount} records
            </span>
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 pb-1 text-[12px] text-[#53645c] max-sm:mt-4 max-sm:justify-start">
          {STATUS_META.map((status) => (
            <span className="inline-flex items-center gap-2" key={status.key}>
              <i
                aria-hidden="true"
                className="block size-2.5 shrink-0"
                style={{ backgroundColor: status.color }}
              />
              {status.label}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-2" role="list" aria-label="Publishing readiness by content type">
        {data.map((row) => {
          const total = row.published + row.preview + row.draft;
          const rowPublishedPercentage = percentage(row.published, total);
          const bar = (
            <div
              className="flex h-3.5 min-w-0 flex-1 overflow-hidden bg-[#eef0ec]"
              role="img"
              aria-label={`${row.type}: ${row.published} published, ${row.preview} in preview, ${row.draft} draft`}
            >
              {STATUS_META.map((status) => {
                const value = row[status.key];
                if (value === 0 || total === 0) return null;

                return (
                  <span
                    key={status.key}
                    style={{
                      backgroundColor: status.color,
                      width: `${(value / total) * 100}%`,
                    }}
                  />
                );
              })}
            </div>
          );

          return (
            <div
              className="border-b border-[#eceee9] last:border-b-0"
              key={row.type}
              role="listitem"
            >
              <div className="hidden min-h-[78px] items-center gap-5 sm:flex">
                <div className="shrink-0" style={{ width: 180 }}>
                  <strong className="block font-sans text-[14px] font-semibold text-[#17251f]">
                    {row.type}
                  </strong>
                  <span className="mt-0.5 block text-[11px] text-[#7a857f]">
                    {total} {total === 1 ? "record" : "records"}
                  </span>
                </div>

                {bar}

                <div className="w-24 shrink-0 text-right font-sans max-[720px]:w-20">
                  <strong className="block text-[14px] font-semibold tabular-nums text-[#17251f]">
                    {rowPublishedPercentage}%
                  </strong>
                  <span className="mt-0.5 block text-[11px] text-[#7a857f]">published</span>
                </div>
              </div>

              <div className="py-4 sm:hidden">
                <div className="mb-2 flex items-end justify-between gap-4">
                  <div>
                    <strong className="block font-sans text-[14px] font-semibold text-[#17251f]">
                      {row.type}
                    </strong>
                    <span className="mt-0.5 block text-[11px] text-[#7a857f]">
                      {total} {total === 1 ? "record" : "records"}
                    </span>
                  </div>
                  <div className="shrink-0 text-right font-sans">
                    <strong className="text-[14px] font-semibold tabular-nums text-[#17251f]">
                      {rowPublishedPercentage}%
                    </strong>
                  </div>
                </div>
                {bar}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
