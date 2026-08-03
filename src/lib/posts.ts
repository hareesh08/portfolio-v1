export interface PostMeta {
  slug: string;
  file: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  section: string;
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export type PostSection = {
  section: string;
  posts: Post[];
};

const modules = import.meta.glob("../posts/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const slugify = (fileName: string): string =>
  fileName.replace(/\.md$/, "").replace(/\./g, "-").toLowerCase();

const sectionFromPath = (path: string): string => {
  const rel = path.replace(/\\/g, "/").replace(/^\.\.\/posts\//, "");
  const parts = rel.split("/");
  return parts.length > 1 ? parts[0] : "notes";
};

const parseFrontmatter = (raw: string) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) {
    return { meta: {}, content: raw };
  }

  const metaRows: Record<string, unknown> = {};
  const lines = match[1].split(/\r?\n/);
  let currentKey = "";
  for (const line of lines) {
    const kv = /^([\w-]+):\s*(.*)$/.exec(line);
    if (kv) {
      metaRows[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
      currentKey = kv[1];
    } else if (currentKey && /^[\s-]+(.*)$/.test(line)) {
      const value = line.replace(/^[\s-]+\s*/, "").replace(/^["']|["']$/g, "");
      if (Array.isArray(metaRows[currentKey])) {
        (metaRows[currentKey] as string[]).push(value);
      } else if (metaRows[currentKey]) {
        metaRows[currentKey] = [metaRows[currentKey] as string, value];
      } else {
        metaRows[currentKey] = [value];
      }
    }
  }

  return { meta: metaRows, content: match[2].trim() };
};

const buildPost = (path: string, raw: string): Post => {
  const fileName = path.split(/[\\/]/).pop() ?? "";
  const { meta, content } = parseFrontmatter(raw);
  return {
    slug: slugify(fileName),
    file: path,
    section: sectionFromPath(path),
    title: (meta.title as string) || "Untitled",
    description: (meta.description as string) ?? "",
    date: (meta.date as string) ?? "",
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
    draft: meta.draft === true || meta.draft === "true",
    content,
  };
};

export const getAllPosts = (): Post[] =>
  Object.entries(modules)
    .map(([path, raw]) => buildPost(path, raw))
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

/** Live posts grouped by their folder/section (skips `draft: true`). */
export const getPostSections = (): PostSection[] => {
  const bySection = new Map<string, Post[]>();
  for (const post of getAllPosts()) {
    if (post.draft) continue;
    const list = bySection.get(post.section) ?? [];
    list.push(post);
    bySection.set(post.section, list);
  }
  return [...bySection.entries()].map(([section, posts]) => ({ section, posts }));
};

export const getPostBySlug = (slug: string): Post | undefined =>
  getAllPosts().find((post) => post.slug === slug);

export const getPostBySectionAndSlug = (
  section: string,
  slug: string,
): Post | undefined =>
  getAllPosts().find((post) => post.section === section && post.slug === slug);