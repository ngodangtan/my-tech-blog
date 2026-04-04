# My Blog

A personal technical blog built with Gatsby + GitHub Pages + Utterances.

## Development

```bash
npm install
npm run develop
```

Visit `http://localhost:8000`

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

Pushes to `gh-pages` branch. Enable GitHub Pages in repo settings.

## Writing posts

Add a new folder under `content/blog/` with an `index.md`:

```markdown
---
title: "Post Title"
date: "2025-01-01"
description: "Short description."
tags: ["tag1", "tag2"]
---

Your content here.
```

## Comments (Utterances)

Install the [Utterances GitHub App](https://utteranc.es) on your repo to enable comments.
Update the `repo` attribute in `src/components/Comments.js`.
