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
  posts: PostMeta[];
};

const POSTS_DIR = "src/posts";
const postModules = import.meta.glob("../posts/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const slugify = (fileName: string): string =>
  fileName.replace(/\.md$/, "").replace(/\./g, "-").toLowerCase();

const fileNameOf = (path: string): string => path.split("/").pop() ?? "";

const sectionFromPath = (path: string): string => {
  const rel = path.replace(/\\/g, "/").replace(new RegExp(`^${POSTS_DIR}/`), "");
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

const parseTags = (value: unknown): string[] => {
  if (Array.isArray(value)) return value as string[];
  if (typeof value !== "string") return [];
  const inlineList = /^\[(.*)\]$/.exec(value.trim());
  if (!inlineList) return [];
  return inlineList[1]
    .split(",")
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
};

const buildMeta = (path: string, raw: string): PostMeta => {
  const { meta } = parseFrontmatter(raw);
  return {
    slug: slugify(fileNameOf(path)),
    file: path,
    section: sectionFromPath(path),
    title: (meta.title as string) || "Untitled",
    description: (meta.description as string) ?? "",
    date: (meta.date as string) ?? "",
    tags: parseTags(meta.tags),
    draft: meta.draft === true || meta.draft === "true",
  };
};

const modulePathToPostPath = (path: string): string =>
  path.replace(/^\.\.\/posts\//, `${POSTS_DIR}/`);

const rawByPostPath = new Map(
  Object.entries(postModules).map(([path, raw]) => [modulePathToPostPath(path), raw]),
);

let metaCache: { posts: PostMeta[] } | null = null;

const loadAllMeta = async (): Promise<PostMeta[]> => {
  if (metaCache) return metaCache.posts;
  const posts = [...rawByPostPath.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, raw]) => buildMeta(file, raw));
  metaCache = { posts };
  return posts;
};

const byDate = (a: PostMeta, b: PostMeta) =>
  a.date > b.date ? -1 : a.date < b.date ? 1 : 0;

export const getPostSections = async (): Promise<PostSection[]> => {
  const posts = (await loadAllMeta()).filter((post) => !post.draft);
  const bySection = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const list = bySection.get(post.section) ?? [];
    list.push(post);
    bySection.set(post.section, list);
  }
  return [...bySection.entries()]
    .filter(([, sectionPosts]) => sectionPosts.length > 0)
    .map(([section, sectionPosts]) => ({ section, posts: sectionPosts.sort(byDate) }))
    .sort((a, b) => a.section.localeCompare(b.section));
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const matches = (await loadAllMeta()).filter((post) => !post.draft && post.slug === slug);
  if (matches.length !== 1) return undefined;
  const meta = matches[0];
  const raw = rawByPostPath.get(meta.file);
  if (!raw) return undefined;
  const { content } = parseFrontmatter(raw);
  return { ...meta, content };
};

export const getPostBySectionAndSlug = async (
  section: string,
  slug: string,
): Promise<Post | undefined> => {
  const meta = (await loadAllMeta()).find(
    (post) => !post.draft && post.section === section && post.slug === slug,
  );
  if (!meta) return undefined;
  const raw = rawByPostPath.get(meta.file);
  if (!raw) return undefined;
  const { content } = parseFrontmatter(raw);
  return { ...meta, content };
};
