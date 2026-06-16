import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BriefOS | Executive briefing',
  description: 'compress scattered context into a board-ready decision brief',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
