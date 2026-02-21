---
id: ai-assisted-software-engineering
icon: BrainCircuit
order: 1
date: 2026-02-21
readTime: 14 min
---

# Vibe coding vs AI-assisted software engineering

AI-generated code alone does not produce reliable software. You need to understand component structure, cloud computing, operating systems, databases, orchestrators, backend architecture (APIs and queues), and frontend architecture (stores, styling, interaction flows), and above all, user needs. Mastering that full picture is software engineering; coding itself is ultimately only a small part.

The real performance gap comes from the operating system around delivery: specification, planning, lot-based execution, and continuous QA.

## A simple cycle that has barely changed

**Vibe coding** is useful to accelerate prototyping. In production, the question is not "how much code was generated", but "how many changes were integrated without breaking the system".

In practice, AI-assisted software engineering still relies on four loops that, fundamentally, have not changed much:

1. `SPEC`: frame needs, constraints (including technical constraints), and non-goals.
2. `PLAN`: split work into verifiable, orthogonal lots.
3. `BUILD`: implement with explicit traceability and isolated branches.
4. `QA`: test continuously (unit/integration/e2e + UAT), not only at the end.

## Vibe coding vs AI-assisted engineering

| Axis | Vibe coding | AI-assisted software engineering |
|---|---|---|
| Primary goal | Move fast on an idea | Deliver reliably and repeatably |
| Starting point | Prompt + intuition | Spec + plan + lots |
| Risk management | Low | Explicit (gates, UAT, convergence) |
| Test posture | Often late | Continuous and structured |
| Team effect | Hard to align | Clear orchestration and ownership |
| Technical debt | Rises quickly | Contained by governance |

## Framework comparison: BMAD & Co

| Approach | Dominant logic | Core artifacts | Strength | Main risk |
|---|---|---|---|---|
| BMAD | Structured analyze/plan/build/qa cycle | Explicit plans, phases, checks | Strong frame for industrialization | Can become heavy without prioritization |
| GitHub Spec Kit | Spec-first, artifact-driven workflow | Spec, plan, checklist, tasks | Excellent product-to-tech traceability | Upfront overhead for "just code now" teams |
| Getting Shit Done (GSD) | Pragmatic delivery with lightweight discipline | Short loops, concrete goals, fast feedback | High speed/clarity ratio | Can drift into "just do it" if QA is weak |
| Conductor Model | Multi-agent/multi-branch orchestration | Wave plan, supervision, convergence | Scales orthogonal workstreams well | Coordination cost if boundaries are weak |

Practical reading:
- BMAD and Spec Kit strengthen upstream decision quality.
- GSD optimizes execution cadence.
- Conductor optimizes parallelization and convergence.

Each method brings useful pieces, but they are globally quite rich. Their application depends on team structure and on the final purpose of the code. In practice, it is more useful to adapt and master these methods than apply them blindly, as they tend to become too heavy (even GSD). Framing constraints is not the final goal. We should also keep AI-assistant autonomy in view.

## Comparison with the method used in `top-ai-ideas-fullstack`

