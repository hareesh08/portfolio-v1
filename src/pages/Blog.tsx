import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostSections } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 6;

const sectionLabel = (section: string): string =>
  section === "projects"
    ? "Projects"
    : section === "articles"
      ? "Articles"
      : section === "notes"
        ? "Notes"
        : section.charAt(0).toUpperCase() + section.slice(1);

const PostCard = ({ post, section }: { post: PostMeta; section: string }) => (
  <Link
    to={`/blog/${section}/${post.slug}`}
    className="block panel-card p-5 sm:p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
  >
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span className="font-mono text-xs text-black/50">{post.date}</span>
      {post.tags.map((tag) => (
        <span key={tag} className="tag !py-0.5">{tag}</span>
      ))}
    </div>
    <div className="flex items-start justify-between gap-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-pink transition-colors">
        {post.title}
      </h2>
      <ArrowUpRight className="w-5 h-5 shrink-0 text-black/40 group-hover:text-pink transition-colors mt-1" />
    </div>
    {post.description && (
      <p className="mt-2 text-sm md:text-base leading-relaxed text-black/60">
        {post.description}
      </p>
    )}
  </Link>
);

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
      <main className="portfolio-shell px-4 md:px-6 pt-28 pb-20 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 chip hover:!border-pink hover:!text-pink mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <p className="section-label mb-3">Notes & updates</p>
        <h1 className="section-title mb-3">Blog</h1>
        <p className="section-subtitle mb-8">
          Short write-ups on the tech, design, and decisions behind this site.
        </p>

        {isLoading ? (
          <div className="space-y-3">
            <div className="h-24 panel-card animate-pulse" />
            <div className="h-24 panel-card animate-pulse" />
            <div className="h-24 panel-card animate-pulse" />
          </div>
        ) : isError ? (
          <p className="text-sm text-black/60">
            Couldn't load posts from GitHub. If you've pushed new markdown, give it a minute and refresh —
            the GitHub API rate limit may also be hit.
          </p>
        ) : sections.length === 0 ? (
          <p className="text-sm text-black/50">
            No posts found. This blog loads its content directly from the
            <code className="font-mono"> src/posts/</code> folder in the GitHub repo.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeTab === "all"
                    ? "bg-pink/15 border-pink text-pink"
                    : "border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink"
                }`}
              >
                All
                <span className="ml-1.5 text-xs opacity-70">{allPosts.length}</span>
              </button>
              {sectionNames.map((name) => {
                const count = allPosts.filter((p) => p.section === name).length;
                return (
                  <button
                    key={name}
                    onClick={() => setActiveTab(name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      activeTab === name
                        ? "bg-pink/15 border-pink text-pink"
                        : "border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink"
                    }`}
                  >
                    {sectionLabel(name)}
                    <span className="ml-1.5 text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>

            {paged.length === 0 ? (
              <p className="text-sm text-black/50">No posts in this section yet.</p>
            ) : (
              <div className="space-y-4">
                {paged.map((post) => (
                  <PostCard key={`${post.section}-${post.slug}`} post={post} section={post.section} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-sm border border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                        n === page
                          ? "bg-pink/20 border border-pink text-pink"
                          : "border border-white/60 bg-white/30 text-black/50 hover:border-pink/50 hover:text-pink"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-sm border border-white/60 bg-white/40 text-black/60 hover:border-pink/50 hover:text-pink disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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