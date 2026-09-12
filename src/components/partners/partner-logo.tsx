"use client";

import { useState } from "react";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "P";
}

export function PartnerLogo({
  name,
  logoUrl,
  className,
}: {
  name: string;
  logoUrl: string | null;
  className?: string;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const canDisplay = Boolean(logoUrl) && failedUrl !== logoUrl;

  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef0ea] text-[#0d2818] ${className ?? ""}`}>
      {canDisplay ? (
        // Partner logo hosts are entered by admins and cannot be exhaustively listed in next.config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${name} logo`}
          className="h-full w-full object-contain p-1.5"
          decoding="async"
          loading="lazy"
          onError={() => setFailedUrl(logoUrl)}
          src={logoUrl ?? undefined}
        />
      ) : (
        <span aria-label={`${name} initials`}>{initials(name)}</span>
      )}
    </span>
  );
}
