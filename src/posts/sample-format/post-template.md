---
title: Post template
description: Copy this file to start a new post. Put it in projects/, articles/, or any folder to make a section.
date: "2026-08-03"
tags:
  - template
draft: true
---

This is the template for every post. Each post is a markdown file with a frontmatter block; the **folder** it lives in becomes its blog section and URL.

## Where files go

- `src/posts/projects/<project-name>.md` → `/blog/projects/<project-name>`
- `src/posts/articles/<article-title>.md` → `/blog/articles/<article-title>`
- `src/posts/<anything>.md` (top level) → grouped under **Notes** → `/blog/<anything>`

## Frontmatter

```md
---
title: My Post Title
description: A one-liner shown on the blog list.
date: "2026-08-03"
tags:
  - react
  - notes
draft: false
---
```

`draft: true` hides the post from the index but keeps the URL working. Remove it when ready to publish.

## Body

Write markdown below the frontmatter. Headings, lists, tables (GFM), code blocks, and blockquotes all render on the post page.