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
}: {
  people: PersonOption[];
  initialSelected: SelectedPerson[];
  fieldName: string;
  roleFieldName?: string;
  roleOptions?: RoleOption[];
  label: string;
  placeholder?: string;
  emptyLabel?: string;
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
    <div className="admin-people-picker">
      <label className="admin-field-full">
        {label}
        <div className="admin-people-search-wrap">
          <div className="admin-people-search">
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
            <ul className="admin-people-dropdown">
              {matches.length === 0 ? (
                <li className="admin-people-dropdown-empty">No matching researchers.</li>
              ) : (
                matches.map((person) => {
                  const subtitle = [person.position, person.department].filter(Boolean).join(", ");
                  return (
                    <li key={person.id}>
                      <button onMouseDown={(event) => event.preventDefault()} onClick={() => addPerson(person)} type="button">
                        <span className="admin-people-avatar" aria-hidden="true">
                          {person.photo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img alt="" src={person.photo_url} />
                          ) : (
                            <span>{getInitials(person.name)}</span>
                          )}
                        </span>
                        <span className="admin-people-option-text">
                          <span className="admin-people-option-name">{person.name}</span>
                          {subtitle && <span className="admin-people-option-subtitle">{subtitle}</span>}
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
        <p className="admin-people-empty">{emptyLabel}</p>
      ) : (
        <ul className="admin-people-list">
          {selected.map((person, index) => {
            const subtitle = [person.position, person.department].filter(Boolean).join(", ");
            return (
              <li key={person.id}>
                <span className="admin-people-controls">
                  <button className="admin-people-remove" onClick={() => removePerson(person.id)} type="button" aria-label={`Remove ${person.name}`}>
                    <X size={14} />
                  </button>
                  <span className="admin-people-order">
                    <button disabled={index === 0} onClick={() => moveUp(index)} type="button" aria-label="Move up">
                      <ChevronUp size={13} />
                    </button>
                    <button disabled={index === selected.length - 1} onClick={() => moveDown(index)} type="button" aria-label="Move down">
                      <ChevronDown size={13} />
                    </button>
                  </span>
                </span>
                <span className="admin-people-avatar" aria-hidden="true">
                  {person.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" src={person.photo_url} />
                  ) : (
                    <span>{getInitials(person.name)}</span>
                  )}
                </span>
                <span className="admin-people-identity">
                  <span className="admin-people-name">{person.name}</span>
                  {subtitle && <small>{subtitle}</small>}
                  {person.email && <small>{person.email}</small>}
                </span>
                {roleOptions && (
                  <select onChange={(event) => updateRole(person.id, event.target.value)} value={person.role ?? roleOptions[0].value}>
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