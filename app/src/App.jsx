import { useEffect, useMemo, useState } from "react";
import "highlight.js/styles/github-dark-dimmed.css";
import "./App.css";
import MobileTopbar from "./components/MobileTopbar";
import NoteContent from "./components/NoteContent";
import Sidebar from "./components/Sidebar";
import {
  buildTree,
  categoryForFolder,
  flattenNotes,
  prettyFolder,
  prettyNote,
  TOPIC_CATEGORIES,
} from "./data/topics";
import useIsMobile from "./hooks/useIsMobile";

const modules = import.meta.glob("../../topics/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const LAST_VISITED_NOTE_KEY = "app-last-visited-note";
const HIDDEN_FOLDERS_KEY = "app-hidden-folders";
const SELECTED_CATEGORIES_KEY = "app-selected-categories";

function CategoryHome({
  categories,
  noteCount,
  resumeNote,
  selectedIds,
  onToggleCategory,
  onStartLearning,
  onResume,
  onBrowseCategories,
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
            onClick={onBrowseCategories}
            aria-label="Interview Prep learning paths"
          >
            <span className="brand-mark">IP</span>
            <span>Interview Prep</span>
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
          <button
            className="start-learning-button"
            type="button"
            disabled={selectedIds.length === 0}
            onClick={onStartLearning}
          >
            Start learning <span aria-hidden="true">→</span>
          </button>
        </div>
        <footer className="category-home-footer">
          <span>{noteCount} focused notes, organized by subject</span>
          <span>Pick a path to begin</span>
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  const tree = useMemo(() => buildTree(modules), []);
  const allNotes = useMemo(() => flattenNotes(tree), [tree]);
  const categories = useMemo(
    () =>
      TOPIC_CATEGORIES.map((category) => {
        const folders = Object.entries(tree).filter(
          ([folder]) => categoryForFolder(folder) === category.id,
        );
        return {
          ...category,
          folderCount: folders.length,
          noteCount: folders.reduce(
            (count, [, notes]) => count + notes.length,
            0,
          ),
        };
      }).filter((category) => category.folderCount > 0),
    [tree],
  );
  const isMobile = useIsMobile();
  const resumeNote = allNotes.find(
    (note) => note.slug === window.localStorage.getItem(LAST_VISITED_NOTE_KEY),
  );
  const initialNote = resumeNote || allNotes[0];

  const [activeSlug, setActiveSlug] = useState(initialNote?.slug);
  const [query, setQuery] = useState("");
  const [isCategoryHome, setIsCategoryHome] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(SELECTED_CATEGORIES_KEY),
      );
      if (!Array.isArray(saved)) return [];
      if (saved.includes("all")) return ["all"];
      return [...new Set(saved)].filter((id) =>
        TOPIC_CATEGORIES.some((category) => category.id === id),
      );
    } catch {
      return [];
    }
  });
  const [hiddenFolders, setHiddenFolders] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(HIDDEN_FOLDERS_KEY));
      return Array.isArray(saved)
        ? saved.filter((folder) => Object.hasOwn(tree, folder))
        : [];
    } catch {
      return [];
    }
  });
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("app-theme") || "light",
  );
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hiddenTopicsOpen, setHiddenTopicsOpen] = useState(false);
  const [openFolders, setOpenFolders] = useState(() =>
    Object.fromEntries(
      Object.keys(tree).map((folder) => [
        folder,
        folder === initialNote?.folder,
      ]),
    ),
  );

  const categoryTree = useMemo(() => {
    if (selectedCategoryIds.includes("all")) return tree;
    return Object.fromEntries(
      Object.entries(tree).filter(([folder]) =>
        selectedCategoryIds.includes(categoryForFolder(folder)),
      ),
    );
  }, [selectedCategoryIds, tree]);
  const categoryNotes = useMemo(
    () => flattenNotes(categoryTree),
    [categoryTree],
  );
  const active =
    categoryNotes.find((note) => note.slug === activeSlug) || categoryNotes[0];
  const visibleNotes = categoryNotes.filter(
    (note) => !hiddenFolders.includes(note.folder),
  );
  const filtered = query
    ? visibleNotes.filter(
        (note) =>
          note.name.toLowerCase().includes(query.toLowerCase()) ||
          note.content.toLowerCase().includes(query.toLowerCase()),
      )
    : null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("app-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(
      HIDDEN_FOLDERS_KEY,
      JSON.stringify(hiddenFolders),
    );
  }, [hiddenFolders]);

  useEffect(() => {
    window.localStorage.setItem(
      SELECTED_CATEGORIES_KEY,
      JSON.stringify(selectedCategoryIds),
    );
  }, [selectedCategoryIds]);

  useEffect(() => {
    if (active) {
      window.localStorage.setItem(LAST_VISITED_NOTE_KEY, active.slug);
    }
  }, [active]);

  useEffect(() => {
    if (!isMobile) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile]);

  const selectNote = (slug) => {
    setActiveSlug(slug);
    if (isMobile) setDrawerOpen(false);
  };

  const openCategorySelection = (nextSelection, preferredSlug = activeSlug) => {
    const nextIds = nextSelection.includes("all") ? ["all"] : nextSelection;
    const nextTree = nextIds.includes("all")
      ? tree
      : Object.fromEntries(
          Object.entries(tree).filter(([folder]) =>
            nextIds.includes(categoryForFolder(folder)),
          ),
        );
    const nextNotes = flattenNotes(nextTree);
    setSelectedCategoryIds(nextIds);
    setActiveSlug(
      nextNotes.find((note) => note.slug === preferredSlug)?.slug ||
        nextNotes[0]?.slug,
    );
    setQuery("");
    setIsCategoryHome(false);
  };

  const toggleCategory = (categoryId) => {
    if (categoryId === "all") {
      setSelectedCategoryIds((current) =>
        current.includes("all") ? [] : ["all"],
      );
      return;
    }
    const currentIds = selectedCategoryIds.includes("all")
      ? []
      : selectedCategoryIds;
    const nextIds = currentIds.includes(categoryId)
      ? currentIds.filter((id) => id !== categoryId)
      : [...currentIds, categoryId];
    setSelectedCategoryIds(nextIds);
  };

  const resumeLearning = () => {
    if (!resumeNote) return;
    const categoryId = categoryForFolder(resumeNote.folder);
    openCategorySelection(
      categoryId === "other" ? ["all"] : [categoryId],
      resumeNote.slug,
    );
  };

  const setAllFolders = (isOpen) =>
    setOpenFolders(
      Object.fromEntries(Object.keys(tree).map((folder) => [folder, isOpen])),
    );

  return (
    <div className={`app ${isMobile ? "is-mobile" : "is-desktop"}`}>
      {isCategoryHome ? (
        <CategoryHome
          categories={categories}
          noteCount={allNotes.length}
          resumeNote={resumeNote}
          selectedIds={selectedCategoryIds}
          onToggleCategory={toggleCategory}
          onStartLearning={() => openCategorySelection(selectedCategoryIds)}
          onResume={resumeLearning}
          onBrowseCategories={() => setIsCategoryHome(true)}
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />
      ) : (
        <>
          {isMobile && (
            <MobileTopbar active={active} onOpen={() => setDrawerOpen(true)} />
          )}
          {isMobile && drawerOpen && (
            <div className="backdrop" onClick={() => setDrawerOpen(false)} />
          )}
          <Sidebar
            tree={categoryTree}
            hiddenFolders={hiddenFolders}
            hiddenTopicsOpen={hiddenTopicsOpen}
            filtered={filtered}
            activeSlug={active?.slug}
            openFolders={openFolders}
            query={query}
            theme={theme}
            isMobile={isMobile}
            isCollapsed={railCollapsed}
            isOpen={drawerOpen}
            onQueryChange={setQuery}
            onSelect={selectNote}
            onBrowseCategories={() => {
              setIsCategoryHome(true);
              setDrawerOpen(false);
            }}
            onToggleHiddenFolder={(folder) =>
              setHiddenFolders((previous) =>
                previous.includes(folder)
                  ? previous.filter((hiddenFolder) => hiddenFolder !== folder)
                  : [...previous, folder],
              )
            }
            onToggleHiddenTopics={() => setHiddenTopicsOpen((open) => !open)}
            onToggleFolder={(folder) =>
              setOpenFolders((previous) => ({
                ...previous,
                [folder]: !previous[folder],
              }))
            }
            onOpenAll={() => setAllFolders(true)}
            onCloseAll={() => setAllFolders(false)}
            onToggleTheme={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
            onToggleSidebar={() =>
              isMobile
                ? setDrawerOpen(false)
                : setRailCollapsed((value) => !value)
            }
          />
          <main className="content">
            <NoteContent note={active} />
          </main>
        </>
      )}
    </div>
  );
}
