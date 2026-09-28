import { prettyNote } from "../data/topics";

export default function MobileTopbar({ active, onOpen }) {
  return (
    <header className="topbar">
      <button className="icon-btn" aria-label="Open menu" onClick={onOpen}>
        ☰
      </button>
      <span className="topbar-title">
        {active ? prettyNote(active.name) : "Notes"}
      </span>
      <span style={{ width: 26 }} />
    </header>
  );
}
