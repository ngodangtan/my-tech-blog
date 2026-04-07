# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal technical blog by Tan Ngo, built with **Gatsby 5**, deployed to **GitHub Pages**, with **Utterances** for comments. Content is written in Markdown.

- **Site URL**: https://ngodangtan.github.io
- **Path prefix**: `/my-tech-blog` (required for GitHub Pages subdirectory deploy)
- **Node requirement**: >= 18

## Commands

```bash
npm run develop     # Start dev server at http://localhost:8000
npm run build       # Production build to /public
npm run serve       # Serve production build locally
npm run clean       # Clear Gatsby cache (.cache/ and public/)
npm run deploy      # Build with --prefix-paths and push to gh-pages branch
```

## Architecture

**Content pipeline**: Markdown files in `content/blog/` → `gatsby-source-filesystem` → `gatsby-transformer-remark` → HTML pages.

**URL structure**: Year-based slugs generated in `gatsby-node.js` via `onCreateNode`. A post dated 2025-01-15 at `content/blog/getting-started-gatsby/index.md` becomes `/2025/getting-started-gatsby/`.

**Page generation** (`gatsby-node.js`):
- Blog posts: created from markdown nodes using `src/templates/blog-post.js`, with prev/next navigation context
- Tag pages: created at `/tags/{tag-slug}/` using `src/templates/tag.js`, one per unique tag

**Key config** (`gatsby-config.js`):
- Remark plugins: PrismJS (syntax highlighting), images, reading time, smartypants
- Auto-generated RSS feed at `/rss.xml` and sitemap at `/sitemap.xml`

## Writing Blog Posts

Create a folder under `content/blog/` with an `index.md`:

```markdown
---
title: "Post Title"
date: "2025-01-01"
description: "Short description for SEO and post cards."
tags: ["tag1", "tag2"]
---

Content here.
```

The `date` field determines the year prefix in the URL. Tags are optional but drive tag page generation.

## Comments

Utterances is configured in `src/components/Comments.js`. The repo attribute must point to a public GitHub repo with the Utterances GitHub App installed.
