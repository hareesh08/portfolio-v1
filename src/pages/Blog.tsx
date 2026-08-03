import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostSections } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const POSTS_PER_PAGE = 6;

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

const PostCard = ({ post, section }: { post: PostMeta; section: string }) => {
  const style = getSectionStyle(section);
  return (
    <Link
      to={`/blog/${section}/${post.slug}`}
      className="group block panel-card overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`h-1 w-full ${style.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs text-black/50 dark:text-white/50">{post.date}</span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg} ${style.color} ${style.border}`}>
            <FolderOpen className="w-3 h-3" />
            {style.label}
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="tag !py-0.5">{tag}</span>
          ))}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-pink transition-colors">
            {post.title}
          </h2>
          <ArrowUpRight className="w-5 h-5 shrink-0 text-black/30 dark:text-white/30 group-hover:text-pink group-hover:rotate-45 transition-all duration-300 mt-1" />
        </div>
        {post.description && (
          <p className="mt-2 text-sm md:text-base leading-relaxed text-black/60 dark:text-white/60">
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
};

const Blog = () => {
  const {
    data: sections = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", "sections"],
    queryFn: getPostSections,
    staleTime: 5 * 60 * 1000,
  });

  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const allPosts = sections.flatMap(({ section, posts }) =>
    posts.map((post) => ({ ...post, section })),
  );

  const sectionNames = [...new Set(sections.map((s) => s.section))];

  const filtered = activeTab === "all"
    ? allPosts
    : allPosts.filter((p) => p.section === activeTab);

  const sorted = [...filtered].sort((a, b) =>
    a.date > b.date ? -1 : a.date < b.date ? 1 : 0,
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / POSTS_PER_PAGE));
  const paged = sorted.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen">
      <DarkModeToggle />
      <main id="main-content" tabIndex={-1} className="portfolio-shell px-4 md:px-6 pt-28 pb-20 max-w-4xl outline-none">
        <Link
          to="/"
          className="inline-flex items-center gap-2 chip hover:!border-pink hover:!text-pink mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <p className="section-label mb-3">Notes & updates</p>
        <h1 className="section-title mb-3">Blog</h1>
        <p className="section-subtitle mb-10">
          Short write-ups on the tech, design, and decisions behind this site.
        </p>

        {isLoading ? (
          <div className="space-y-3">
            <div className="h-28 panel-card animate-pulse" />
            <div className="h-28 panel-card animate-pulse" />
            <div className="h-28 panel-card animate-pulse" />
          </div>
        ) : isError ? (
          <p className="text-sm text-black/60 dark:text-white/60">
            Couldn't load the bundled posts. Refresh the page or try again shortly.
          </p>
        ) : sections.length === 0 ? (
          <p className="text-sm text-black/50 dark:text-white/50">
            No posts found in the bundled <code className="font-mono">src/posts/</code> folder.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeTab === "all"
                    ? "bg-pink/15 border-pink text-pink shadow-sm shadow-pink/20"
                    : "border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink dark:border-white/10 dark:bg-white/6 dark:text-white/60 dark:hover:border-pink/50 dark:hover:text-pink"
                }`}
              >
                All
                <span className="ml-1.5 text-xs opacity-70">{allPosts.length}</span>
              </button>
              {sectionNames.map((name) => {
                const style = getSectionStyle(name);
                const count = allPosts.filter((p) => p.section === name).length;
                const isActive = activeTab === name;
                return (
                  <button
                    key={name}
                    onClick={() => setActiveTab(name)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? `${style.bg} ${style.color} ${style.border} shadow-sm`
                        : "border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink dark:border-white/10 dark:bg-white/6 dark:text-white/60 dark:hover:border-pink/50 dark:hover:text-pink"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${style.dot} ${isActive ? "opacity-100" : "opacity-40"}`} />
                    {style.label}
                    <span className="ml-1 text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>

            {paged.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-black/40 dark:text-white/40">No posts in this section yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {paged.map((post) => (
                  <PostCard key={`${post.section}-${post.slug}`} post={post} section={post.section} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-14">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium border border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink disabled:opacity-25 disabled:cursor-not-allowed transition-all dark:border-white/10 dark:bg-white/6 dark:text-white/60 dark:hover:border-pink/50 dark:hover:text-pink"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                        n === page
                          ? "bg-pink text-white shadow-md shadow-pink/30 scale-110"
                          : "border border-white/60 bg-white/30 text-black/50 hover:border-pink/50 hover:text-pink dark:border-white/10 dark:bg-white/6 dark:text-white/50 dark:hover:border-pink/50 dark:hover:text-pink"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium border border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink disabled:opacity-25 disabled:cursor-not-allowed transition-all dark:border-white/10 dark:bg-white/6 dark:text-white/60 dark:hover:border-pink/50 dark:hover:text-pink"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Blog;
