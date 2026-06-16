export const maxDuration = 30;

const DEMO: BriefOutput = {
  title: "AI-Powered Intelligence Briefs at a Glance",
  summary:
    "BriefOS turns any article, URL, or raw text into a structured intelligence brief. The AI extracts the signal from the noise — surfacing what matters, what risks exist, and what to do next.",
  keyPoints: [
    "AI-native tools are growing 3× faster than traditional SaaS in adoption",
    "Founders who build AI-augmented workflows ship 40% faster on average",
    "The window to establish market position in AI productivity is narrow — 12–18 months",
    "Distribution and brand trust remain the primary moats, not the AI itself",
    "Most professionals still lack a trusted way to synthesize information quickly",
  ],
  risks: [
    "Over-reliance on AI output without human validation of critical decisions",
    "Information quality is only as good as the source material provided",
    "Incumbents (Notion AI, Google NotebookLM) have distribution advantage",
  ],
  opportunities: [
    "Vertical-specific briefs (legal, medical, financial) command premium pricing",
    "Team-based brief sharing creates network effects and stickiness",
    "Browser extension could capture any webpage in one click",
  ],
  actionItems: [
    "Paste your first real article above to test with live content",
    "Share this tool with your team to test collaborative brief workflows",
    "Consider which vertical of brief would be most valuable to your work",
  ],
  verdict: "Positive",
};

export type BriefOutput = {
  title: string;
  summary: string;
  keyPoints: string[];
  risks: string[];
  opportunities: string[];
  actionItems: string[];
  verdict: "Positive" | "Neutral" | "Negative";
};

const SYSTEM = `You are a senior intelligence analyst. Given source content, produce a structured JSON brief with these exact fields:
- title: string (5–10 word headline for the brief)
- summary: string (2–3 sentence executive summary)
- keyPoints: string[] (3–5 most important facts/insights, each 1 sentence)
- risks: string[] (2–4 risks or concerns worth noting, each 1 sentence)
- opportunities: string[] (2–4 opportunities or positive implications, each 1 sentence)
- actionItems: string[] (2–4 concrete next steps for the reader, each 1 sentence)
- verdict: "Positive" | "Neutral" | "Negative" (overall outlook)

Return ONLY valid JSON. No markdown fences, no explanation.`;

export async function POST(request: Request) {
  let content: string | undefined;
  let url: string | undefined;

  try {
    const body = await request.json();
    content = typeof body?.content === "string" ? body.content.trim() : undefined;
    url = typeof body?.url === "string" ? body.url.trim() : undefined;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1800));
    return Response.json({ demo: true, brief: DEMO });
  }

  let text = content ?? "";

  if (!text && url) {
    try {
      const urlObj = new URL(url.match(/^https?:\/\//i) ? url : `https://${url}`);
      const res = await fetch(urlObj.toString(), {
        headers: { "User-Agent": "BriefOS/1.0 (intelligence brief tool)" },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();
      text = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, 8000);
    } catch {
      return Response.json({ error: "Couldn't reach that URL. Paste the text directly instead." }, { status: 400 });
    }
  }

  if (!text) {
    return Response.json({ error: "Paste some text or enter a URL to brief." }, { status: 400 });
  }

  if (text.length < 50) {
    return Response.json({ error: "Content is too short — paste at least a paragraph." }, { status: 400 });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: `Source content:\n\n${text.slice(0, 6000)}` },
        ],
        temperature: 0.3,
        max_tokens: 1200,
      }),
    });

    if (!groqRes.ok) {
      return Response.json({ error: "AI service unavailable. Try again shortly." }, { status: 502 });
    }

    const data = await groqRes.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";

    let brief: BriefOutput;
    try {
      brief = JSON.parse(raw) as BriefOutput;
    } catch {
      return Response.json({ error: "AI returned an unexpected response. Try again." }, { status: 500 });
    }

    return Response.json({ demo: false, brief });
  } catch {
    return Response.json({ error: "Something went wrong. Try again shortly." }, { status: 502 });
  }
}
