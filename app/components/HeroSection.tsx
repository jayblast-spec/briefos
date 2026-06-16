"use client";

import { motion } from "framer-motion";

const WORDS = ["URLs.", "articles.", "research.", "notes.", "anything."];

export default function HeroSection({ onTryClick }: { onTryClick: () => void }) {
  return (
    <section className="aurora-bg grid-bg relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Glowing orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-pulse" />
          AI-Powered Intelligence Briefs
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Turn anything into
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            structured intelligence
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Paste a URL, article, or raw text. Get a clean, structured brief — key points, risks,
          opportunities, and action items — in seconds.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onTryClick}
            className="group relative overflow-hidden rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:opacity-90"
          >
            <span className="relative z-10">Generate a brief →</span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-2 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <span className="text-xs text-muted">Free · No signup · Works instantly</span>
        </motion.div>

        {/* Scrolling word chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {WORDS.map((w) => (
            <span
              key={w}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
            >
              {w}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-xs">Scroll to brief</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="h-4 w-px bg-muted/50"
        />
      </motion.div>
    </section>
  );
}
