export interface PostMeta {
  slug: string;
  file: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

const modules = import.meta.glob("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const slugify = (fileName: string): string =>
  fileName.replace(/\.md$/, "").replace(/\./g, "-").toLowerCase();

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

const buildPost = (file: string, raw: string): Post => {
  const { meta, content } = parseFrontmatter(raw);
  return {
    slug: slugify(file),
    file,
    title: (meta.title as string) || "Untitled",
    description: (meta.description as string) ?? "",
    date: (meta.date as string) ?? "",
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
    content,
  };
};

export const getAllPosts = (): Post[] =>
  Object.entries(modules)
    .map(([path, raw]) => buildPost(path.split("/").pop() ?? "", raw))
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

export const getPostBySlug = (slug: string): Post | undefined =>
  getAllPosts().find((post) => post.slug === slug);