# Notes Generator

Generate structured Markdown study notes on any topic using Claude, Gemini, or
GitHub Copilot — with identical output structure across all three.

## How it works

- `INSTRUCTIONS.md` — the shared spec. Defines input format, output structure,
  formatting rules. This is the only file you should edit to change behavior.
- `CLAUDE.md` — read automatically by Claude Code in this repo.
- `GEMINI.md` — read automatically by Gemini CLI in this repo.
- `.github/copilot-instructions.md` — read automatically by GitHub Copilot in
  VS Code / Copilot Chat.

All three files just point to `INSTRUCTIONS.md` and add minor tool-specific
notes. This means the actual rules live in one place, so updating the note
structure never requires editing three files.

## Usage

All notes are saved inside the `notes/` folder. You give the topic **and
where inside `notes/` to save it**. Two ways to do that:

**Single file** — give the path (relative to `notes/`):

```
generate notes on "JSX" and save to 04-react/01-jsx.md
```

→ saved as `notes/04-react/01-jsx.md`

**Parent folder with multiple subtopics** — give a folder and the subtopics
to cover, one file per subtopic:

```
create notes in 04-react/ for JSX, Props, and State
```

→ creates `notes/04-react/jsx.md`, `notes/04-react/props.md`,
`notes/04-react/state.md` (or follows an existing `01-`, `02-` numbering
pattern if the folder already uses one). Each file covers only its own
subtopic.

Works the same way in all three tools:

**Claude Code**

```
claude
> generate notes on "JSX" and save to 04-react/01-jsx.md
```

**Gemini CLI**

```
gemini
> create notes in 04-react/ for JSX, Props, and State
```

**GitHub Copilot (VS Code Chat)**

```
@workspace generate notes on "JSX" and save to 04-react/01-jsx.md
```

If you don't give a path or folder, the AI will ask instead of guessing.
Every note ends with a **Practice Questions** section.

## Comparing outputs across tools

Since you control the exact path, just give each tool a different path for
the same topic:

```
generate notes on "JSX" and save to 04-react/01-jsx-claude.md
generate notes on "JSX" and save to 04-react/01-jsx-gemini.md
```

## Folder structure

```
notes-generator/
├── INSTRUCTIONS.md              # shared spec — edit this to change rules
├── CLAUDE.md                    # Claude entrypoint
├── GEMINI.md                    # Gemini entrypoint
├── .github/
│   └── copilot-instructions.md  # Copilot entrypoint
├── README.md
└── notes/                        # all generated notes live here
```
