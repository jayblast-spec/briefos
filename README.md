<div align="center">

# BriefOS

### Any URL, Article, or Raw Text — Compressed Into a Decision-Ready Brief

BriefOS takes a URL, a pasted article, or raw text and turns it into a structured intelligence brief — Summary, Key Points, Implications, Action Items, and a Source Quality signal — in seconds, with no account required. It is built to support a decision, not just summarize a wall of text.

<p>
  <a href="https://briefos-silk.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/briefos"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Product%20Layer-007ACC?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-Design%20System-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-Interface%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-Fast%20Inference-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated BriefOS headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=URL+or+raw+text+%E2%86%92+Structured+brief;Summary+%2B+Key+Points+%2B+Implications;Source+quality%2C+not+just+a+summary;No+account%2C+no+signup%2C+no+wait">
</p>

</div>

## What It Does

BriefOS accepts a URL, a pasted article, or raw text (research notes, email threads, documents) and compiles it into a structured brief: Summary, Key Points, Implications, Action Items, and a source credibility signal that flags content quality and bias indicators. The output is exportable to PDF or markdown so it can be archived or shared directly. There is no login wall — input goes in, a brief comes out.

## How It Works

- `app/page.tsx` renders the landing shell with `HeroSection`, `FeaturesSection`, and the `BriefForm` input component.
- `app/api/brief/route.ts` accepts the submitted URL or text and calls the Groq Chat Completions API against a typed `BriefOutput` schema, falling back to a fixed demo brief when no API key is set.
- Styling is Tailwind CSS with Framer Motion handling interface transitions; the app is a single Next.js App Router deployment with no database layer.

## Engineering Notes

**The real problem:** a "summary" that's just shorter text still makes you do the work of figuring out what to actually do with it — the useful output isn't a shorter version of the input, it's a different shape entirely (key points, implications, action items).

**The approach:** `brief/route.ts` prompts against a typed schema that separates summary, key points, implications, and action items into distinct fields, plus a source-credibility signal, rather than returning one undifferentiated block of prose.

**One real number:** the demo fallback (no `GROQ_API_KEY`) is a fully worked brief, not a placeholder — real key points and action items, so the product is honestly demoable without a key.

**Not handled yet:** `app/api/intelligence` is a separate, disconnected decorative endpoint — it is not part of the real brief-compilation pipeline.

## Live

[briefos-silk.vercel.app](https://briefos-silk.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| AI | Groq (`llama-3.3-70b-versatile`) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Deployment | Vercel |

<div align="center">

<img alt="Footer" src="https://capsule-render.vercel.app/api?type=rect&height=60&color=0:1D4ED8,55:0B1E3D,100:020617&text=michael%40arknet.digital&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">

</div>
