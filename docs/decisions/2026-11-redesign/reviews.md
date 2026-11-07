# Independent reviews — site redesign dossier (revision 1)

Date: 2026-11-05. Reviewers: Codex (codex-rescue) and Claude Opus (general-purpose), run in parallel on revision 1, read-only, without access to each other's findings.

## Converging findings (both reviewers), applied in revision 2

- Embedding the validated governance HTML via `Embed` does not satisfy "no custom code": iframe content is not DS. It also embeds the owner feedback log, internal Airbus project mentions and answer controls. → Q3 reframed; recommendation moved to a 100% DS option; the embed is presented as an explicit exception.
- The token figure was misleading: multi-subscription, cache-dominated, wrong window; corrected report gives 12.37 B tokens (2026-08-12 → 09-10). → Q6 added.
- Gap list overstated: compositions of existing components cover cards and offer cards. → Q1 "what counts as custom code" added, gap table reduced.
- Q2 (rev 1) misquoted `PRODUCT.md` ("unjustified" glass only); hero cards are 95% opaque. → hero fidelity moved to decided, all elements kept.
- Q1 (rev 1) option C was a strawman, "3–4×" estimate unsupported. → replaced by sequencing question with real alternatives.
- Curateur recommendation contradicted the "measured only" policy. → merged into Q7 with a no-figure option.
- Client confidentiality must cover text, not only visuals. → Q8 rewritten.
- 1 106 municipalities is the target universe, not coverage; MatchID contradiction; FR/EN count mismatch (23/24). → listed in Q7 and the decided section.

## Codex-only findings

- The static DS audit (`sentech-design check`) does not execute the SPA, so it cannot prove "100% DS". → CI guard = browser-rendered audit + source scan.
- SEO: route shells copy one template; new routes would need router, shell and sitemap changes. → decided: single page with anchors, URLs preserved.
- `PriorityMatrix` would change the meaning of the CGI quadrant (axis = ease, not complexity; hardcoded French verdicts). → any quadrant would use `ScatterPlot`; under Q8-A none is published.

## Opus-only findings

- Blocker: main fails to build since 4e9d98c (NavDrawer missing from DS 0.34.49); production is the 2026-06-15 build. → Lot 0, stated as fact.
- The header gap is two additive `SiteConfig` keys on `AppShell variant="site"`, not a new `AppChrome` mode. → applied.
- Icon conflict with the diagram-cards spec (duotone family vs Lucide registry) and merge conflicts with the parallel DS session. → decided: Lucide for site UI, duotone for diagrams; a DS track lot sets merge order.
- `@sentropic/design-system-skills` published at 0.1.0 vs repo 0.3.2. → prerequisite noted.
- Hero cards link to sections that Q4 removes. → Q4 states the new card targets.
- Commercial decisions (currency, taxes, free CV service) were decided silently. → Q5 added.

## Not applied

- Opus suggested one question on per-case wording granularity (client/programme/vendor/generic); folded into Q8 as three options instead of a per-case matrix to keep the reading budget.
