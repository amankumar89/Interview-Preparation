import { prettyFolder, prettyNote } from "../data/topics";

export default function LearningPathHome({
  categories,
  noteCount,
  resumeNote,
  selectedIds,
  canClearLearning,
  onToggleCategory,
  onStartLearning,
  onResume,
  onRequestClear,
  theme,
  onToggleTheme,
}) {
  return (
    <main className="category-home">
      <div className="category-home-inner">
        <header className="category-home-header">
          <div className="category-home-brand">
            <span className="brand-mark">IP</span>
            <span>Interview Prep</span>
          </div>
          <button
            className="theme-toggle category-home-theme"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-pressed={theme === "dark"}
            onClick={onToggleTheme}
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === "dark" ? "☀" : "☾"}
            </span>
            <span className="theme-label">
              {theme === "dark" ? "Light theme" : "Dark theme"}
            </span>
          </button>
        </header>

        <section className="category-home-intro">
          <p className="category-eyebrow">A study path built around you</p>
          <h1>What are you preparing for?</h1>
          <p className="category-home-summary">
            Select one or more subjects, then start learning from a focused
            collection of notes.
          </p>
          <p className="category-home-count">
            {categories.length} learning paths <span>·</span> {noteCount} notes
          </p>
        </section>

        {resumeNote && (
          <button
            className="category-card category-card-resume"
            type="button"
            onClick={onResume}
          >
            <span className="category-mark">↗</span>
            <span className="category-card-copy">
              <span className="category-card-title">Resume learning</span>
              <span className="category-card-description">
                {prettyFolder(resumeNote.folder)} ·{" "}
                {prettyNote(resumeNote.name)}
              </span>
            </span>
            <span className="category-card-count">Continue</span>
          </button>
        )}

        <section className="category-grid" aria-label="Learning categories">
          <button
            className={`category-card category-card-all ${selectedIds.includes("all") ? "selected" : ""}`}
            type="button"
            aria-pressed={selectedIds.includes("all")}
            onClick={() => onToggleCategory("all")}
          >
            <span className="category-mark">ALL</span>
            <span className="category-card-copy">
              <span className="category-card-title">All topics</span>
              <span className="category-card-description">
                Browse the complete interview preparation library
              </span>
            </span>
            <span className="category-card-count">{noteCount} notes</span>
          </button>
          {categories.map((category) => (
            <button
              className={`category-card category-tone-${category.id} ${selectedIds.includes(category.id) ? "selected" : ""}`}
              type="button"
              aria-pressed={selectedIds.includes(category.id)}
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
            >
              <span className="category-mark">{category.mark}</span>
              <span className="category-card-copy">
                <span className="category-card-title">{category.name}</span>
                <span className="category-card-description">
                  {category.description}
                </span>
              </span>
              <span className="category-card-count">
                {category.noteCount} notes
              </span>
            </button>
          ))}
        </section>
        <div className="category-home-actions">
          <span>
            {selectedIds.length === 0
              ? "Select a learning path to continue"
              : selectedIds.includes("all")
                ? "All topics selected"
                : `${selectedIds.length} learning path${selectedIds.length === 1 ? "" : "s"} selected`}
          </span>
          <div className="category-home-buttons">
            {canClearLearning && (
              <button
                className="clear-learning-action"
                type="button"
                onClick={onRequestClear}
              >
                Clear learning
              </button>
            )}
            <button
              className="start-learning-button"
              type="button"
              disabled={selectedIds.length === 0}
              onClick={onStartLearning}
            >
              Start learning <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <footer className="category-home-footer">
          <span>{noteCount} focused notes, organized by subject</span>
          <span>Pick a path to begin</span>
        </footer>
      </div>
    </main>
  );
}
