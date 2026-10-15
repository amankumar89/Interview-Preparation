# AGENTS.md

## Repository Purpose

This repository contains the PrepHub learning library: Markdown study content and a React/Vite app for browsing it.

The app starts with a domain choice, then offers software learning paths or the electrical collection. It reads Markdown files directly from `topics/` and displays their rendered content.

## Content Structure

```text
topics/
├── software-dev/
│   └── NN-Topic/NN-Subtopic.md
└── electricals/
	└── NN-topic/NN-subtopic.md
```

Software topics use the numbered learning path below. Electrical topics use numbered topic folders and may contain multiple numbered Markdown subtopics. A topic-level `README.md` may serve as an index or course overview; it is also rendered by the app like other Markdown files.

The app discovers files under `topics/**/*.md`; keep learning content in that tree. Software category membership is mapped by folder-number prefixes in `app/src/data/topics.js`, while electrical folders are grouped under the electrical domain. If a new software topic range or category is introduced, update that mapping as well.

The numbered folders define the recommended learning order:

```text
01 → 02 → 03 → ... → advanced topics
```

Each numbered software folder is a Topic. Each `.md` file inside it is a Subtopic. Electrical topic folders are nested under `topics/electricals/` and can contain their own numbered subtopic files.

## Learning Order

The software path progresses broadly from:

**Web Fundamentals → JavaScript/TypeScript → React/Next.js → Java → Spring → Databases → Backend Infrastructure → DevOps/Cloud → DSA → Design → System Design → AI Engineering → Project Interview**

The numbering is the learning sequence. It does not mean every question inside a file must be beginner-level.

## Question Progression Inside Each File

Questions should normally progress:

**Beginner → Intermediate → Practical → Advanced → Scenario/Production**

## Rules

1. Read existing content before adding questions.
2. Never duplicate existing questions.
3. Do not create slightly reworded duplicates.
4. Continue numbering from the last question.
5. Keep content relevant to the current subtopic.
6. Use simple, professional, interview-ready English.
7. Include code when useful.
8. Include practical and scenario-based questions.
9. Include common mistakes, performance, debugging, and production questions when relevant.
10. Never invent the candidate's personal experience.
11. Respect the requested technology version.
12. Prefer quality and coverage over question count.
13. Preserve useful existing content.
14. Keep each `.md` file self-contained.

## Content and App Rules

1. Match the content format to the subject: software files commonly use interview questions and answers; electrical files may use structured technical notes, calculations, and practical examples.
2. Use Markdown headings and standard fenced code blocks so content renders correctly in the app. GitHub-flavored Markdown is supported.
3. Keep topic and subtopic filenames numbered and descriptive; preserve the existing folder structure and naming style.
4. For electrical and equipment topics, make safety limits explicit and do not present unsafe procedures as instructions.
5. Changes to the app should preserve its domain-first navigation and direct Markdown-backed content flow.

## Default Experience

If unspecified, target a software developer with approximately 2–3 years of experience. For other subjects, use the level implied by the surrounding material and explain prerequisites where useful.

## AI Commands

- `Complete this` → complete the current subtopic.
- `Next` → continue from the last question.
- `Add questions` → add useful missing questions.
- `Add questions about X` → add questions about X.
- `Check this` → identify missing important areas.
- `Don't repeat` → strictly avoid duplicates.
- `Make answers detailed` → expand explanations.
- `Make answers simple` → simplify explanations.
- `Rapid revision` → create concise revision material.

## Quality

The final material should be useful for learning, interview preparation, mock interviews, revision, and real-world technical understanding.

## App Checks

From `app/`, run `bun install --frozen-lockfile`, `bun run lint`, and `bun run build` when validating app or content changes. The GitHub workflow runs the lint and build checks.
