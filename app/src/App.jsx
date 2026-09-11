import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark-dimmed.css";
import "./App.css";

const modules = import.meta.glob("../../notes/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Friendly display names for known topic folders. Anything not listed
// falls back to a generic title-cased version of the folder name.
const FOLDER_LABELS = {
  "html-css": "HTML & CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  "frontend-state": "Frontend State",
  nextjs: "Next.js",
  java: "Java",
  dsa: "DSA",
  "spring-core": "Spring Core",
  "spring-boot": "Spring Boot",
  "spring-security": "Spring Security",
  "jpa-hibernate": "JPA & Hibernate",
  "sql-postgresql": "SQL & PostgreSQL",
  "node-express": "Node & Express",
  "rest-api": "REST APIs",
  "database-design": "Database Design",
  "system-design": "System Design",
  docker: "Docker",
  aws: "AWS",
  "git-devops": "Git & DevOps",
  projects: "Projects",
  "resume-defense": "Resume Defense",
  "hr-behavioral": "HR & Behavioral",
  "ai-agentic-development": "AI & Agentic Dev",
};

// Words that should render as-is (all caps) rather than title-cased.
const ACRONYMS = new Set([
  "html",
  "css",
  "js",
  "jsx",
  "ts",
  "tsx",
  "sql",
  "api",
  "apis",
  "rest",
  "jpa",
  "aws",
  "hr",
  "ai",
  "jwt",
  "cors",
  "dom",
  "http",
  "https",
  "crud",
  "orm",
  "ci",
  "cd",
]);

function titleCaseFallback(slug) {
  return slug
    .split("-")
    .map((w) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

// Turns "01-html-css" into "HTML & CSS", keeping the numeric prefix
// available separately for ordering/badges if ever needed.
function prettyFolder(folder) {
  const match = folder.match(/^(\d+)-(.+)$/);
  const slug = match ? match[2] : folder;
  return FOLDER_LABELS[slug] || titleCaseFallback(slug);
}

// Turns "08-array-methods" into "Array Methods".
function prettyNote(name) {
  const match = name.match(/^(\d+)-(.+)$/);
  const slug = match ? match[2] : name;
  return titleCaseFallback(slug);
}

function buildTree(mods) {
  const tree = {};
  for (const [filePath, content] of Object.entries(mods)) {
    const parts = filePath.replace("../../notes/", "").split("/");
    const fileName = parts.pop();
    const folder = parts.join("/") || "root";
    const name = fileName.replace(/\.md$/, "");
    tree[folder] ??= [];
    tree[folder].push({ slug: `${folder}/${name}`, name, content });
  }
  for (const key of Object.keys(tree)) {
    tree[key].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true }),
    );
  }
  return tree;
}

