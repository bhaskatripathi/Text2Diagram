
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Text2Diagram",
  description:
    "Draw flowchart, sequence diagram, class diagram, user journey, gantt, C4C, Mindmap, Timeline diagram with nature language.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans text-slate-900 antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <SiteHeader />
        {children}

        <Analytics />
      </body>
    </html>
  );
}
