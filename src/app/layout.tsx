import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Islington Research | R&D Digital Hub",
  description:
    "Discover researchers, projects, publications and research areas across Islington College.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} data-scroll-behavior="smooth">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SiteHeader />

        <main className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}