import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const leaders = [
  ["SK", "Prof. Sunita Koirala", "Director of Research & Development"],
  ["BR", "Dr Bikash Rai", "Research Programmes Lead"],
  ["MJ", "Meena Joshi", "Partnerships & Impact Lead"],
];

export function Leadership() {
  return (
    <section className="bg-[#0d2a20] py-20 text-white">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <p className="mb-4 font-sans text-xs font-bold text-[#b6c7bd]">Leadership</p>
        <h2 className="text-[42px] leading-tight font-medium">
          Guided by researchers and educators.
        </h2>
        <div className="mt-12 grid grid-cols-3 border-t border-[#536b61] max-sm:grid-cols-1">
          {leaders.map(([initials, name, role]) => (
            <Card
              className="rounded-none border-0 bg-transparent pt-7 pr-6 text-white shadow-none"
              key={initials}
            >
              <CardHeader className="px-0">
                <span className="grid size-14 place-items-center rounded-full border border-[#799087] font-sans text-[10px]">
                  {initials}
                </span>
                <CardTitle className="mt-2 text-[22px] font-medium">{name}</CardTitle>
              </CardHeader>
              <CardContent className="px-0 text-sm text-[#b7c6be]">{role}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
