---
id: ai-dev-autonomy
icon: Workflow
order: 4
date: 2026-02-21
readTime: 11 min read
---

# AI autonomy in the dev cycle

AI autonomy is not powered by a magic prompt. It depends on strict guardrails ([see BMAD, Google Spec Kit, etc.](/blog/ai-assisted-software-engineering)), a controlled environment, and a disciplined single- or multi-branch workflow.

This is even more important as [model capabilities keep increasing](/blog/recent-progress-in-model-capabilities). If their power is obvious for small applications (this blog, initially built in React with Lovable, was moved to Svelte with a single prompt), keeping pace on larger developments requires organization to harvest the opportunity while managing risk.

## 1) Guides are the foundation

On `top-ai-ideas-fullstack`, gains come first from guides (`.cursor/rules/*.mdc`) and how they connect with branch planning. Without this framework, the agent codes fast and drifts fast.

In practice, guides help:
- constrain what the agent is allowed to do
- recall expected quality gates
- enforce an execution order of **spec -> plan -> build -> qa**
- organize planning and progress tracking (checklists)

## 2) The environment matters as much as the model

AI autonomy relies on reproducible environments:

- defined environments (branches/tests)
- explicit commands
- bounded environment variables
- stable containers
- a dataset adapted to each test type

My choice is `make` as a language-agnostic layer (`npx` is too TypeScript-centric and not well wired for Svelte). The goal is to avoid coupling the workflow to a single language.

Examples of command families for testing and quality:

- unit tests
- integration tests
- e2e tests
- quality checks (lint/typecheck)

And also for development and debugging:

- clean/backup/restore/db queries (sometimes the bug is data-related, in database state)
- logs (there are many environments and components)

And CI as well (Docker image handling, security tests, and code metrics).

In practice, sessions run from prompts within this established framework and these tools can be autonomous from specification through CI supervision; the important part is staying involved on SPEC and UAT (I still think we need better UX quality to be truly production-ready).

## 3) Test environment separation

Good testing practice is to separate test environments so each can be used frequently. Docker (or k8s) enables this scaling without pain, including parallel operation on a local machine:

- one environment for e2e on test data
- one environment for UAT on near-prod data
- one environment for urgent fixes

This separation keeps speed while avoiding mixed validation goals and enables task parallelization.

Separate environments also allow keeping realistic UAT test data without reloading everything each time. It has been the biggest driver of improvement because UATs have become very frequent (roughly 50% of the work, with 20–30% of that often in debugging).

## 4) Multi-branch + worktrees to run in parallel

Multiplying environments, combined with a sub-agent setup, creates an organization and context-switching challenge.

To test multiple branches (sometimes needed even as conductor to unblock situations), I had to enforce centralization of UAT to preserve stability.

Initially I switched environments (Chrome ports) for each branch, which forced me to seed each database (not the hardest part), and exploded the number of test tabs (multi-user + maildev validation + one or two app screens, plus Chrome plugin dev).

Today I keep the active dev branches as worktrees (`tmp/feat-slug-branch-name`), and I ask (for debugging, demoing, or UAT) either the conductor or the branch itself to switch back to root for a stable UAT environment. The only downside is when two parallel branches require a data model change; in that case, you need dedicated merge time before splitting out again.

## 5) AI testing is still flaky: real calls vs mock tradeoff

One of the biggest cost drivers today remains AI test stability (especially in an "agentic" app like mine). I do not yet have a perfect real vs mock compromise.

Current compromise:

- limited real-call scope (model **4.1nano**) to reduce cost and latency
- the remaining scope in mock/synthetic mode to keep CI stable

It is imperfect, but it allows us to continue shipping without blowing up budget or pipeline time.

## 6) Operational workflow: autocommit, CI, and cadenced UAT

The workflow that holds:

- structured autocommit (clear traceability)
- continuous CI supervision
- coordinated UAT + regular automation
- leadership by a master plan with specialized sub-branches

In conductor/sub-agent mode, this discipline is mandatory. Without it, agents move fast but in different directions.

## 7) Current bottleneck: convergence at high speed

The real difficulty is no longer writing code, but merging cleanly at high cadence. As velocity increases, orthogonalization gets harder:

- API contract collisions
- schema collisions
- data-assumption collisions
- code file collisions

Convergence cost can quickly erase generation gains if initial slicing is poor.

## Conclusion: progressively inverting the testing logic

For a long time, I relied on dominant "partial UAT": I delayed many test evolutions to the end so as not to disturb data and reduce wait.

I am now inverting this logic: giving agents more full autonomy up through e2e, and surfacing final validations earlier.

I still do not have a final opinion on “which model for which autonomy level”, but since the trend is toward greater autonomy, I will be measuring productivity impact. That will be the topic of the next article.

Fabien Antoine

## References

- https://github.com/rhanka/top-ai-ideas-fullstack
- https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/PLAN.md
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/BRANCH_TEMPLATE.md
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/Makefile
- [Who I am](/blog/who-i-am)
