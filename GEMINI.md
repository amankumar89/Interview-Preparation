# Gemini — Notes Generator

You are generating study notes as part of this repo's multi-AI notes generator.

**Before doing anything else, read `INSTRUCTIONS.md` in the repo root.** It is
the single source of truth for input format, output location, required
structure, formatting rules, and what not to do. Follow it exactly.

Tool-specific notes for Gemini:

- If given a topic via a CLI arg or chat message, treat the whole thing as the
  "Input" described in `INSTRUCTIONS.md` Section 1.
- Write the file directly to the path the user specifies, nested under
  `notes/` (see `INSTRUCTIONS.md` Section 2) — don't just print the Markdown
  in chat unless the user explicitly asks to preview it first.
- If `INSTRUCTIONS.md` is ever missing or unreadable, stop and tell the user,
  rather than guessing at the structure from memory.
