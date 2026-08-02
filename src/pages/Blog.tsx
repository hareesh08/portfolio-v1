import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const Blog = () => {
  const posts = getAllPosts();

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
        <p className="section-subtitle mb-12">
          Short write-ups on the tech, design, and decisions behind this site.
        </p>

        {posts.length === 0 ? (
          <p className="text-sm text-black/50">
            No posts yet. Drop a markdown file into <code className="font-mono">src/posts/</code> to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block panel-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-black/50">{post.date}</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag !py-0.5">{tag}</span>
                  ))}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-pink transition-colors">
                    {post.title}
                  </h2>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-black/40 group-hover:text-pink transition-colors" />
                </div>
                {post.description && (
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-black/60">
                    {post.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;