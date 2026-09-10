# Notes Generator — Shared Instructions

This file is the single source of truth for generating study notes on any topic.
`CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` all point here so
that Claude, Gemini, and GitHub Copilot produce **consistent** output regardless
of which tool is used.

If you are an AI assistant reading this: follow every rule below exactly. Do not
improvise structure, formatting, or file placement.

---

## 1. Input

You will be given a **topic** (a word, phrase, or short description).

Examples:

- "Topic: Photosynthesis"
- "Topic: React useEffect hook"
- "Topic: Binary Search Trees"

## 2. Output location and filename

**All notes live inside a `notes/` folder at the repo root.** Every path
given by the user is relative to `notes/` — if the user says `04-react/01-jsx.md`,
the file actually goes to `notes/04-react/01-jsx.md`. If the user's path
already starts with `notes/`, don't double it up.

Two input modes are supported — figure out which one applies based on what
the user gives you:

**Mode A — single file path.** The user gives one path (relative to `notes/`),
e.g. `04-react/01-jsx.md` → saved as `notes/04-react/01-jsx.md`. Generate one
file at that path covering the topic.

**Mode B — parent folder with one or more subtopic files.** The user gives a
parent folder (relative to `notes/`) and one or more filenames (or subtopic
names) to create inside it, e.g. "create notes in `04-react/` for `01-jsx.md`,
`02-props.md`, `03-state.md`" or "create notes in `05-python/` covering loops,
functions, and classes." This resolves to `notes/04-react/...` etc. In this mode:

- Create each file at `notes/<parent-folder>/<filename>.md`.
- Each file covers **only its own subtopic** in full (per Section 3) — don't
  repeat content across files, and don't make one file a summary of the others.
- If the user names subtopics without exact filenames, slugify each subtopic
  name for the filename (lowercase, spaces → hyphens), e.g. "State" →
  `state.md`. Don't add number prefixes unless the user's example/existing
  files in that folder show a numbering pattern (like `01-`, `02-`) — if they
  do, follow that same pattern for the new files.
- If the folder already has files, check their structure/naming convention
  first and stay consistent with it rather than inventing a new one.

General rules for both modes:

- Use the path(s) exactly as given, always nested under `notes/`.
- Create any missing folders in the path, including `notes/` itself if it
  doesn't exist yet.
- If a file already exists at the target path, **overwrite it**.
- Output is always Markdown (`.md`).
- If the user gives only a topic with no file path or folder, ask before
  generating — do not guess a location.

## 3. Required structure

```markdown
# <Topic Title>

Brief 2-3 sentence explanation of what this topic is and why it matters.

## <Subtopic 1>

Clear explanation of this subtopic — as much detail as needed to actually
understand it, written in plain prose and/or bullet points, whichever fits
the content best. Include a short example (code, formula, diagram-in-words,
or scenario) if it helps understanding.

## <Subtopic 2>

(Same as above.)

## <Subtopic N>

(Repeat for every real subtopic the topic has. Skip subtopics that don't exist
for this topic — do not force a fixed number of sections.)

## Practice Questions

A short set of questions (roughly 3-6, scale with topic size) to test
understanding of what was just explained. Mix conceptual questions ("why does
X happen") with applied ones ("what would happen if..." / a small problem to
solve) where the topic allows it. Do not include answers unless the user asks
for them — just the questions.
```

- Identify subtopics naturally, the way a good textbook or reference would
  break the topic down. There is no fixed minimum or maximum number of
  subtopics — cover however many the topic actually has.
- If the topic is narrow enough that it doesn't really split into subtopics,
  it's fine to have just one or two sections, or even just the top-level
  explanation with no subsections.
- Do not add extra sections beyond the topic's subtopics and the closing
  Practice Questions (e.g. no "Summary," "Key Terms," or "Further Reading")
  unless the user specifically asks for them.
- Do not label parts of the explanation as "basic," "intermediate," or
  "advanced." Just explain the subtopic clearly and completely, in a natural
  order (simpler/foundational ideas first, more nuanced points after) without
  naming or separating the levels.
- Include the **Practice Questions** section at the end whenever it's
  reasonably possible to write meaningful questions for the topic. Skip it
  only for topics where questions wouldn't make sense (e.g. a very short
  reference/definition-only note).
- In **Mode B** (parent folder with subtopic files), add Practice Questions
  to each individual subtopic file, based only on that file's own content —
  not a combined set at the end of the last file.

## 4. Formatting rules

- Use whichever mix of prose and bullet points best explains the content —
  don't force everything into bullets if a subtopic reads better as a short
  paragraph.
- Use fenced code blocks (with language tag) for any code, syntax, or formulas.
- Use `**bold**` for important terms the first time they're introduced.
- No emojis.
- No filler ("In today's world...", "Let's dive in..."). Get straight to content.
- American English spelling.
- Length should be whatever the topic genuinely needs — don't pad to hit a
  word count, and don't cut a subtopic short just to stay brief.

## 5. Consistency rule (multi-AI requirement)

The point of this repo is that Claude, Gemini, and Copilot generate notes
with the same overall shape — topic title, plain intro, subtopic sections —
for the same input topic, even though wording and exact subtopic breakdown
will naturally differ between models. Follow the structure in Section 3.

## 6. What NOT to do

- Do not ask the user clarifying questions for a well-known topic — make a
  reasonable assumption about scope and proceed.
- Do not fabricate facts, statistics, or citations. If unsure, explain the
  concept generally rather than inventing specifics.
- Do not include a table of contents, front matter, level labels, or any
  metadata beyond the topic title and its subtopics.
- Do not wrap the entire output in a code fence — the `.md` file content
  itself should be plain Markdown, not Markdown-inside-a-code-block.
