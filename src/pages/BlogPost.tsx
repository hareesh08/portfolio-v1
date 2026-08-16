import { isValidElement } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostBySectionAndSlug } from "@/lib/posts";
import { ArrowLeft, Loader2, FolderOpen } from "lucide-react";
import MermaidDiagram from "@/components/MermaidDiagram";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const sectionConfig: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  projects: {
    label: "Projects",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800",
    dot: "bg-rose-500",
  },
  articles: {
    label: "Articles",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    dot: "bg-blue-500",
  },
  notes: {
    label: "Notes",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
};

const getSectionStyle = (section: string) =>
  sectionConfig[section] ?? {
    label: section.charAt(0).toUpperCase() + section.slice(1),
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  };

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
    <p className="my-4 leading-relaxed text-black/75 dark:text-white/75">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-4 list-disc pl-6 space-y-1 text-black/75 dark:text-white/75">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-4 list-decimal pl-6 space-y-1 text-black/75 dark:text-white/75">{children}</ol>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-pink underline hover:opacity-80" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-4 border-l-4 border-pink pl-4 italic text-black/70 dark:text-white/70">{children}</blockquote>
  ),
  // react-markdown v9+ removed the `inline` prop from code components.
  // Inline code is a `code` element with no language class; fenced blocks are
  // always wrapped in the `pre` below, so styling is split between the two.
  pre: ({ children }: { children?: React.ReactNode }) => {
    const child = Array.isArray(children) ? children[0] : children;
    if (isValidElement(child) && child.type === MermaidDiagram) {
      return <>{children}</>;
    }
    return (
      <pre className="my-4 overflow-x-auto rounded-2xl border border-white/80 dark:border-white/8 bg-white/60 dark:bg-white/6 p-4 text-sm">
        {children}
      </pre>
    );
  },
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isMermaid = className?.includes("language-mermaid");

    if (isMermaid) {
      return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
    }

    if (className?.includes("language-")) {
      return <code className={`font-mono text-[0.9em] ${className ?? ""}`}>{children}</code>;
    }

    return <code className="font-mono text-[0.9em] bg-white/70 dark:bg-white/8 border border-white dark:border-white/10 px-1.5 py-0.5 rounded-md text-black/80 dark:text-white/80">{children}</code>;
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-white/80 dark:border-white/8 bg-white/50 dark:bg-white/5">
      <table className="w-full text-sm text-black/75 dark:text-white/75">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-white/60 dark:bg-white/6 text-left">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-2.5 font-bold border-b border-white/80 dark:border-white/8">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-2.5 border-b border-white/60 dark:border-white/6">{children}</td>
  ),
  hr: () => <hr className="my-8 border-white/80 dark:border-white/8" />,
};

const BlogPost = () => {
  const { slug, section } = useParams<{ slug: string; section?: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", section ?? "", slug ?? ""],
    queryFn: () =>
      section && slug
        ? getPostBySectionAndSlug(section, slug)
        : slug
          ? getPostBySlug(slug)
          : Promise.resolve(undefined),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DarkModeToggle />
        <Loader2 className="w-8 h-8 animate-spin text-pink" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <DarkModeToggle />
        <main id="main-content" tabIndex={-1} className="portfolio-shell px-4 md:px-6 pt-28 pb-20 max-w-3xl outline-none">
          <Link to="/blog" className="inline-flex items-center gap-2 chip hover:!border-pink hover:!text-pink mb-10">
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>
          <div className="panel-card p-6 md:p-10">
            <p className="text-sm text-black/60 dark:text-white/60">
              Couldn't load this post from GitHub. Check the link or refresh shortly.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen">
      <DarkModeToggle />
      <main id="main-content" tabIndex={-1} className="portfolio-shell px-4 md:px-6 pt-28 pb-20 max-w-3xl outline-none">
        <Link to="/blog" className="inline-flex items-center gap-2 chip hover:!border-pink hover:!text-pink mb-10">
          <ArrowLeft className="w-4 h-4" />
          All posts
        </Link>

        <div className="panel-card overflow-hidden">
          {post.section && (() => {
            const style = getSectionStyle(post.section);
            return (
              <div className={`h-1.5 w-full ${style.dot}`} />
            );
          })()}
          <div className="p-5 sm:p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.section && (() => {
                const style = getSectionStyle(post.section);
                return (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg} ${style.color} ${style.border}`}>
                    <FolderOpen className="w-3 h-3" />
                    {style.label}
                  </span>
                );
              })()}
              <span className="font-mono text-xs text-black/50 dark:text-white/50">{post.date}</span>
              {post.tags.map((tag) => (
                <span key={tag} className="tag !py-0.5">{tag}</span>
              ))}
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-ink mb-8">{post.title}</h1>

            <div className="prose prose-slate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
