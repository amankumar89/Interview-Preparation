import { prettyFolder, prettyNote } from "../data/topics";

function NoteItem({ note, activeSlug, onSelect, showFolder }) {
  return (
    <div
      className={`item ${note.slug === activeSlug ? "active" : ""}`}
      onClick={() => onSelect(note.slug)}
      title={showFolder ? undefined : prettyNote(note.name)}
    >
      {showFolder && (
        <span className="item-crumb">{prettyFolder(note.folder)}</span>
      )}
      <span className={showFolder ? "item-name" : undefined}>
        {prettyNote(note.name)}
      </span>
    </div>
  );
}

function SidebarNavigation({
  tree,
  filtered,
  openFolders,
  activeSlug,
  onSelect,
  onToggleFolder,
}) {
  if (filtered) {
    return (
      <>
        <h4 className="nav-title">Results ({filtered.length})</h4>
        {filtered.map((note) => (
          <NoteItem
            key={note.slug}
            note={note}
            activeSlug={activeSlug}
            onSelect={onSelect}
            showFolder
          />
        ))}
      </>
    );
  }

  return Object.entries(tree).map(([folder, items]) => {
    const isOpen = openFolders[folder] ?? true;

    return (
      <div key={folder} className="group">
        <button
          className="folder"
          onClick={() => onToggleFolder(folder)}
          aria-expanded={isOpen}
        >
          <span className={`chevron ${isOpen ? "open" : ""}`}>▶</span>
          <span className="folder-name">{prettyFolder(folder)}</span>
          <span className="count">{items.length}</span>
        </button>
        {isOpen && (
          <div className="children">
            {items.map((note) => (
              <NoteItem
                key={note.slug}
                note={note}
                activeSlug={activeSlug}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  });
}

export default function Sidebar({
  tree,
  filtered,
  activeSlug,
  openFolders,
  query,
  theme,
  isMobile,
  isCollapsed,
  isOpen,
  onQueryChange,
  onSelect,
  onToggleFolder,
  onOpenAll,
  onCloseAll,
  onToggleTheme,
  onToggleSidebar,
}) {
  const railHidden = !isMobile && isCollapsed;
  const sidebarClasses = [
    "sidebar",
    isMobile ? "mobile" : "",
    isMobile ? (isOpen ? "open" : "closed") : "",
    !isMobile && isCollapsed ? "collapsed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={sidebarClasses}>
      <div className="sidebar-header">
        {!railHidden && (
          <span className="brand">
            <span className="brand-mark">IP</span>
            <span className="brand-name">Interview Prep</span>
          </span>
        )}
        <button
          className="icon-btn"
          title={
            isMobile
              ? "Close menu"
              : isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
          }
          onClick={onToggleSidebar}
        >
          {isMobile ? "✕" : isCollapsed ? "»" : "«"}
        </button>
      </div>

      {!railHidden && (
        <input
          className="search"
          placeholder="Search notes…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      )}

      {!railHidden && !filtered && (
        <div className="tree-actions">
          <button className="link-btn" onClick={onOpenAll}>
            Open all
          </button>
          <span className="tree-actions-sep">·</span>
          <button className="link-btn" onClick={onCloseAll}>
            Close all
          </button>
        </div>
      )}

      {!railHidden && (
        <nav className="nav">
          <SidebarNavigation
            tree={tree}
            filtered={filtered}
            openFolders={openFolders}
            activeSlug={activeSlug}
            onSelect={onSelect}
            onToggleFolder={onToggleFolder}
          />
        </nav>
      )}

      <div className="sidebar-footer">
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          aria-pressed={theme === "dark"}
          onClick={onToggleTheme}
        >
          <span className="theme-icon" aria-hidden="true">
            {theme === "dark" ? "☀" : "☾"}
          </span>
          {!railHidden && (
            <span className="theme-label">
              {theme === "dark" ? "Light theme" : "Dark theme"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
