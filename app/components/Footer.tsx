const ALL_TOOLS = [
  { name: "BriefOS", url: "https://briefos-silk.vercel.app", desc: "AI intelligence briefs", live: true },
  { name: "PostCraft", url: "https://postcraft-one.vercel.app", desc: "AI post generator", live: true },
  { name: "InvoiceKit", url: "https://invoicekit-pi.vercel.app", desc: "Invoice generator", live: true },
  { name: "PortGuard", url: "https://portguard-six.vercel.app", desc: "Port scanner", live: true },
  { name: "SafeLink", url: "https://safelink-wheat.vercel.app", desc: "Link safety", live: true },
  { name: "SubnetPilot", url: "https://subnetpilot.vercel.app", desc: "Network subnet planner", live: true },
  { name: "ThreatPulse", url: "https://threatpulse-six.vercel.app", desc: "Threat intel feed", live: true },
  { name: "MeetingMind", url: "https://meetingmind-pied-one.vercel.app", desc: "Meeting notes AI", live: true },
  { name: "ContractLens", url: "https://contractlens-rho.vercel.app", desc: "Contract review AI", live: true },
  { name: "DayForge", url: "https://dayforge-psi.vercel.app", desc: "Daily planning AI", live: true },
  { name: "Exposure Watch", url: "", desc: "Breach checker", live: false },
];

export default function Footer({ current = "BriefOS" }: { current?: string }) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
          More free tools by ArkNet Digital
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ALL_TOOLS.filter((t) => t.name !== current).map((t) =>
            t.live ? (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-0.5 rounded-xl border border-border bg-surface-2 px-4 py-3 transition-colors hover:border-accent/40"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {t.name}
                </span>
                <span className="text-xs text-muted">{t.desc}</span>
              </a>
            ) : (
              <div
                key={t.name}
                aria-disabled="true"
                className="flex flex-col gap-0.5 rounded-xl border border-border bg-surface-2 px-4 py-3 opacity-50"
              >
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
                <span className="text-xs text-muted">Coming soon</span>
              </div>
            )
          )}
        </div>
        <p className="mt-8 text-center text-xs text-muted/60">
          Built by ArkNet Digital · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
