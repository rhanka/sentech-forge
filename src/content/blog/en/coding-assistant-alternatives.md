---
id: coding-assistant-alternatives
icon: Scale
order: 3
draft: true
tags: [draft]
date: 2026-02-21
readTime: 14 min read
---

# Cursor alternatives: a field benchmark (draft)

This benchmark is not academic: it was run while shipping real features, with one hard constraint: keep delivery velocity high (see article 1).

## Method caveat

Quick disclaimer: I did not persist equally on every tool. In parallel, I still had to ship, so I dropped some tools early when they started reducing useful throughput.

## Evaluation criteria

I scored tools on 6 operational criteria:
1. access to frontier models (up-to-date)
2. provider SSO (Gemini, ChatGPT Pro, Anthropic, etc.)
3. CLI tool governance (whitelist/blacklist, e.g. allow `git commit`, block `git push`)
4. subagent capabilities
5. checkpoints (rollback)
6. greybox code interaction (direct links to modified files, fast audit), not blackbox behavior

## Tools tested

- Roo Code (VS Code plugin)
- Codex (VS Code plugin)
- Opencode
- Antigravity
- Blackbox
- Cursor (baseline)

## Global comparison table

| Tool | Up-to-date models | Provider SSO | CLI whitelist/blacklist | Subagentic | Checkpoint | Code interaction (greybox) | Cost / feedback |
|---|---|---|---|---|---|---|---|
| Cursor | Yes | Partial | Yes | Yes (ergonomic) | Yes | Yes | Main issue: expensive at scale |
| Roo Code | Yes | Yes (strong point) | Yes (but complex setup) | Partial | Partial | Medium | Friction with planning workflow |
| Codex VS Code | Yes (Codex 5.3) | Yes (ChatGPT Pro), no Gemini Pro 3.1 in my setup | Yes (easy) | CLI-only for now | Yes (file rollback), no full chat rollback | Yes | Best current tradeoff for me |
| Opencode | Yes | Yes (open model access) | Yes | Partial | Partial | Limited interactive code flow | Left quickly |
| Antigravity | Yes | Yes (Google SSO) | Harder to configure | Partial | Partial | Medium | Blocking issue: shell handoff |
| Blackbox | Less up-to-date | Limited | Limited | Not meaningful | Limited | More blackbox-like | Left immediately |

## Pros and cons by tool

### Cursor

Pros:
- checks almost every box
- ergonomic subagent experience
- high overall productivity

Cons:
- the main bug is pricing greed at scale

### Roo Code (VS Code plugin)

Pros:
- solid SSO story

Cons:
- plan mode felt rigid for my workflow
- struggled to absorb my workflow directives from `BRANCH.md` (todo/progress state)
- tool configuration is heavier than expected

### Antigravity

Pros:
- useful Google SSO
- some Opus 4.6 credits (burned in a day)

Cons:
- tool configuration is not simple
- shell does not hand control back properly to the agent, which blocks autonomy

### Opencode

Pros:
- strong openness (SSO to ChatGPT and other providers)
- open philosophy around code access

Cons:
- limited interactive code flow through CLI in my usage
- browser UI not yet significantly better for my use case
- I exited quickly

### Blackbox

Pros:
- I did not find a strong positive point in my context

Cons:
- feels like another Cursor-style tool with weaker access to up-to-date models
- high marketing noise (including LinkedIn spam in my case)
- immediate exit

### Codex (VS Code plugin)

Pros:
- ChatGPT Pro SSO is a major plus for me
- steering mode: I can continue giving input while the agent is computing
- tool configuration is straightforward
- strong control in CLI mode, especially for subagent workflows

Cons:
- no Gemini Pro 3.1 access in my current setup (limits full benchmarking)
- checkpoint works well for files, but no full conversation rollback yet
- no full subagent UI yet (must use CLI)

## Conclusion

Up-to-date models (Codex 5.3, Opus/Sonnet 4.6, Gemini 3.1) are becoming mandatory for reliable dev autonomy and workflow-guide compliance.

The right coding tool must provide:
- access to top models
- strong checkpoints
- greybox code interaction
- precise CLI governance
- practical subagent workflows

Pricing remains a hard breakpoint: great UX does not indefinitely offset an unsustainable cost model.

## About the author

- Fabien Antoine
- [Who I am](/blog/who-i-am)
