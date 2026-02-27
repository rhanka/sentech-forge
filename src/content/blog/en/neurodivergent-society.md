---
id: neurodivergent-society
icon: Terminal
order: 5
date: 2026-02-27
readTime: 10 min read
---

# Code CLIs and Chat: an ephemeral trace of digital social neurodivergence

## Preliminary notes

I am neither an autism specialist nor a critic of neurodiversity, quite the opposite. I am certainly neuro-atypical myself, and I hate putting labels on people or having them put on me. Since this article is public, I will use the word autistic with moderation, but basically I am intuitively pointing to a bias of that kind, without stigmatizing any intelligence. I also strongly believe that the diversity of human intelligences and cultures is what makes us rich, whether some current trends like it or not.

Also, I allow myself to cite several people in this article, with no intent to offend and, on the contrary, with deep respect.

## AI intelligence: a wording question

In a recent discussion with [Pierre Vannier](https://www.pierrevannier.com/) (Flint), whose vision and values I really appreciate, he asked me: is the term intelligence for AI, dating back to 1956 (John McCarthy), well chosen? I do not provide a final answer, since the term intelligence itself is already relatively well defined for humans, but I will use it here as our neurons' capacity to bring value to others, including emotional intelligence and the rest.

## What brought me to AI

In a [recent podcast](https://www.youtube.com/watch?v=zLescESJamw), I was sharing with Pierre and Thomas what brought me to AI: on one hand the fascination for the magic of neural networks showing learning capabilities, and on the other hand concrete applications to solve problems (at the time, in 1994, digit recognition, with Yann Le Cun's dataset). It was through this [book by Simon Haykin](https://www.amazon.ca/Neural-Networks-Comprehensive-Foundation-1994-01-30/dp/B01K2RA19K), which followed me through all my scientific studies, that my passion was born.

I will add another perspective by mentioning Yann Le Cun in a way that is probably interpreted (and I apologize for that): his position is not to fight AI and neural networks, but to challenge LLMs, which only use a minor part of the information compared to what a child receives, if only through its perception system (vision in particular). [See this talk](https://www.youtube.com/watch?v=jmkTM2VSQoY).

Public discourse can look biased to a scientist, because Shannon entropy suggests that effective information from a "received video stream" is much thinner than raw data. But Le Cun is fully aware of this and uses it to point at the same bias, which today creates, in my opinion, a massive bias in AI jobs, linked to a bias in AI's original culture or trajectory, and leading to a concrete impact: a dizzying-speed mutation first of AI-related jobs, then of digital jobs more broadly (or "digital" depending on which side of the Atlantic).

## From vision to language

When I moved into AI, my trajectory bias started with image processing in Sophia Antipolis. In 2000, I was doing an internship on road recognition through multi-scale analysis. I was offered publication, but I only had two images to work with. I had nice mathematical formulas (Hough transform, Markov chain), which was enough to publish at the time. I was shocked by the lack of scientific method (measure and evaluate!), and I switched to language processing. Those were Bayesian-method years; speech-recognition evaluation metrics were simple, we were already using LLMs based on `n-gram`, and we already knew how to generate text, but it had no meaning. There was already [Pipotron](http://www.lepipotron.com/), which could already generate hallucinatory sentences.

The problem was getting more complex on translation. The [IBM BLEU method](https://aclanthology.org/P02-1040.pdf) revolutionized translation by making progress measurable, first driving statistical learning; I then launched early AI studies on that topic. This research domain joined neural networks and led in 2017 to [transformers](https://arxiv.org/abs/1706.03762), which gave birth to [GPT-2 in 2019](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf), ChatGPT in 2022, and a little more than three years later to code agentics.

## UI/UX bias: from chat to CLI

Since then, AI has been considered as chat, now as agents. These agents have vision capabilities, but very limited ones (while in "generative" mode they are impressive). We plugged eyes onto AI after language capabilities. Result: transformer-generation AI is still weak on video ([RT-DETR](https://arxiv.org/abs/2304.08069), born from a YOLO + transformers merge), and maybe the [JEPA](https://arxiv.org/abs/2301.08243) architecture will be the next chapter.

But in fact, there is a bias in AI because of its historical path, and today it results in a very concrete human-machine interaction (UI/UX) bias: CLI for software engineering.

Since the beginning of ChatGPT, I have followed AI contributions and VS Code plugins: I had a Cursor period, then VS Code, then Cursor again, then back to VS Code, and now CLIs (Codex, Claude, Opencode, Mistral). Apart from Cursor, VS Code plugins are not credible for subagentics. With the evolution [from vibe coding to AI-assisted software engineering](/blog/ai-assisted-software-engineering), we end up abandoning the idea of looking at (all) the code, and separating agent steering from the code editor.

In itself, I would have expected a new kind of interface to emerge, and maybe even methods before tools, to bring healthy productivity. But no: we all move to CLI. At this point, I also think subagentics, which justified the mass move to CLI tools, still requires a lot of methodology work to really provide benefits (vs several agents). Having a [conductor](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/) requires using the "LLM" as a "manager", even though it does not have those skills. It delegates to super LLM developers, who were trained for that.

## Benchmarks and real-world work

Because AI is still learning... [SWE Bench](https://arxiv.org/abs/2310.06770), which is biased anyway ([OpenAI analysis](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)), was created so AI can learn to produce code, produce research papers, translate, ... The closest task to real work today is [GDPval](https://openai.com/fr-FR/index/gdpval/), which contains a tiny set of 1320 tasks for 44 professions. There are certainly far fewer questions in management training, but probably also because everyday situations and feedbacks are not captured, transcribed, and do not go only through written bytes.

## Why CLI is so attractive

So here we are: CLI. But... why so much hate? Or so much love? As an AI science guy, I very quickly loved Linux and used terminals; for a long time I enjoyed one-liners (practical micro-tools in `grep` `sed` `awk` `perl` with regexes unreadable to others, and that we no longer need as much with AI), for data processing including natural language. I understand shortcuts, slash commands that remind me of [IRC](https://fr.wikipedia.org/wiki/Internet_Relay_Chat)... Do I have a cultural and cognitive bias? Certainly! Is "chat" mode imposed by LLM dialogue, which is not very good at other things, an AI cognitive bias? Certainly! Is CLI mode for subagentic coding a socio-cognitive bias? Probably! Doesn't this AI bias also lean on a somewhat "autistic" bias (I will use the term only once) that is not 100% virtuous?

AI is neurodivergent, and reinforces our own neurodivergences, to the point of contaminating a whole sector ([SaaSpocalypse](https://thenewstack.io/dawn-of-a-saaspocalypse/)), by accelerating coding in a needlessly biased way (plus a capital-allocation bias), but also in a very thrilling way (the [dopamine](https://www.sciencesetavenir.fr/sante/cerveau-et-psy/quel-est-le-role-de-la-dopamine-surnommee-molecule-du-plaisir-dans-l-apprentissage_189558) effect, another bias).

## Other biases and what comes next

Note: are there other socio-cognitive biases with social networks, and does AI play into that? Of course, and pre-GPT AI was already doing it, and today it's another dimension: [AI Slop](https://www.theverge.com/ai-artificial-intelligence/882956/ai-deepfake-detection-labels-c2pa-instagram-youtube).

So, how long will the CLI trend last? 1 year? 2 years? What will be the next UI for software engineering? What will be the next UI for humans to interact with their data? My hypothesis is that we will move from "XaC" software engineering (everything as code) to "XaD" (everything as data - all knowledge, all code, is data), and that by thinking computing this way, with AI and data, and probably by decapitalizing AI and heavily regulating the coming robotics wave, we will bring truly healthy value to humanity.

At my small scale, I am working on tooling to have better methods and libraries to use AI, for code and for users. Today my code is here: [top-ai-ideas](https://github.com/rhanka/top-ai-ideas-fullstack/), but it will soon turn into an open-source library to make human collaboration with AI easier, software engineering included, because it seems natural that software, as its value is being depreciated, should be cultivated in a free/open way.

Fabien Antoine
