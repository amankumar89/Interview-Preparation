import { useEffect, useMemo, useState } from "react";
import "highlight.js/styles/github-dark-dimmed.css";
import "./App.css";
import MobileTopbar from "./components/MobileTopbar";
import NoteContent from "./components/NoteContent";
import Sidebar from "./components/Sidebar";
import { buildTree, flattenNotes } from "./data/topics";
import useIsMobile from "./hooks/useIsMobile";

const modules = import.meta.glob("../../topics/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const LAST_VISITED_NOTE_KEY = "app-last-visited-note";

export default function App() {
  const tree = useMemo(() => buildTree(modules), []);
  const allNotes = useMemo(() => flattenNotes(tree), [tree]);
  const isMobile = useIsMobile();
  const initialNote =
    allNotes.find(
      (note) =>
        note.slug === window.localStorage.getItem(LAST_VISITED_NOTE_KEY),
    ) || allNotes[0];

  const [activeSlug, setActiveSlug] = useState(initialNote?.slug);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("app-theme") || "light",
  );
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFolders, setOpenFolders] = useState(() =>
    Object.fromEntries(
      Object.keys(tree).map((folder) => [
        folder,
        folder === initialNote?.folder,
      ]),
    ),
  );

  const active = allNotes.find((note) => note.slug === activeSlug);
  const filtered = query
    ? allNotes.filter(
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
    if (activeSlug) {
      window.localStorage.setItem(LAST_VISITED_NOTE_KEY, activeSlug);
    }
  }, [activeSlug]);

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

  const setAllFolders = (isOpen) =>
    setOpenFolders(
      Object.fromEntries(Object.keys(tree).map((folder) => [folder, isOpen])),
    );

  return (
    <div className={`app ${isMobile ? "is-mobile" : "is-desktop"}`}>
      {isMobile && (
        <MobileTopbar active={active} onOpen={() => setDrawerOpen(true)} />
      )}
      {isMobile && drawerOpen && (
        <div className="backdrop" onClick={() => setDrawerOpen(false)} />
      )}
      <Sidebar
        tree={tree}
        filtered={filtered}
        activeSlug={activeSlug}
        openFolders={openFolders}
        query={query}
        theme={theme}
        isMobile={isMobile}
        isCollapsed={railCollapsed}
        isOpen={drawerOpen}
        onQueryChange={setQuery}
        onSelect={selectNote}
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
          isMobile ? setDrawerOpen(false) : setRailCollapsed((value) => !value)
        }
      />
      <main className="content">
        <NoteContent note={active} />
      </main>
    </div>
  );
}
