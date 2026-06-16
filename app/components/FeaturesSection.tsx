"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "⚡",
    title: "Any source, instantly",
    desc: "Paste URLs, news articles, research papers, raw notes, meeting transcripts — BriefOS handles it all.",
  },
  {
    icon: "◈",
    title: "Structured by default",
    desc: "Every brief follows the same format: summary, key points, risks, opportunities, and action items. No fluff.",
  },
  {
    icon: "🧠",
    title: "AI that analysts trust",
    desc: "Powered by state-of-the-art language models. Trained on reasoning, not vibes.",
  },
];

function FeatureCard({ icon, title, desc, i }: { icon: string; title: string; desc: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-xl">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          From noise to clarity
          <span className="text-accent-2"> in one step</span>
        </h2>
        <p className="mt-3 text-sm text-muted">No prompting required. Just paste and read.</p>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} i={i} />
        ))}
      </div>
    </section>
  );
}
