import { pageShell } from "./shared";

const metrics = [
  [15, "Researchers"],
  [10, "Active projects"],
  [42, "Publications"],
  [6, "Research areas"],
] as const;

export function Metrics() {
  return (
    <section className="border-b border-[#d7d5cd] bg-[#eeeae0]">
      <div
        className={`${pageShell} grid min-h-32 grid-cols-[1.5fr_repeat(4,1fr)] items-center max-lg:grid-cols-4 max-lg:py-7 max-sm:grid-cols-2`}
      >
        <p className="max-w-64 text-xl leading-tight max-lg:col-span-4 max-lg:max-w-none max-sm:col-span-2">
          One connected record of research at Islington.
        </p>
        {metrics.map(([value, label]) => (
          <dl
            className="min-h-14 border-l border-[#c7c4ba] pl-7 max-sm:border-t max-sm:p-4"
            key={label}
          >
            <dd className="text-[34px] leading-none font-medium">{value}</dd>
            <dt className="mt-2 font-sans text-[10px] text-[#405149]">{label}</dt>
          </dl>
        ))}
      </div>
    </section>
  );
}
