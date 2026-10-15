import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { prettyFolder } from "../data/topics";

function resolveMarkdownNotePath(note, href) {
  if (!href) return null;

  const folderPath = note.folder.split("/").map(encodeURIComponent).join("/");
  const origin = "http://prephub.local";
  let target;

  try {
    target = new URL(href, `${origin}/learn/${folderPath}/`);
  } catch {
    return null;
  }

  if (
    target.origin !== origin ||
    !target.pathname.startsWith("/learn/") ||
    !target.pathname.toLowerCase().endsWith(".md")
  ) {
    return null;
  }

  try {
    const slug = target.pathname
      .slice("/learn/".length)
      .replace(/\.md$/i, "")
      .split("/")
      .map(decodeURIComponent)
      .join("/");
    const encodedSlug = slug.split("/").map(encodeURIComponent).join("/");
    return `/learn/${encodedSlug}${target.search}${target.hash}`;
  } catch {
    return null;
  }
}

export default function NoteContent({ note }) {
  if (!note) return <p>Pick a note from the sidebar.</p>;

  function MarkdownLink({ href, children, node, ...props }) {
    void node;
    const to = resolveMarkdownNotePath(note, href);

    return to ? (
      <Link to={to} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <article className="markdown">
      <p className="crumb">{prettyFolder(note.folder)}</p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{ a: MarkdownLink }}
      >
        {note.content}
      </ReactMarkdown>
    </article>
  );
}
