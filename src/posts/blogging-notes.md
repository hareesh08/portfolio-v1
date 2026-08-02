---
title: "Blogging on my static portfolio"
description: "A quick note on how this blog works — just drop a markdown file in src/posts and it appears here automatically."
date: "2026-08-02"
tags:
  - meta
  - markdown
---

This portfolio is a static site on GitHub Pages, so there's no database or backend. The blog is backed by plain markdown files that get compiled into the bundle at build time and rendered client-side.

## Adding a post

1. Create a new file in `src/posts/`, e.g. `my-first-post.md`.
2. Start it with a frontmatter block:

```md
---
title: My First Post
description: A short one-liner shown on the blog list.
date: "2026-08-30"
tags:
  - react
  - notes
---

Markdown body goes here.
```

3. Push to `main`. CI rebuilds and deploys — the post shows up automatically.

## Supported syntax

- Headings, bold, italics, lists, blockquotes
- Inline code and fenced code blocks
- Tables (via GFM)
- Strikethrough and task lists