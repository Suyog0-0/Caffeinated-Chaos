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
    <section className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-2 border-0 max-sm:w-[calc(100%_-_32px)] max-sm:grid-cols-1">
      {statements.map((statement, index) => (
        <Card
          className={`rounded-none border-0 bg-transparent py-16 shadow-none ring-0 ${index ? "pl-[7vw] max-sm:border-t max-sm:border-[#d7d5cd] max-sm:pl-0" : "pr-[7vw]"}`}
          key={statement.label}
        >
          <CardHeader className="px-0">
            <p className="font-sans text-2xl capitalize">{statement.label}</p>
            <CardTitle className="text-[48px] leading-tight font-medium">
              <h2 className="contents">{statement.title}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 text-lg text-[#405149]">{statement.copy}</CardContent>
        </Card>
      ))}
    </section>
  );
}