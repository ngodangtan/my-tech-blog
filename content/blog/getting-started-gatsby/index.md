---
title: "Getting Started with Gatsby in 2025"
date: "2025-01-15"
description: "A practical guide to setting up a Gatsby blog from scratch — covering setup, markdown, and deployment to GitHub Pages."
tags: ["Gatsby", "React", "Tutorial"]
---

## Prerequisites

Before you start, make sure you have:

- Node.js >= 18
- npm >= 9
- A GitHub account (for deployment)

## Step 1: Install Gatsby CLI

```bash
npm install -g gatsby-cli
```

Verify the install:

```bash
gatsby --version
```

## Step 2: Create a new site

```bash
gatsby new my-blog
cd my-blog
```

## Step 3: Start the development server

```bash
gatsby develop
```

Visit `http://localhost:8000` — your blog is live locally!

You'll also get GraphiQL at `http://localhost:8000/___graphql` — a useful tool for exploring your data.

## Step 4: Add your first post

Create a file at `content/blog/my-first-post/index.md`:

```markdown
---
title: "My First Post"
date: "2025-01-15"
description: "Hello from my Gatsby blog!"
tags: ["meta"]
---

## Hello world

This is my first blog post.
```

Gatsby hot-reloads, so you'll see it instantly.

## Step 5: Build for production

```bash
gatsby build
```

The output goes to `/public`. You can preview it with:

```bash
gatsby serve
```

## Step 6: Deploy to GitHub Pages

```bash
npm install gh-pages --save-dev
npm run deploy
```

This builds the site and pushes it to the `gh-pages` branch. Enable GitHub Pages in your repo settings (source: `gh-pages` branch) and you're live.

## Tips

- Use `gatsby clean` when you hit weird caching issues
- Keep your frontmatter consistent — Gatsby's GraphQL schema is inferred from your content
- PrismJS themes are easy to swap — just change the import in `Layout.js`

Happy blogging!
