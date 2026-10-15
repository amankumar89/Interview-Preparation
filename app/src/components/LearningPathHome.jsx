import { prettyFolder, prettyNote } from "../data/topics";

export default function LearningPathHome({
  view,
  categories,
  noteCount,
  resumeNote,
  canClearLearning,
  onOpenSoftware,
  onOpenElectricals,
  onSelectSoftwareCategory,
  onBackHome,
  onResume,
  onRequestClear,
  theme,
  onToggleTheme,
}) {
  return (
    <main className="category-home">
      <div className="category-home-inner">
        <header className="category-home-header">
          <button
            className="category-home-brand"
            type="button"
            onClick={onBackHome}
            aria-label="PrepHub home"
          >
            <span className="brand-mark">PH</span>
            <span>PrepHub</span>
          </button>
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
          <p className="category-eyebrow">
            {view === "software" ? "Software-Dev" : "Your learning library"}
          </p>
          <h1>
            {view === "software"
              ? "Choose a software topic"
              : "What would you like to learn?"}
          </h1>
          <p className="category-home-summary">
            {view === "software"
              ? "Pick a focused area to open its notes and learning sidebar."
              : "Explore software development or electrical engineering notes."}
          </p>
          <p className="category-home-count">
            {view === "software"
              ? `${categories.length} software paths`
              : `${noteCount} learning notes`}
          </p>
        </section>

        {view === "domains" ? (
          <section className="category-grid domain-grid" aria-label="Topics">
            {resumeNote && (
              <button
                className="category-card category-card-resume domain-card"
                type="button"
                onClick={onResume}
              >
                <span className="category-mark">↗</span>
                <span className="category-card-copy">
                  <span className="category-card-title">Resume Learnings</span>
                  <span className="category-card-description">
                    {`${prettyFolder(resumeNote.folder)} · ${prettyNote(resumeNote.name)}`}
                  </span>
                </span>
                <span className="category-card-count">Continue</span>
              </button>
            )}
            <button
              className="category-card category-tone-frontend domain-card"
              type="button"
              onClick={onOpenSoftware}
            >
              <span className="category-mark">SD</span>
              <span className="category-card-copy">
                <span className="category-card-title">Software-Dev</span>
                <span className="category-card-description">
                  Frontend, backend, databases, cloud, and more
                </span>
              </span>
              <span className="category-card-count">Explore →</span>
            </button>
            <button
              className="category-card category-tone-backend domain-card"
              type="button"
              onClick={onOpenElectricals}
            >
              <span className="category-mark">EL</span>
              <span className="category-card-copy">
                <span className="category-card-title">Electricals</span>
                <span className="category-card-description">
                  Electrical fundamentals, equipment, and systems
                </span>
              </span>
              <span className="category-card-count">Browse →</span>
            </button>
          </section>
        ) : (
          <>
            <button
              className="home-back-button"
              type="button"
              onClick={onBackHome}
            >
              <span aria-hidden="true">←</span> All topics
            </button>
            <section
              className="category-grid software-grid"
              aria-label="Software topics"
            >
              {categories.map((category) => (
                <button
                  className={`category-card category-tone-${category.id} domain-card`}
                  type="button"
                  key={category.id}
                  onClick={() => onSelectSoftwareCategory(category.id)}
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
          </>
        )}

        <div className="category-home-actions">
          <span>
            {view === "domains"
              ? "Choose a topic to begin"
              : "Choose a learning path"}
          </span>
          {canClearLearning && (
            <button
              className="clear-learning-action"
              type="button"
              onClick={onRequestClear}
            >
              Clear learning
            </button>
          )}
        </div>
        <footer className="category-home-footer">
          <span>PrepHub · organized for focused learning</span>
          <span>{noteCount} notes</span>
        </footer>
      </div>
    </main>
  );
}
