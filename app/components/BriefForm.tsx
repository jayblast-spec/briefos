"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BriefOutput } from "../api/brief/route";

type State = "idle" | "loading" | "error" | { demo: boolean; brief: BriefOutput };

const VERDICT_STYLE: Record<string, string> = {
  Positive: "text-safe border-safe/40 bg-safe/10",
  Neutral: "text-warn border-warn/40 bg-warn/10",
  Negative: "text-danger border-danger/40 bg-danger/10",
};

function BriefSection({ title, items, delay }: { title: string; items: string[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-2"
    >
      <h4 className="text-xs font-semibold uppercase tracking-widest text-accent-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span className="mt-0.5 text-accent shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function BriefForm() {
  const [mode, setMode] = useState<"text" | "url">("text");
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || state === "loading") return;
    setState("loading");

    const body = mode === "url" ? { url: value.trim() } : { content: value.trim() };

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setState("error"); return; }
      setState(data as { demo: boolean; brief: BriefOutput });
    } catch {
      setState("error");
    }
  }

  const isResult = typeof state === "object";
  const brief = isResult ? state.brief : null;

  return (
    <section id="brief" className="mx-auto w-full max-w-2xl px-4 pb-32">
      {/* Mode toggle */}
      <div className="mb-4 flex rounded-xl border border-border bg-surface p-1 w-fit">
        {(["text", "url"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === m ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {m === "text" ? "Paste text" : "Enter URL"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === "text" ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste an article, research paper, meeting notes, or any text you want briefed…"
            rows={6}
            className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none leading-relaxed"
          />
        ) : (
          <input
            type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://techcrunch.com/article/…"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        )}

        <button
          type="submit"
          disabled={state === "loading" || !value.trim()}
          className="group flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-50 hover:opacity-90 active:scale-[0.99]"
        >
          {state === "loading" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating brief…
            </>
          ) : (
            "Generate brief →"
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
          >
            Something went wrong. Check the URL or paste the text directly.
          </motion.div>
        )}

        {isResult && brief && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-col gap-6"
          >
            {/* Demo badge */}
            {state.demo && (
              <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft px-3 py-2 text-xs text-accent-2">
                <span>◈</span>
                Demo mode — add your GROQ_API_KEY in Vercel to brief real content
              </div>
            )}

            {/* Header card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-foreground leading-snug">{brief.title}</h3>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${VERDICT_STYLE[brief.verdict] ?? VERDICT_STYLE.Neutral}`}>
                  {brief.verdict}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">{brief.summary}</p>
            </motion.div>

            {/* Sections grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <BriefSection title="Key Points" items={brief.keyPoints} delay={0.1} />
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <BriefSection title="Action Items" items={brief.actionItems} delay={0.15} />
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <BriefSection title="Risks" items={brief.risks} delay={0.2} />
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <BriefSection title="Opportunities" items={brief.opportunities} delay={0.25} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