// Reactive viewport check
function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function App() {
  const tree = useMemo(() => buildTree(modules), []);
  const allNotes = useMemo(
    () =>
      Object.entries(tree).flatMap(([folder, items]) =>
        items.map((i) => ({ ...i, folder })),
      ),
    [tree],
  );

  const isMobile = useIsMobile();

  const [activeSlug, setActiveSlug] = useState(allNotes[0]?.slug);
  const [query, setQuery] = useState("");

  // Desktop: collapse sidebar to rail
  const [railCollapsed, setRailCollapsed] = useState(false);

  // Mobile: drawer open/closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [openFolders, setOpenFolders] = useState(() =>
    Object.fromEntries(Object.keys(tree).map((k) => [k, true])),
  );

  const active = allNotes.find((n) => n.slug === activeSlug);

  const toggleFolder = (folder) =>
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));

  const openAll = () =>
    setOpenFolders(Object.fromEntries(Object.keys(tree).map((k) => [k, true])));

  const closeAll = () =>
    setOpenFolders(
      Object.fromEntries(Object.keys(tree).map((k) => [k, false])),
    );

  const selectNote = (slug) => {
    setActiveSlug(slug);
    if (isMobile) setDrawerOpen(false); // auto-close drawer on mobile
  };

  // Close drawer on Escape
  useEffect(() => {
    if (!isMobile) return;
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile]);

  const filtered = query
    ? allNotes.filter(
        (n) =>
          n.name.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase()),
      )
    : null;

  // Build class string for sidebar
  const sidebarClasses = [
    "sidebar",
    isMobile ? "mobile" : "",
    isMobile ? (drawerOpen ? "open" : "closed") : "",
    !isMobile && railCollapsed ? "collapsed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const railHidden = isMobile === false && railCollapsed;

  return (
    <div className={`app ${isMobile ? "is-mobile" : "is-desktop"}`}>
      {/* ---- Mobile top bar ---- */}
      {isMobile && (
        <header className="topbar">
          <button
            className="icon-btn"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </button>
          <span className="topbar-title">
            {active ? prettyNote(active.name) : "Notes"}
          </span>
          <span style={{ width: 26 }} />
        </header>
      )}

      {/* ---- Backdrop (mobile only, when drawer open) ---- */}
      {isMobile && drawerOpen && (
        <div className="backdrop" onClick={() => setDrawerOpen(false)} />
      )}

      {/* ---- Sidebar ---- */}
      <aside className={sidebarClasses}>
        <div className="sidebar-header">
          {!railHidden && (
            <span className="brand">
              <span className="brand-mark">IP</span>
              <span className="brand-name">Interview Prep</span>
            </span>
          )}

          {/* Desktop: collapse rail. Mobile: close drawer */}
          <button
            className="icon-btn"
            title={
              isMobile
                ? "Close menu"
                : railCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
            }
            onClick={() =>
              isMobile ? setDrawerOpen(false) : setRailCollapsed((v) => !v)
            }
          >
            {isMobile ? "✕" : railCollapsed ? "»" : "«"}
          </button>
        </div>

        {!railHidden && (
          <input
            className="search"
            placeholder="Search notes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}

        {!railHidden && !filtered && (
          <div className="tree-actions">
            <button className="link-btn" onClick={openAll}>
              Open all
            </button>
            <span className="tree-actions-sep">·</span>
            <button className="link-btn" onClick={closeAll}>
              Close all
            </button>
          </div>
        )}

        {!railHidden && (
          <nav className="nav">
            {filtered ? (
              <>
                <h4 className="nav-title">Results ({filtered.length})</h4>
                {filtered.map((n) => (
                  <div
                    key={n.slug}
                    className={`item ${n.slug === activeSlug ? "active" : ""}`}
                    onClick={() => selectNote(n.slug)}
                  >
                    <span className="item-crumb">{prettyFolder(n.folder)}</span>
                    <span className="item-name">{prettyNote(n.name)}</span>
                  </div>
                ))}
              </>
            ) : (
              Object.entries(tree).map(([folder, items]) => {
                const isOpen = openFolders[folder] ?? true;
                return (
                  <div key={folder} className="group">
                    <button
                      className="folder"
                      onClick={() => toggleFolder(folder)}
                      aria-expanded={isOpen}
                    >
                      <span className={`chevron ${isOpen ? "open" : ""}`}>
                        ▶
                      </span>
                      <span className="folder-name">
                        {prettyFolder(folder)}
                      </span>
                      <span className="count">{items.length}</span>
                    </button>

                    {isOpen && (
                      <div className="children">
                        {items.map((n) => (
                          <div
                            key={n.slug}
                            className={`item ${
                              n.slug === activeSlug ? "active" : ""
                            }`}
                            onClick={() => selectNote(n.slug)}
                            title={prettyNote(n.name)}
                          >
                            {prettyNote(n.name)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>
        )}
      </aside>

      {/* ---- Content ---- */}
      <main className="content">
        {active ? (
          <article className="markdown">
            <p className="crumb">{prettyFolder(active.folder)}</p>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeHighlight]}
            >
              {active.content}
            </ReactMarkdown>
          </article>
        ) : (
          <p>Pick a note from the sidebar.</p>
        )}
      </main>
    </div>
  );
}
