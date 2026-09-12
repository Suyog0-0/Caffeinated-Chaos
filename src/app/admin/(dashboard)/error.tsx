"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { adminTw } from "@/components/admin/admin-tailwind";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin route error:", error);
  }, [error]);

  return (
    <div className={adminTw.pageContent}>
      <section className={adminTw.emptyState}>
        <span><AlertCircle size={25} /></span>
        <h2>This page could not be loaded</h2>
        <p>Check the connection and try loading the page again.</p>
        <button className={adminTw.retryButton} onClick={reset} type="button"><RotateCcw size={17} /> Try again</button>
      </section>
    </div>
  );
}
