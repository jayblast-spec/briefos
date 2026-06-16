export type IntelligenceInput = { input?: string };
const product = {
  "repo": "BriefOS",
  "suite": "AI Productivity Suite",
  "domain": "Executive intelligence",
  "accent": "from-blue-300 via-cyan-200 to-slate-100",
  "hero": "Turn scattered context into the brief a serious decision deserves.",
  "sub": "BriefOS is an executive briefing room for founders, operators, advisors, and teams that need evidence, risks, options, and next actions without drowning in notes.",
  "input": "Paste customer feedback, investor notes, roadmap tension, or a messy project update",
  "cta": "Build executive brief",
  "score": "Brief readiness",
  "modules": [
    [
      "Signal intake",
      "Convert messy notes into decision-grade context."
    ],
    [
      "Option framing",
      "Lay out choices, tradeoffs, risks, and timing."
    ],
    [
      "Action ledger",
      "Assign owners, due dates, and unresolved questions."
    ],
    [
      "Board-ready export",
      "Prepare the summary a leader can actually act on."
    ]
  ],
  "rows": [
    [
      "Decision brief",
      "Leadership",
      "High",
      "Summarize what matters, what changed, and what action is required."
    ],
    [
      "Risk memo",
      "Operations",
      "Medium",
      "Surface assumptions, dependencies, and what could fail."
    ],
    [
      "Board update",
      "Founder",
      "High",
      "Compress progress, blockers, asks, and metrics."
    ],
    [
      "Client summary",
      "Consulting",
      "Medium",
      "Make stakeholder context easier to review and approve."
    ]
  ],
  "missions": [
    [
      "Source-backed brief memory",
      "Persist citations and source snippets for every generated brief."
    ],
    [
      "Decision comparison mode",
      "Compare two or more strategic options with tradeoffs."
    ],
    [
      "Board-pack PDF export",
      "Generate clean PDF output with assumptions, actions, and owners."
    ],
    [
      "Calendar follow-up loop",
      "Turn unresolved brief questions into scheduled follow-ups."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 57 + Math.min(30, Math.floor(subject.length / 6)); if (/risk|urgent|investor|client|payment|contract|meeting|decision|launch|proof|delay/i.test(subject)) score += 7; return Math.min(98, score); }
function band(score: number) { return score >= 86 ? 'strong' : score >= 72 ? 'ready' : score >= 60 ? 'needs review' : 'starter'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.repo,
    brand: 'ArkNet Digital',
    suite: product.suite,
    domain: product.domain,
    subject,
    score,
    status: band(score),
    executive_summary: product.sub,
    intelligence_map: product.modules.map(([label, value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })),
    action_queue: product.rows.slice(0, 3).map(([item, owner, priority, note]) => ({ action: item + ' - ' + owner, priority, impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    generated_at: new Date().toISOString()
  };
}
