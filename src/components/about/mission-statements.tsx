import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statements = [
  {
    label: "Our vision",
    title: "A college where research belongs to everyone.",
    copy: "Students, faculty and partners can find one another, share methods and build work that matters beyond the campus.",
  },
  {
    label: "Our mission",
    title: "Make good research easier to begin and easier to discover.",
    copy: "We connect expertise, projects and publications while supporting rigorous, responsible inquiry.",
  },
];

export function MissionStatements() {
  return (
    <section className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-2 border-y border-[#17251f] max-sm:w-[calc(100%_-_32px)] max-sm:grid-cols-1">
      {statements.map((statement, index) => (
        <Card
          className={`rounded-none border-0 bg-transparent py-16 shadow-none ${index ? "border-l border-[#d7d5cd] pl-[7vw] max-sm:border-t max-sm:border-l-0 max-sm:pl-0" : "pr-[7vw]"}`}
          key={statement.label}
        >
          <CardHeader className="px-0">
            <p className="font-sans text-[10px]">{statement.label}</p>
            <CardTitle className="text-[42px] leading-tight font-medium">
              {statement.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 text-[#405149]">{statement.copy}</CardContent>
        </Card>
      ))}
    </section>
  );
}
