"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

export type PersonOption = {
  id: string;
  name: string;
  position?: string | null;
  department?: string | null;
  email?: string | null;
  photo_url?: string | null;
};
export type SelectedPerson = {
  id: string;
  name: string;
  role?: string;
  position?: string | null;
  department?: string | null;
  email?: string | null;
  photo_url?: string | null;
};
export type RoleOption = { value: string; label: string };

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export function PeoplePicker({
  people,
  initialSelected,
  fieldName,
  roleFieldName,
  roleOptions,
  label,
  placeholder = "Search by name…",
  emptyLabel = "No one added yet.",
  allowReorder = true,
}: {
  people: PersonOption[];
  initialSelected: SelectedPerson[];
  fieldName: string;
  roleFieldName?: string;
  roleOptions?: RoleOption[];
  label: string;
  placeholder?: string;
  emptyLabel?: string;
  allowReorder?: boolean;
}) {
  const [selected, setSelected] = useState<SelectedPerson[]>(initialSelected);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    return people
      .filter((person) => !selected.some((item) => item.id === person.id))
      .filter((person) => !term || person.name.toLowerCase().includes(term))
      .slice(0, 8);
  }, [people, selected, query]);

  function addPerson(person: PersonOption) {
    setSelected((current) => [
      ...current,
      {
        id: person.id,
        name: person.name,
        role: roleOptions?.[0]?.value,
        position: person.position,
        department: person.department,
        email: person.email,
        photo_url: person.photo_url,
      },
    ]);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function removePerson(id: string) {
    setSelected((current) => current.filter((item) => item.id !== id));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setSelected((current) => {
      const next = [...current];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index: number) {
    setSelected((current) => {
      if (index === current.length - 1) return current;
      const next = [...current];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  }

  function updateRole(id: string, role: string) {
    setSelected((current) => current.map((item) => (item.id === id ? { ...item, role } : item)));
  }

  return (
    <div className="relative col-span-full">
      <label className="col-span-full grid gap-2 max-[720px]:col-auto">
        {label}
        <div className="relative">
          <div className="box-border flex min-h-12 w-full items-center gap-[9px] border border-[#c7cac3] bg-white px-[13px] text-[#738079] [&_input]:!w-full [&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!p-0 [&_input]:!text-sm [&_input]:!text-[#17251f] [&_input]:!shadow-none [&_input]:outline-none">
            <Search size={16} />
            <input
              ref={inputRef}
              onBlur={() => setTimeout(() => setOpen(false), 120)}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              type="text"
              value={query}
            />
          </div>

          {open && (
            <ul className="absolute inset-x-0 top-full z-[5] mt-1 max-h-[280px] list-none overflow-y-auto border border-[#c9cbc4] bg-[#fffefb] p-1.5 shadow-[0_10px_25px_rgba(11,27,51,.12)] [&_li_button]:flex [&_li_button]:min-h-[52px] [&_li_button]:w-full [&_li_button]:cursor-pointer [&_li_button]:items-center [&_li_button]:gap-2.5 [&_li_button]:rounded [&_li_button]:border-0 [&_li_button]:bg-transparent [&_li_button]:px-2.5 [&_li_button]:py-1.5 [&_li_button]:text-left [&_li_button]:text-sm [&_li_button]:text-[#17251f] [&_li_button:hover]:bg-[#f5f4ef] max-[720px]:[&_li_button]:min-h-[60px]">
              {matches.length === 0 ? (
                <li className="p-2.5 text-[13px] text-[#68756f]">No matching researchers.</li>
              ) : (
                matches.map((person) => {
                  const subtitle = [person.position, person.department].filter(Boolean).join(", ");
                  return (
                    <li key={person.id}>
                      <button onMouseDown={(event) => event.preventDefault()} onClick={() => addPerson(person)} type="button">
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#d4d5ce] bg-[#153c2e] [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&>span]:font-sans [&>span]:text-[13px] [&>span]:font-semibold [&>span]:text-white" aria-hidden="true">
                          {person.photo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img alt="" src={person.photo_url} />
                          ) : (
                            <span>{getInitials(person.name)}</span>
                          )}
                        </span>
                        <span className="grid min-w-0 gap-0.5">
                          <span className="truncate font-semibold">{person.name}</span>
                          {subtitle && <span className="truncate text-xs font-normal text-[#68756f]">{subtitle}</span>}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>
      </label>

      {selected.length === 0 ? (
        <p className="col-span-full mt-2.5 text-[13px] text-[#68756f]">{emptyLabel}</p>
      ) : (
        <ul className="col-span-full mt-2.5 grid list-none gap-px border border-[#d4d5ce] bg-[#d4d5ce] p-0 [&>li]:flex [&>li]:min-h-[66px] [&>li]:items-center [&>li]:gap-3 [&>li]:bg-[#fffefb] [&>li]:p-2.5 max-[720px]:[&>li]:flex-wrap max-[720px]:[&>li]:items-start max-[720px]:[&>li]:gap-x-3 max-[720px]:[&>li]:gap-y-2.5 max-[720px]:[&>li]:p-3">
          {selected.map((person, index) => {
            const subtitle = [person.position, person.department].filter(Boolean).join(", ");
            return (
              <li key={person.id}>
                <span className="flex shrink-0 items-center gap-1.5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-1">
                  <button className="grid h-[30px] w-[30px] shrink-0 cursor-pointer place-items-center border border-[#d4d5ce] bg-transparent p-0 text-[#52635b] hover:border-[#9d3028] hover:text-[#9d3028]" onClick={() => removePerson(person.id)} type="button" aria-label={`Remove ${person.name}`}>
                    <X size={14} />
                  </button>
                  {allowReorder && (
                    <span className="flex shrink-0 flex-col [&_button]:grid [&_button]:h-4 [&_button]:w-5 [&_button]:cursor-pointer [&_button]:place-items-center [&_button]:border-0 [&_button]:bg-transparent [&_button]:p-0 [&_button]:text-[#68756f] [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-30 [&_button:hover:not(:disabled)]:text-[#153c2e] max-[720px]:flex-row max-[720px]:gap-1 max-[720px]:[&_button]:h-5 max-[720px]:[&_button]:w-[22px]">
                      <button disabled={index === 0} onClick={() => moveUp(index)} type="button" aria-label="Move up">
                        <ChevronUp size={13} />
                      </button>
                      <button disabled={index === selected.length - 1} onClick={() => moveDown(index)} type="button" aria-label="Move down">
                        <ChevronDown size={13} />
                      </button>
                    </span>
                  )}
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#d4d5ce] bg-[#153c2e] [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&>span]:font-sans [&>span]:text-[13px] [&>span]:font-semibold [&>span]:text-white" aria-hidden="true">
                  {person.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" src={person.photo_url} />
                  ) : (
                    <span>{getInitials(person.name)}</span>
                  )}
                </span>
                <span className="grid min-w-0 flex-[1_1_200px] gap-px [&_small]:truncate [&_small]:text-xs [&_small]:font-normal [&_small]:text-[#68756f] max-[720px]:min-w-[120px] max-[720px]:flex-[1_1_160px]">
                  <span className="truncate text-sm font-semibold text-[#17251f]">{person.name}</span>
                  {subtitle && <small>{subtitle}</small>}
                  {person.email && <small>{person.email}</small>}
                </span>
                {roleOptions && (
                  <select className="min-h-9 w-[220px] shrink-0 basis-[220px] border border-[#c7cac3] bg-white px-2 text-[13px] text-[#17251f] max-[720px]:w-full max-[720px]:flex-[1_1_100%]" onChange={(event) => updateRole(person.id, event.target.value)} value={person.role ?? roleOptions[0].value}>
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                )}
                <input name={fieldName} type="hidden" value={person.id} />
                {roleFieldName && <input name={roleFieldName} type="hidden" value={person.role ?? roleOptions?.[0]?.value ?? ""} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
