"use client";

import { useState } from "react";

interface PartnerLogoProps {
  name: string;
  logoUrl: string | null;
  className?: string;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "P";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function PartnerLogo({
  name,
  logoUrl,
  className,
}: PartnerLogoProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const hasLogo = Boolean(logoUrl) && failedUrl !== logoUrl;
  const initials = getInitials(name);

  const rootClassName = [
    "flex shrink-0 items-center justify-center overflow-hidden",
    "rounded-full bg-[#eef0ea] text-[#0d2818]",
    "ring-1 ring-inset ring-black/5",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClassName}>
      {hasLogo && logoUrl ? (
        // Logo URLs are admin-managed and may come from hosts that are not
        // configured in next.config.ts, so a native img element is intentional.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="h-full w-full object-contain p-1.5"
          decoding="async"
          loading="lazy"
          onError={() => setFailedUrl(logoUrl)}
        />
      ) : (
        <span
          aria-label={`${name} logo`}
          className="select-none text-xs font-semibold tracking-[0.04em] sm:text-sm"
        >
          {initials}
        </span>
      )}
    </span>
  );
}