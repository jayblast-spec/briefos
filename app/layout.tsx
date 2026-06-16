import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BriefOS — Turn anything into structured intelligence",
  description:
    "Paste a URL, article, or raw text and get a clean brief: key points, risks, opportunities, and actions — powered by AI.",
  openGraph: {
    title: "BriefOS — Turn anything into structured intelligence",
    description: "AI-powered intelligence briefs from any source, in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
