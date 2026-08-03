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

const REPO_OWNER = "hareesh08";
const REPO_NAME = "portfolio-v1";
const REPO_BRANCH = "main";
const POSTS_DIR = "src/posts";

const rawBase = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`;
const treeUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=1`;

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

const buildMeta = (path: string, raw: string): PostMeta => {
  const { meta } = parseFrontmatter(raw);
  return {
    slug: slugify(fileNameOf(path)),
    file: path,
    section: sectionFromPath(path),
    title: (meta.title as string) || "Untitled",
    description: (meta.description as string) ?? "",
    date: (meta.date as string) ?? "",
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
    draft: meta.draft === true || meta.draft === "true",
  };
};

const listPostFiles = async (): Promise<string[]> => {
  const res = await fetch(treeUrl);
  if (!res.ok) throw new Error(`GitHub tree request failed (${res.status})`);
  const data = (await res.json()) as { tree?: { path?: string }[] };
  return (data.tree ?? [])
    .map((node) => node.path ?? "")
    .filter((path) => path.startsWith(`${POSTS_DIR}/`) && path.endsWith(".md"))
    .sort();
};

const fetchRaw = async (path: string): Promise<string> => {
  const res = await fetch(`${rawBase}/${path}`);
  if (!res.ok) throw new Error(`Could not fetch ${path} (${res.status})`);
  return res.text();
};

let metaCache: { posts: PostMeta[] } | null = null;

const loadAllMeta = async (): Promise<PostMeta[]> => {
  if (metaCache) return metaCache.posts;
  const files = await listPostFiles();
  const posts = (
    await Promise.all(
      files.map(async (file) => {
        try {
          return buildMeta(file, await fetchRaw(file));
        } catch {
          return null;
        }
      }),
    )
  ).filter((post): post is PostMeta => post !== null);
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
  const meta = (await loadAllMeta()).find((post) => post.slug === slug);
  if (!meta) return undefined;
  const { content } = parseFrontmatter(await fetchRaw(meta.file));
  return { ...meta, content };
};

export const getPostBySectionAndSlug = async (
  section: string,
  slug: string,
): Promise<Post | undefined> => {
  const meta = (await loadAllMeta()).find(
    (post) => post.section === section && post.slug === slug,
  );
  if (!meta) return undefined;
  const { content } = parseFrontmatter(await fetchRaw(meta.file));
  return { ...meta, content };
};