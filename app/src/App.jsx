import { useEffect, useMemo, useRef, useState } from "react";
import "highlight.js/styles/github-dark-dimmed.css";
import "./App.css";
import ConfirmDialog from "./components/ConfirmDialog";
import LearningPathHome from "./components/LearningPathHome";
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

function formatNavigationTitle(note, currentNote) {
  const subtopicName = prettyNote(note.name);
  return note.folder === currentNote.folder
    ? subtopicName
    : `${prettyFolder(note.folder)} - ${subtopicName}`;
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
  const [resumeSlug, setResumeSlug] = useState(() =>
    window.localStorage.getItem(LAST_VISITED_NOTE_KEY),
  );
  const resumeNote = allNotes.find((note) => note.slug === resumeSlug);
  const initialNote = resumeNote || allNotes[0];

  const [activeSlug, setActiveSlug] = useState(initialNote?.slug);
  const [query, setQuery] = useState("");
  const [isCategoryHome, setIsCategoryHome] = useState(true);
  const [confirmAction, setConfirmAction] = useState(null);
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
  const contentRef = useRef(null);
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
  const activeIndex = categoryNotes.findIndex(
    (note) => note.slug === active?.slug,
  );
  const previousNote = activeIndex > 0 ? categoryNotes[activeIndex - 1] : null;
  const nextNote =
    activeIndex >= 0 && activeIndex < categoryNotes.length - 1
      ? categoryNotes[activeIndex + 1]
      : null;
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
    if (!isMobile) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [active?.slug]);

  const selectNote = (slug) => {
    setActiveSlug(slug);
    setResumeSlug(slug);
    window.localStorage.setItem(LAST_VISITED_NOTE_KEY, slug);
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
    const nextActiveSlug =
      nextNotes.find((note) => note.slug === preferredSlug)?.slug ||
      nextNotes[0]?.slug;
    setActiveSlug(nextActiveSlug);
    setResumeSlug(nextActiveSlug || null);
    if (nextActiveSlug) {
      window.localStorage.setItem(LAST_VISITED_NOTE_KEY, nextActiveSlug);
    }
    setQuery("");
    setIsCategoryHome(false);
  };

  const toggleCategory = (categoryId) => {
    if (categoryId === "all") {
      openCategorySelection(["all"]);
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

  const confirmCurrentAction = () => {
    if (confirmAction === "leave") {
      setIsCategoryHome(true);
      setDrawerOpen(false);
    } else if (confirmAction === "clear") {
      window.localStorage.removeItem(LAST_VISITED_NOTE_KEY);
      window.localStorage.removeItem(SELECTED_CATEGORIES_KEY);
      setResumeSlug(null);
      setActiveSlug(undefined);
      setSelectedCategoryIds([]);
      setQuery("");
      setIsCategoryHome(true);
      setDrawerOpen(false);
    }
    setConfirmAction(null);
  };

  const canClearLearning = Boolean(resumeNote || selectedCategoryIds.length);

  const setAllFolders = (isOpen) =>
    setOpenFolders(
      Object.fromEntries(Object.keys(tree).map((folder) => [folder, isOpen])),
    );

  return (
    <div className={`app ${isMobile ? "is-mobile" : "is-desktop"}`}>
      {isCategoryHome ? (
        <LearningPathHome
          categories={categories}
          noteCount={allNotes.length}
          resumeNote={resumeNote}
          selectedIds={selectedCategoryIds}
          canClearLearning={canClearLearning}
          onToggleCategory={toggleCategory}
          onStartLearning={() => openCategorySelection(selectedCategoryIds)}
          onResume={resumeLearning}
          onRequestClear={() => setConfirmAction("clear")}
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
            canClearLearning={canClearLearning}
            isMobile={isMobile}
            isCollapsed={railCollapsed}
            isOpen={drawerOpen}
            onQueryChange={setQuery}
            onSelect={selectNote}
            onBrowseCategories={() => setConfirmAction("leave")}
            onRequestClearLearning={() => setConfirmAction("clear")}
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
          <main className="content" ref={contentRef}>
            <NoteContent note={active} />
            {active && (
              <nav className="note-navigation" aria-label="Subtopic navigation">
                <button
                  className="note-navigation-button note-navigation-previous"
                  type="button"
                  disabled={!previousNote}
                  onClick={() => selectNote(previousNote.slug)}
                >
                  <span className="note-navigation-direction">Back</span>
                  <span className="note-navigation-title">
                    {previousNote
                      ? formatNavigationTitle(previousNote, active)
                      : "Previous subtopic"}
                  </span>
                </button>
                <span className="note-navigation-position">Subtopics</span>
                <button
                  className="note-navigation-button note-navigation-next"
                  type="button"
                  disabled={!nextNote}
                  onClick={() => selectNote(nextNote.slug)}
                >
                  <span className="note-navigation-direction">Next</span>
                  <span className="note-navigation-title">
                    {nextNote
                      ? formatNavigationTitle(nextNote, active)
                      : "Next subtopic"}
                  </span>
                </button>
              </nav>
            )}
          </main>
        </>
      )}
      {confirmAction && (
        <ConfirmDialog
          title="Are you sure?"
          description={
            confirmAction === "clear"
              ? "This clears your saved learning path and last visited note. Your notes and other settings will stay untouched."
              : "Return to learning paths? Your current note will be saved so you can resume later."
          }
          confirmLabel={
            confirmAction === "clear"
              ? "Clear learning"
              : "Go to learning paths"
          }
          isDestructive={confirmAction === "clear"}
          onCancel={() => setConfirmAction(null)}
          onConfirm={confirmCurrentAction}
        />
      )}
    </div>
  );
}
