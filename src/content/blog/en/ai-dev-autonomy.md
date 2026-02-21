---
id: ai-dev-autonomy
icon: Workflow
order: 4
draft: true
tags: [draft]
date: 2026-02-21
readTime: 11 min read
---

# AI dev autonomy in the delivery cycle: what actually works (draft)

AI autonomy does not run on a magic prompt: it runs on strict guides, controlled environments, and a disciplined multi-branch workflow.

## 1) Guides are the foundation

On `top-ai-ideas-fullstack`, gains come first from explicit guides (`.cursor/rules/*.mdc`) and how they connect to branch planning. Without that frame, the agent codes fast but drifts fast.

In practice, guides are used to:
- constrain what the agent can and cannot do
- enforce expected quality gates
- keep execution in **spec -> plan -> build -> qa** order

## 2) Environment management matters as much as model quality

Autonomy depends on reproducible environments:
- explicit commands
- bounded environment variables
- stable containers
- datasets aligned with each test purpose

My choice is `make` as the language-agnostic layer (with `npx` on the TypeScript side when needed). The point is to avoid coupling delivery flow to one language stack.

Typical command families:
- unit tests
- integration tests
- e2e tests
- quality gates (lint/typecheck)
- partial/final UAT

## 3) Multi-branch + worktree for parallel execution

The conductor model requires multiple active branches. `git worktree` is key to running parallel environments on the same baseline:
- one environment for e2e with test data
- one environment for UAT with near-production data
- one environment for urgent fixes

That separation is what keeps speed without mixing validation objectives.

## 4) AI tests are still flaky: real-call vs mock tradeoff

The biggest current cost sink is AI test stability. There is still no perfect compromise between mocks and real model calls.

Current operating compromise:
- narrow real-call perimeter using **4.1nano** to reduce cost and latency
- the rest in mock/synthetic mode to keep CI predictable

It is imperfect, but it keeps delivery moving without blowing up budget or pipeline time.

## 5) Operational workflow: autocommit, CI supervision, and UAT cadence

The workflow that scales:
- structured autocommit (clear traceability)
- continuous CI supervision
- manual UAT combined with regular automation
- master-plan steering + specialized sub-branches

In conductor/subagent mode, this discipline is mandatory: otherwise agents move fast, but not in the same direction.

## 6) Current bottleneck: branch convergence at high speed

The hard problem is not generating code, it is merging safely at high cadence. As velocity increases, orthogonalization gets harder:
- API contract collisions
- schema collisions
- data-assumption collisions

Convergence cost can quickly erase generation gains if initial slicing is weak.

## Conclusion: progressive inversion of test logic

For a long time, I was mostly in "partial UAT" mode: I deferred many test evolutions to the end to avoid data disturbance and reduce waiting time.

I am now inverting that logic: giving agents more end-to-end autonomy up to e2e, and moving final validation earlier in the cycle. I still do not have a final position on "which model for which autonomy level"; that will be the next article.

Fabien Antoine

## Références

- [Top AI Ideas - Repository GitHub](https://github.com/rhanka/top-ai-ideas-fullstack)
- [Top AI Ideas - Rules MDC](https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules)
- [Top AI Ideas - Produit](https://top-ai-ideas.sent-tech.ca)
- [Who I am](/blog/who-i-am)
