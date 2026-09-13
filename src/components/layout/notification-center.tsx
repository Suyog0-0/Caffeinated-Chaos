"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createClient } from "@/supabase/client";

type Announcement = {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  created_at: string | null;
};

const READ_STORAGE_KEY = "islington-research-read-announcements";
const STORAGE_EVENT = "islington-announcement-read-state";

function subscribeToReadState(onStoreChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === READ_STORAGE_KEY) onStoreChange();
  }

  window.addEventListener("storage", onStorage);
  window.addEventListener(STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function getReadStateSnapshot() {
  return window.localStorage.getItem(READ_STORAGE_KEY) ?? "[]";
}

function getReadStateServerSnapshot() {
  return "[]";
}

function parseReadIds(value: string) {
  try {
    const parsed: unknown = JSON.parse(value);
    return new Set(
      Array.isArray(parsed)
        ? parsed.filter((id): id is string => typeof id === "string")
        : [],
    );
  } catch {
    return new Set<string>();
  }
}

function saveReadIds(readIds: Set<string>) {
  window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readIds]));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function formatDate(value: string | null) {
  if (!value) return "Recent";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function NotificationCenter() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const storedReadState = useSyncExternalStore(
    subscribeToReadState,
    getReadStateSnapshot,
    getReadStateServerSnapshot,
  );
  const readIds = useMemo(() => parseReadIds(storedReadState), [storedReadState]);
  const unreadCount = announcements.filter(({ id }) => !readIds.has(id)).length;

  useEffect(() => {
    let active = true;

    async function loadAnnouncements() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("announcement")
        .select("id, title, summary, content, created_at")
        .eq("publish_status", "published")
        .order("created_at", { ascending: false })
        .limit(12);

      if (!active) return;

      setAnnouncements(data ?? []);
      setLoadFailed(Boolean(error));
      setIsLoading(false);
    }

    void loadAnnouncements();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function markRead(id: string) {
    const next = new Set(readIds);
    next.add(id);
    saveReadIds(next);
  }

  function markUnread(id: string) {
    const next = new Set(readIds);
    next.delete(id);
    saveReadIds(next);
  }

  function toggleAnnouncement(id: string) {
    const willOpen = expandedId !== id;
    setExpandedId(willOpen ? id : null);
    if (willOpen) markRead(id);
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={
          unreadCount > 0
            ? `Announcements, ${unreadCount} unread`
            : "Announcements"
        }
        className="group relative grid size-11 cursor-pointer place-items-center border border-[#d7d5cd] bg-[#fffefb] text-[#26372f] outline-none transition-colors hover:border-[#bfc4c0] hover:bg-[#eceeea] hover:text-[#26372f] focus-visible:border-[#153c2e] focus-visible:ring-2 focus-visible:ring-[#153c2e]/20 max-[759px]:size-[42px] min-[1080px]:min-h-[42px] min-[1080px]:w-11 min-[1080px]:border-y-0 min-[1080px]:border-r-0"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Bell
          aria-hidden="true"
          className="transition-transform group-hover:-rotate-6"
          size={18}
          strokeWidth={1.8}
        />
        {unreadCount > 0 && (
          <span className="absolute right-0.5 top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-[#9f3434] px-1 text-[9px] font-bold leading-none text-white ring-2 ring-[#fffefb]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <section
          aria-label="Announcements"
          className="absolute right-0 top-[calc(100%+20px)] z-50 w-[420px] border border-[#bcc4bf] bg-[#fffefb] text-[#17251f] shadow-[0_24px_60px_rgba(18,55,43,0.2)] max-[1079px]:fixed max-[1079px]:left-4 max-[1079px]:right-4 max-[1079px]:top-[70px] max-[1079px]:w-auto min-[760px]:max-[1079px]:top-[76px]"
          role="dialog"
        >
          <header className="flex items-center justify-between gap-6 bg-[#153c2e] px-5 py-5 text-white">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center border border-white/25">
                <Bell aria-hidden="true" size={17} strokeWidth={1.7} />
              </span>
              <div>
                <h2 className="font-serif text-[25px] font-medium leading-none tracking-[-0.02em]">
                  Announcements
                </h2>
                <p className="mt-1.5 text-[11px] font-medium text-white/65">
                  {unreadCount === 0
                    ? "You’re up to date"
                    : `${unreadCount} unread ${unreadCount === 1 ? "notice" : "notices"}`}
                </p>
              </div>
            </div>
            <button
              aria-label="Close announcements"
              className="cursor-pointer border-b border-white/40 pb-0.5 text-xs font-semibold text-white/80 outline-none hover:border-white hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={() => setOpen(false)}
              type="button"
            >
              Close
            </button>
          </header>

          <div className="max-h-[min(520px,calc(100dvh-150px))] overflow-y-auto overscroll-contain">
            {isLoading ? (
              <p className="px-5 py-8 text-sm text-[#69776f]">
                Loading announcements…
              </p>
            ) : loadFailed ? (
              <p className="px-5 py-8 text-sm leading-6 text-[#7a3e3e]">
                Announcements could not be loaded. Try again after refreshing.
              </p>
            ) : announcements.length === 0 ? (
              <p className="px-5 py-8 text-sm leading-6 text-[#69776f]">
                There are no current announcements.
              </p>
            ) : (
              <ul>
                {announcements.map((announcement) => {
                  const expanded = expandedId === announcement.id;
                  const isRead = readIds.has(announcement.id);

                  return (
                    <li
                      className="border-b border-[#e0ded7] last:border-b-0"
                      key={announcement.id}
                    >
                      <button
                        aria-expanded={expanded}
                        className={`group flex w-full cursor-pointer items-start gap-4 px-5 py-4 text-left outline-none transition-colors hover:bg-[#eef2ed] focus-visible:bg-[#eef2ed] ${isRead ? "bg-[#fffefb]" : "bg-[#f5f8f4]"}`}
                        onClick={() => toggleAnnouncement(announcement.id)}
                        type="button"
                      >
                        <span
                          aria-label={isRead ? "Read" : "Unread"}
                          className={`mt-1 h-8 w-0.5 shrink-0 ${isRead ? "bg-[#c9ceca]" : "bg-[#267457]"}`}
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-[13px] leading-5 ${isRead ? "font-medium" : "font-bold"}`}
                          >
                            {announcement.title}
                          </span>
                          <span className="mt-1 block text-[11px] text-[#748078]">
                            {formatDate(announcement.created_at)}
                          </span>
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`mt-1 shrink-0 text-[#68766f] transition-transform ${expanded ? "rotate-180" : ""}`}
                          size={16}
                        />
                      </button>

                      {expanded && (
                        <div className="border-t border-[#e0e5e1] bg-[#eef2ed] px-5 pb-5 pl-10 pt-4">
                          <p className="whitespace-pre-line text-[13px] leading-6 text-[#495a52]">
                            {announcement.content ||
                              announcement.summary ||
                              "No additional details were provided."}
                          </p>
                          <button
                            className="mt-4 cursor-pointer border-b border-[#789085] pb-0.5 text-[11px] font-bold text-[#153c2e] outline-none hover:border-[#153c2e] focus-visible:ring-2 focus-visible:ring-[#153c2e]/20"
                            onClick={() =>
                              isRead
                                ? markUnread(announcement.id)
                                : markRead(announcement.id)
                            }
                            type="button"
                          >
                            {isRead ? "Mark as unread" : "Mark as read"}
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
