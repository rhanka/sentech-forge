---
id: coding-assistant-alternatives
icon: Scale
order: 3
date: 2026-02-21
readTime: 14 min read
---

# Cursor alternatives: field benchmark

# This benchmark is not academic: it runs alongside real delivery, under the main constraint of not breaking developer velocity (cf. article 1).

## Method caveat

I apologize in advance for my lack of persistence with some tools: I sometimes dropped them quickly because I had to keep delivering in parallel. The number one criterion remains useful velocity in real-world context.

## Evaluation criteria

I evaluated the tools with 6 operational criteria:
1. access to the best models (up to date)
2. provider SSO (Gemini, ChatGPT Pro, Anthropic, etc.)
3. CLI tooling governance (whitelist/blacklist, e.g. allowing `git commit`, blocking `git push`)
4. subagentic workflows
5. checkpoints (rollback points)
6. code interaction in greybox mode (links to modified files, quick audit), rather than blackbox

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
| Cursor | Yes | Partial | Yes | Yes (ergonomic) | Yes | Yes | Big con: price at scale |
| Roo Code | Yes | Yes (more) | Yes (but complex to configure) | Partial | Partial | Medium | Slows planning workflow |
| Codex VS Code | Yes (Codex 5.3) | Yes (ChatGPT Pro), no Gemini Pro 3.1 in my setup | Yes (easy) | CLI only (no UI) | Yes (files), no chat rollback | Yes | Good current compromise |
| Opencode | Yes | Yes (open) | Yes | Partial | Partial | Limited interactive code flow | Dropped quickly |
| Antigravity | Yes | Yes (Google SSO) | Difficult | Partial | Partial | Medium | Blocking: shell does not yield control |
| Blackbox | Less up-to-date | Limited | Limited | Not significant | Limited | Rather blackbox | Dropped immediately |

## Pros and cons by tool

### Cursor

Pros:
- checks almost every box
- ergonomic checkpoints
- practical tool validations work well (but hard to change afterward)
- ergonomic subagentic workflow
- very good overall productivity

Cons:
- the main bug, at scale, is cost (price appetite): [see cost analysis in a previous article](/blog/recent-progress-in-model-capabilities)
- it wants to co-author your commits (there are workarounds, of course)

### Roo Code (VS Code plugin)

Pros:
- strong SSO point, which lets me use my subscriptions

Cons:
- plan mode feels rigid and not very steerable/reorientable
- does not fit well with workflow directives (it wants to follow its own plan and fill in my progress items) in `BRANCH_template.md` (todo/progress)
- tool setup is somewhat slow and time-consuming before it becomes autonomous

### Antigravity

Pros:
- useful Google SSO
- some Opus 4.6 credits (burned in one day)

Cons:
- tool configuration is not simple
- shell does not return control to the agent when no error occurs: completely blocking for autonomy

### Opencode

Pros:
- probably an alternative I will keep following, if my own plugin takes off
- strong openness (SSO to ChatGPT and other models)
- you can set your system prompts
- access to many alternative models
- subagentic

Cons:
- limited interactive code access via CLI
- UI does not allow co-editing (limiting for some cases)

### Blackbox

Pros:
- I did not identify a meaningful plus in my context, maybe access to alternative models

Cons:
- experience close to Cursor, but with less access to up-to-date models (a blocker for me because the performance gap is meaningful)
- cost model like Cursor, which is exactly what I wanted to avoid

### Codex (VS Code plugin)

Pros:
- ChatGPT Pro SSO is a major plus for me
- steering mode: you can keep speaking while compute is running without interruption, which is hugely valuable
- tool configurability is rather straightforward, including background mode
- subagentic: very accessible via CLI. A small framework is needed to make it possible through UI (possible with conductor-like directives + background CLI call)

Cons:
- no access to Gemini Pro 3.1 or Opus 4.6 in my current setup (limiting full benchmarking)
- checkpointing is useful on files, but there is no complete return on chat history (this is very annoying: cannot re-edit a prompt to go back like on Cursor, only cancel file edits, which forces adding clarifying explanations and creates confusion)
- no UI for subagentic yet (it requires directives to become autonomous, not obvious)

## Conclusion

Up-to-date models (Codex 5.3, Opus/Sonnet 4.6, Gemini 3.1) are becoming essential to achieve reliable dev autonomy and follow workflow guidelines.

The right coding tool must provide:
- access to the best models ([cf. productivity gains of at least x2](/blog/recent-progress-in-model-capabilities))
- robust checkpoints. These are crucial: they are the new pre-commits; you must be able to revert with minimal complexity (branches are expensive to keep around)
- steering. We have to be able to amend the plan; we code so fast that it must be possible to seize opportunities and avoid speed bumps
- code interaction in greybox
- fine CLI governance (build/CI tooling)
- subagentic operation without friction (in my view, maturity is still improvable and needs cost control to represent a real gain)
- SSO / BYOK - freedom to switch models and/or plans

Pricing remains a hard breakpoint: great UX does not indefinitely offset an unsustainable cost model.

Fabien Antoine

- [Who I am](/blog/who-i-am)
