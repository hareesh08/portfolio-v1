import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostBySectionAndSlug } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="mt-10 mb-4 text-2xl md:text-3xl font-bold tracking-tight text-ink">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mt-8 mb-3 text-xl md:text-2xl font-bold tracking-tight text-ink">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mt-6 mb-2 text-lg font-bold tracking-tight text-ink">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="my-4 leading-relaxed text-black/75">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-4 list-disc pl-6 space-y-1 text-black/75">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-4 list-decimal pl-6 space-y-1 text-black/75">{children}</ol>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-pink underline hover:opacity-80" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-4 border-l-4 border-pink pl-4 italic text-black/70">{children}</blockquote>
  ),
  code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
    if (inline) {
      return <code className="font-mono text-[0.9em] bg-white/70 border border-white px-1.5 py-0.5 rounded-md text-black/80">{children}</code>;
    }
    return (
      <pre className={`my-4 overflow-x-auto rounded-2xl border border-white/80 bg-white/60 p-4 text-sm ${className ?? ""}`}>
        <code>{children}</code>
      </pre>
    );
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-white/80 bg-white/50">
      <table className="w-full text-sm text-black/75">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-white/60 text-left">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-2.5 font-bold border-b border-white/80">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-2.5 border-b border-white/60">{children}</td>
  ),
  hr: () => <hr className="my-8 border-white/80" />,
};

const BlogPost = () => {
  const { slug, section } = useParams<{ slug: string; section?: string }>();
  const post = section && slug
    ? getPostBySectionAndSlug(section, slug)
    : slug
      ? getPostBySlug(slug)
      : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen">
      <main className="portfolio-shell px-4 md:px-6 pt-28 pb-20 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 chip hover:!border-pink hover:!text-pink mb-10">
          <ArrowLeft className="w-4 h-4" />
          All posts
        </Link>

        <div className="panel-card p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-black/50">{post.date}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="tag !py-0.5">{tag}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-ink mb-6">{post.title}</h1>

          <div className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;