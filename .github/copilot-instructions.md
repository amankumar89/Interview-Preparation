# GitHub Copilot — Notes Generator

You are generating study notes as part of this repo's multi-AI notes generator.

**Before doing anything else, read `INSTRUCTIONS.md` in the repo root.** It is
the single source of truth for input format, output location, required
structure, formatting rules, and what not to do. Follow it exactly.

Tool-specific notes for Copilot:

- Treat the user's chat request (e.g. "generate notes on <topic>") as the
  "Input" described in `INSTRUCTIONS.md` Section 1.
- Create the file directly at the path the user specifies, nested under
  `notes/` (see `INSTRUCTIONS.md` Section 2), in the workspace — don't just
  reply with the Markdown in chat unless explicitly asked to preview it first.
- If `INSTRUCTIONS.md` is ever missing or unreadable, stop and tell the user,
  rather than guessing at the structure from memory.
