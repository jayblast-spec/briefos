export type IntelligenceInput = { input?: string };

const product = {
  "repo": "BriefOS",
  "suite": "AI Productivity Suite",
  "category": "Executive briefing",
  "audience": "founders, operators, consultants, and leadership teams",
  "promise": "compress scattered context into a board-ready decision brief",
  "inputLabel": "Messy context, notes, or meeting dump",
  "placeholder": "Paste customer feedback, strategy notes, or project updates",
  "primary": "Build brief",
  "gradient": "from-blue-300 via-cyan-200 to-slate-200",
  "modules": [
    "Context compression",
    "Decision options",
    "Risk and assumption map",
    "Action owner table",
    "Board memo export"
  ],
  "outputs": [
    "One-page brief",
    "Options and tradeoffs",
    "Recommended next action",
    "Follow-up questions"
  ],
  "next": [
    "calendar/email ingestion",
    "board-pack PDF export",
    "decision-memory retrieval",
    "CEO morning brief automation"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
