---
id: recent-progress-in-model-capabilities
icon: Wrench
order: 2
date: 2026-02-20
readTime: 10 min read
---

# Recent Progress in Model Capabilities

In the previous article, I highlighted that tools alone are not enough: the method (spec/plan/build/qa) is what sustains velocity as the codebase grows (see [vibe coding vs AI-assisted software engineering](/blog/ai-assisted-software-engineering)).

## Context: 100 kSLOC in production mode

Across ~100 kSLOC delivered, most of the volume was produced with AI assistance inside a constrained workflow (previous article: distinction between vibe coding and AI-assisted software engineering).

![Weekly total SLOC evolution for top-ai-ideas-fullstack](/blog/charts/top-ai-ideas-sloc-weekly.svg)

Crossing 40 kSLOC was a real inflection point with the latest reasoning models. It is hard to say whether that shift came mostly from newer models or from growing code complexity, but it clearly pushed me toward exclusive usage of the most recent reasoning models.

## Composer phase: ~90% of initial code with Composer

During the initial phase, around 90% of the initial code volume was produced via Composer in Cursor, with only moderate use of advanced models.

On complex issues, only in around 10% of cases, I used advanced models somewhat interchangeably to flush the problem (where, in the summer on other projects, I was still manually debugging almost everything, especially the classic CSS irritants). GPT 5.1, Opus 4.5, and Gemini 3.0 were enough to resolve that 10% when heavy loops appeared with Composer.

Note: Gemini 3.0 did not really convince me in my context, with a stronger tendency to create collateral damage (handling unrequested topics, drifting away from `*.mdc` rules, touching non-targeted areas).

## Moving to 100% advanced-model usage

At 40 kSLOC, I had already gotten used to "goldfish effects" (regularly forgetting some rules late in development) and to throwing insults during stupid loops. Problem resolution in that 10% was okay, but not "wow" enough to justify wider use of advanced models.

But at that stage, I was entering longer debug periods, and tests were becoming more numerous and slower to converge at each change. Then GPT 5.2 came out. Even before Codex, its problem-solving capability clearly increased, reducing discomfort a lot, so I switched and upgraded to the $200 plan (I was on $40).

When I look at the x2 productivity curve at equal time, and at my insult rate going down (I may measure it one day since all my prompts are safely stored), I think that choice was justified.

## The tokens/cost wall: 750M -> 1.5B tokens/month

After three full months of code, I was a bit above 45 kSLOC, and at the end of December Cursor celebrated year-end by showing me a 2.5B token consumption figure. Honestly, that was a shock.

For my app development (which itself uses LLM inference), I was already measuring tokens, and I was simultaneously in a cost explosion on usage testing and automated tests, around 150M.

And of course, with productivity doubling, token consumption doubled too. It worked well, and then after a presentation about opencodex, I wanted to try subagent workflows.

## Subagent mode and the token abyss

At the end of January, I started decoupling test environments to parallelize branches better, hitting the practical limits of my old 16GB Linux PC. My Make target and directives now let me operate with a master plan and orchestrated branches.

I first discovered, with some friction, the benefits of parallelization by opening many ports to test different environments. I quickly changed method and started testing only on master to avoid multiplying data-initialization constraints for QA.

I found my rhythm in one week, then started true subagent mode. Great experience. But in a bit more than one day, Cursor asked for another $100 (I had probably already accelerated before that). My dev pace was truly faster, so I paid.

Then Opus 4.6 came out. I tried it and found it really good. But after one hour... Cursor asked again for $100 (GPT 5.3 had already started this trend). No, my productivity was not multiplied by 10.

## Exiting Cursor

Cursor does not allow using existing subscriptions (Anthropic, ChatGPT Pro, Gemini), and using your own API keys is even worse. So I explored other modes. At this stage, I am on the Codex plugin, mainly to amortize my OpenAI Pro subscription that I also use outside coding, and because the alternatives are not perfect either.

## Subscription math vs token math (1B tokens/month)

To make this concrete, I normalized costs to a simple scenario: **1B total tokens/month**, split **50% input / 50% output**, without caching discounts, batch discounts, or long-context surcharges.

