import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { prettyFolder } from "../data/topics";

export default function NoteContent({ note }) {
  if (!note) return <p>Pick a note from the sidebar.</p>;

  return (
    <article className="markdown">
      <p className="crumb">{prettyFolder(note.folder)}</p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
      >
        {note.content}
      </ReactMarkdown>
    </article>
  );
}