On [`top-ai-ideas-fullstack`](https://github.com/rhanka/top-ai-ideas-fullstack), we used a very operational `spec/plan/build/qa` hybrid, documented in [`/.cursor/rules`](https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules):

| Step | Implementation used |
|---|---|
| `SPEC` | `spec/*.md` + explicit decisions + traceability to `TODO.md` |
| `PLAN` | `PLAN.md` (dependency graph, waves, orthogonal branches) + per-axis `BRANCH.md` |
| `BUILD` | Incremental lots, isolated `tmp/` workspaces, conductor/subagent orchestration |
| `QA` | Per-lot gates (typecheck/lint/scoped tests), branch convergence, wave convergence, validation UAT |

The framing is globally aligned with the methods above, but with directives directly applicable to code (Make-based test implementation, and concrete autonomy directives for build tasks such as DB queries, logs, etc.).

## Development metrics (measured)

### Continuous instrumentation

Since the start of this side project (around 20 hours/week on evenings and weekends), I wired continuous measurement directly into the workflow using the same Make targets (`cloc`, `test-cloc`, `test-count`). The goal is not metric theater; it is operational steering: detect real slowdowns early, validate that refactoring phases still produce tangible value, and immediately spot when test debt starts diverging.

### Weekly SLOC evolution (commit-based)

![Weekly total SLOC evolution for top-ai-ideas-fullstack](/blog/charts/top-ai-ideas-sloc-weekly.svg)

The chart combines four signals: bars for weekly total SLOC, an orange 4-week smoothing curve, a red dashed trend for **2025-W40 -> 2025-W50**, and a green dashed trend for **2025-W51 -> 2026-W08**, with a vertical break marker at **2025-W51** (progressive shift to near-exclusive GPT-5.2 then GPT-5.3 Codex usage, with selective Claude checks evaluated as equivalent on specific cases; see [Recent Progress in Model Capabilities](/blog/recent-progress-in-model-capabilities)).

### Trend reading and progression state

If SLOC is used as a productivity proxy, the slope moves from roughly **+2,460** SLOC/week before **W51** to **+5,204** after **W51** (almost **x2**). On raw week-to-week delta, it shifts from **+2,751** to **+5,409** SLOC/week (**x1.97**). This signal must be treated carefully: more SLOC does not automatically mean better software. Still, the operational feel matches the curve: more shipped functionality per cycle, fewer destabilizing regressions, and much less frustration from repetitive dead-end loops.

### Tests: volume, rates, and ratios vs SLOC

We test heavily because, in AI-assisted delivery, regressions ramp up fast when QA guardrails are weak: over the period, `test_sloc / cloc_total` rises from **9.7%** to **28.0%**, and test-case density increases from **4.9** to **10.1** cases per **1k** SLOC (**56** cases for **11,401** SLOC, then **954** cases for **94,303** SLOC). This aligns with the e2e isolation guidance from [Playwright](https://playwright.dev/docs/best-practices) and [Cypress](https://docs.cypress.io/app/core-concepts/test-isolation), but robust automation remains the hard part for realistic multi-user scenarios. To keep velocity, we optimized CI with matrixed batches ([GitHub Actions matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)) and orthogonalized user profiles plus data sets to reduce concurrency collisions without blowing up pipeline time.

### Numeric synthesis

Overall, we move from **11,401** to **94,303** SLOC between **2025-10-05** and **2026-02-20** (**+82,902**, **x8.27**). The trajectory stays compatible with a **~100 kSLOC** order of magnitude in **5 months**, but the core value is not raw volume; it is sustaining that pace without sacrificing delivery stability.

## Role distribution (1-person cadence)

In this operating mode, the real split looks like **<5%** pure coding, **40%** SPEC, **50%** UAT (including roughly **30%** feedback/support inside that loop), and **5%** architecture peer/review. The key shift in the AI paradigm is here: less effort goes into typing code, while more effort goes into framing intent, enforcing constraints, supervising convergence, and validating user outcomes. AI already helps in those layers, but the next step is stronger modularization of intent and constraints to automate more of that steering without losing control.

## Conclusion

**Vibe coding** is excellent for a product-owner posture: exploring quickly, testing hypotheses, and converging on intent. The delivery role then evolves toward an **AI-assisted software engineer**, accountable across functional, software, and cloud architecture layers so the product remains durable, robust, and evolvable. That framing is consistent with the most recent DORA evidence (Google, 2025): AI acts as an amplifier, and outcomes are primarily driven by the socio-technical system rather than tooling alone ([DORA 2025 on Google Research](https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/), [DORA report hub](https://dora.dev/research/2025/dora-report/)).

## References

- [Top AI Ideas - GitHub repository](https://github.com/rhanka/top-ai-ideas-fullstack)
- [Top AI Ideas - MDC rules](https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules)
- [Top AI Ideas - Product](https://top-ai-ideas.sent-tech.ca)
- Barras, C., Geoffrois, E., Wu, Z., & Liberman, M. (2001). *Transcriber: Development and use of a tool for assisting speech corpora production*. Speech Communication, 33(1-2), 5-22. https://doi.org/10.1016/S0167-6393(00)00067-4
- [Who I am](/blog/who-i-am)

Fabien Antoine