### Single normalized table (subscriptions + API token pricing)

| Type | Offer / model | Pricing unit | Input ($/1M) | Output ($/1M) | Monthly figure in this comparison | Public seat token quota |
| --- | --- | --- | --- | --- | --- | --- |
| Subscription | ChatGPT Plus | $/seat/month | - | - | **$20/month** | Not disclosed (limits apply) |
| Subscription | ChatGPT Pro | $/seat/month | - | - | **$200/month** | Not disclosed ("unlimited" with guardrails) |
| Subscription | Claude Pro | $/seat/month | - | - | **$20/month** (or about **$17/month** annualized) | Not disclosed (more usage) |
| Subscription | Claude Max | $/seat/month | - | - | **from $100/month** | Not disclosed (5x or 20x vs Pro) |
| Subscription | Google AI Plus | $/seat/month | - | - | **$7.99/month** | Not disclosed (More usage tier) |
| Subscription | Google AI Pro | $/seat/month | - | - | **$19.99/month** | Not disclosed (Higher usage tier) |
| Subscription | Google AI Ultra | $/seat/month | - | - | **$249.99/month** | Not disclosed (Highest usage tier) |
| API tokens | GPT 5.3 Codex* | $/1M tokens | $1.75 | $14.00 | **$7,875/month** at 1B tokens (50/50) | N/A (token-metered API) |
| API tokens | Gemini 3.1 Pro (Preview)** | $/1M tokens | $2.00 | $12.00 | **$7,000/month** at 1B tokens (50/50) | N/A (token-metered API) |
| API tokens | Claude Opus 4.6** | $/1M tokens | $5.00 | $25.00 | **$15,000/month** at 1B tokens (50/50) | N/A (token-metered API) |
| API tokens | DeepSeek-R1-0528 (Together AI) | $/1M tokens | $3.00 | $7.00 | **$5,000/month** at 1B tokens (50/50) | N/A (token-metered API) |

\* I could not find a public standalone API tariff labeled `GPT 5.3 Codex` in the scraped pricing tables; this line uses published `gpt-5.2-codex` pricing as a proxy (fallback `gpt-5.2` if needed).

\** For Gemini 3.1 Pro and Claude Opus 4.6, this uses the <=200K prompt pricing tier.

References for "not disclosed" subscription quotas:

- OpenAI plans page: https://chatgpt.com/pricing/
- Anthropic (plans + usage limits): https://claude.com/pricing and https://support.claude.com/en/articles/9797557-usage-limit-best-practices
- Google (plans + restrictions + AI credits): https://one.google.com/about/google-ai-plans/ and https://support.google.com/googleone/answer/16105039 and https://support.google.com/googleone/answer/16287445

Community measurement attempts (indicative, non-official):

- ChatGPT limits tracker (community aggregation): https://gpt.bstr.dev/
- Claude Pro quota burn benchmark (community post): https://www.reddit.com/r/ClaudeAI/comments/1r9npwn/i_benchmarked_claude_pro_quota_burn_then_built_an/
- Gemini Pro limit counter experiment (community post): https://www.reddit.com/r/GeminiAI/comments/1ra0sb3/stop_guessing_when_youll_run_out_of_thinkingpro/

Even with rough assumptions, the gap is obvious: seat plans are cheap if your usage stays inside product guardrails, while raw API-token economics at 1B/month move into multi-thousand-dollar territory very fast.

## Bottom line

Cursor was an excellent accelerator. But honestly, the switch was not painful at all. And with my own application, I am not far from being able to build my own plugin. Their model worked, and might work again later, but by then there may be too many alternatives, possibly including my own plugin. For a practical comparison of those alternatives, read [Coding assistant alternatives](/blog/coding-assistant-alternatives).

## Next article

The [next article](/blog/coding-assistant-alternatives) will compare tested alternatives (Roo Code, Codex VS Code, Opencode, Antigravity, Blackbox) with an explicit framework and real-world tradeoffs.

## About the author

- Fabien Antoine
- [Who I am](/blog/who-i-am)
