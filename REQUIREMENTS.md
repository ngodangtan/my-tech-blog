# 📋 Personal Tech Blog — Project Requirements
> Input file for Claude Code · Stack: Gatsby + GitHub Pages + Utterances

---

## 🎯 Project Overview

Build a **personal technical blog** as a static site — clean, fast, minimal — similar to [antran.app](https://antran.app).  
Target audience: developers, mobile engineers, tech enthusiasts.

| Item | Detail |
|---|---|
| **Framework** | GatsbyJS (React-based Static Site Generator) |
| **Hosting** | GitHub Pages (free) |
| **Comments** | Utterances (GitHub Issues) |
| **Content** | Markdown (`.md`) files |
| **Styling** | CSS Modules hoặc Tailwind CSS |
| **Language** | JavaScript (ES2020+) + JSX |
| **Node** | >= 18.x |

---

## 📁 Project Structure

```
my-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml              ← CI/CD tự động deploy
├── content/
│   └── blog/
│       ├── hello-world/
│       │   ├── index.md            ← bài viết mẫu 1
│       │   └── cover.png
│       └── getting-started-gatsby/
│           └── index.md            ← bài viết mẫu 2
├── src/
│   ├── components/
│   │   ├── Layout.js               ← wrapper toàn trang
│   │   ├── Header.js               ← navigation + logo
│   │   ├── Footer.js               ← footer đơn giản
│   │   ├── Bio.js                  ← giới thiệu tác giả
│   │   ├── PostCard.js             ← card preview bài viết
│   │   ├── Comments.js             ← Utterances widget
│   │   ├── SEO.js                  ← meta tags, OG tags
│   │   └── TagList.js              ← hiển thị tags
│   ├── pages/
│   │   ├── index.js                ← trang chủ (danh sách bài)
│   │   ├── about.js                ← trang giới thiệu
│   │   └── 404.js                  ← trang not found
│   ├── templates/
│   │   └── blog-post.js            ← template render bài viết
│   └── styles/
│       ├── global.css              ← reset + biến CSS
│       └── typography.css          ← font + heading styles
├── static/
│   ├── CNAME                       ← custom domain (để trống nếu chưa có)
│   └── favicon.ico
├── gatsby-config.js                ← cấu hình plugins
├── gatsby-node.js                  ← tạo pages động từ markdown
├── package.json
└── README.md
```

---

## ⚙️ gatsby-config.js — Plugins cần cài

```js
module.exports = {
  siteMetadata: {
    title: `My Blog`,
    author: {
      name: `Your Name`,
      summary: `Mobile developer. Minimalist.`,
    },
    description: `A personal technical blog about mobile, AI, and clean code.`,
    siteUrl: `https://yourusername.github.io`,
    social: {
      twitter: `yourusername`,
      github: `yourusername`,
    },
  },
  plugins: [
    // Đọc file markdown
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `blog`, path: `${__dirname}/content/blog` },
    },
    // Render markdown → HTML
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,            // syntax highlighting code
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 800, quality: 90 },
          },
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,       // estimated read time
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,            // SEO <head> tags
    // RSS feed tự động
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `{ site { siteMetadata { title description siteUrl } } }`,
        feeds: [
          {
            output: `/rss.xml`,
            title: `My Blog RSS Feed`,
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map(node => ({
                ...node.frontmatter,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `{
              allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
                nodes {
                  html
                  fields { slug }
                  frontmatter { date title description }
                }
              }
            }`,
          },
        ],
      },
    },
    // Sitemap cho SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: { output: `/sitemap.xml` },
    },
  ],
}
```

---

## 📦 package.json — Dependencies

```json
{
  "name": "my-blog",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "deploy": "gatsby build && gh-pages -d public -b gh-pages"
  },
  "dependencies": {
    "gatsby": "^5.0.0",
    "gatsby-plugin-feed": "^5.0.0",
    "gatsby-plugin-image": "^3.0.0",
    "gatsby-plugin-react-helmet": "^6.0.0",
    "gatsby-plugin-sharp": "^5.0.0",
    "gatsby-plugin-sitemap": "^6.0.0",
    "gatsby-remark-copy-linked-files": "^6.0.0",
    "gatsby-remark-images": "^7.0.0",
    "gatsby-remark-prismjs": "^7.0.0",
    "gatsby-remark-reading-time": "^1.1.0",
    "gatsby-remark-responsive-iframe": "^6.0.0",
    "gatsby-remark-smartypants": "^6.0.0",
    "gatsby-source-filesystem": "^5.0.0",
    "gatsby-transformer-remark": "^6.0.0",
    "gatsby-transformer-sharp": "^5.0.0",
    "prismjs": "^1.29.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-helmet": "^6.1.0"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

---

## 🧩 Components — Yêu cầu chi tiết

### `src/components/Layout.js`
- Wrapper cho toàn bộ trang
- Gồm `<Header>` ở trên, `<main>` ở giữa, `<Footer>` ở dưới
- Max-width container: `860px`, căn giữa, padding ngang `1.5rem`
- Responsive trên mobile

### `src/components/Header.js`
- Logo/tên blog bên trái (link về trang chủ)
- Navigation links bên phải: `Home`, `About`
- Sticky header với slight shadow khi scroll
- Mobile: hamburger menu hoặc ẩn nav

### `src/components/Bio.js`
- Avatar tròn (dùng `StaticImage`)
- Tên tác giả + mô tả ngắn
- Links mạng xã hội: GitHub, Twitter/X
- Hiển thị ở đầu trang chủ và cuối mỗi bài viết

### `src/components/PostCard.js`
- Tiêu đề bài (link)
- Ngày đăng (format: `January 1, 2025`)
- Reading time (`X min read`)
- Mô tả ngắn (`description` từ frontmatter)
- Tags (nếu có)

### `src/components/Comments.js`
```jsx
import React, { useEffect, useRef } from "react"

const Comments = () => {
  const ref = useRef()
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", "GITHUB_USERNAME/blog")   // ← THAY THẾ
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("label", "💬 comment")
    script.setAttribute("theme", "github-light")
    script.crossOrigin = "anonymous"
    script.async = true
    ref.current.appendChild(script)
  }, [])
  return <div ref={ref} style={{ marginTop: "3rem" }} />
}

export default Comments
```

### `src/components/SEO.js`
- Nhận props: `title`, `description`, `image`, `url`
- Output: `<title>`, `<meta description>`, Open Graph tags, Twitter Card tags
- Fallback về siteMetadata khi không có props

---

## 📄 Pages — Yêu cầu chi tiết

### `src/pages/index.js` (Trang chủ)
- GraphQL query lấy toàn bộ bài viết, sắp xếp theo ngày giảm dần
- Hiển thị `<Bio>` ở đầu trang
- Danh sách `<PostCard>` cho từng bài
- Phân trang (pagination): 10 bài / trang

```graphql
query {
  allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
    nodes {
      excerpt(pruneLength: 160)
      fields { slug }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
      timeToRead
    }
  }
}
```

### `src/pages/about.js` (Giới thiệu)
- Nội dung tĩnh: ảnh, tên, bio dài, skills, contact
- Không cần query GraphQL

### `src/templates/blog-post.js` (Bài viết)
- Render `post.html` (đã processed từ markdown)
- Hiển thị: tiêu đề, ngày, reading time, tags
- Nút điều hướng: `← Previous` / `Next →`
- `<Bio>` cuối bài
- `<Comments>` cuối cùng
- Syntax highlighting cho code blocks (via PrismJS)

---

## 📝 Markdown Frontmatter — Chuẩn

Mỗi file `.md` phải có frontmatter đúng format:

```yaml
---
title: "Tiêu đề bài viết rõ ràng"
date: "2025-01-15"
description: "Mô tả ngắn 1-2 câu, hiển thị trên danh sách bài và SEO"
tags: ["Swift", "iOS", "Tutorial"]
cover: "./cover.png"   # tuỳ chọn
---
```

---

## 🎨 Styling — Design System

### Typography
```css
/* src/styles/global.css */
:root {
  --font-body: 'Georgia', 'Times New Roman', serif;
  --font-code: 'Fira Code', 'Courier New', monospace;
  --font-size-base: 18px;
  --line-height-base: 1.75;

  --color-text: #1a1a1a;
  --color-text-muted: #6b7280;
  --color-link: #0066cc;
  --color-link-hover: #0044aa;
  --color-bg: #ffffff;
  --color-border: #e5e7eb;
  --color-code-bg: #f6f8fa;

  --max-width: 860px;
  --spacing-unit: 8px;
}
```

### Yêu cầu design
- **Minimal & clean** — ưu tiên readability, không decoration thừa
- Font chữ dạng serif cho body text (dễ đọc bài dài)
- Code blocks: dark theme (Prism `okaidia` hoặc `tomorrow-night`)
- Màu link màu xanh đậm, underline khi hover
- Heading: `h1` to, `h2`/`h3` có border-bottom nhẹ
- Ảnh trong bài: `border-radius: 4px`, max-width 100%

---

## 🔧 gatsby-node.js — Tạo pages động

```js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          fields { slug }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.nodes
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  posts.forEach((post, index) => {
    const prev = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: { id: post.id, prevId: prev?.id, nextId: next?.id },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({ name: `slug`, node, value: slug })
  }
}
```

---

## 🚀 CI/CD — GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node 18
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          PREFIX_PATHS: true

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          cname: yourdomain.com    # xoá dòng này nếu chưa có custom domain
```

---

## 🌐 Custom Domain Setup (tuỳ chọn)

1. Tạo file `static/CNAME` với nội dung là domain của bạn:
   ```
   yourdomain.com
   ```

2. Cấu hình DNS tại nhà cung cấp domain:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | yourusername.github.io |

3. Bật **Enforce HTTPS** trong GitHub Pages settings

---

## 📝 Bài viết mẫu

### `content/blog/hello-world/index.md`

```markdown
---
title: "Hello World — Why I Started This Blog"
date: "2025-01-01"
description: "The first post. My motivation for starting a technical blog and what to expect."
tags: ["personal", "blogging"]
---

## Why blog in 2025?

Every developer should write...

## What I'll write about

- **Swift & iOS** — native mobile development
- **Kotlin & Android** — cross-platform thinking
- **Machine Learning** — on-device ML experiments
- **Minimalism** — in code and in life

Stay tuned.
```

### `content/blog/getting-started-gatsby/index.md`

```markdown
---
title: "Getting Started with Gatsby in 2025"
date: "2025-01-15"
description: "A practical guide to setting up a Gatsby blog from scratch."
tags: ["Gatsby", "React", "Tutorial"]
---

## Prerequisites

- Node.js >= 18
- npm >= 9

## Step 1: Install Gatsby CLI

\`\`\`bash
npm install -g gatsby-cli
gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog
cd my-blog
gatsby develop
\`\`\`

Visit `http://localhost:8000` — your blog is live locally!
```

---

## ✅ Acceptance Criteria

Claude Code cần đảm bảo các tiêu chí sau trước khi kết thúc:

- [ ] `gatsby develop` chạy thành công, không có lỗi
- [ ] Trang chủ `/` hiển thị danh sách bài viết
- [ ] Click vào bài → mở đúng trang bài viết
- [ ] Code blocks có syntax highlighting
- [ ] `<Comments>` component render đúng ở cuối bài
- [ ] `gatsby build` thành công, output vào `/public`
- [ ] GitHub Actions workflow file tồn tại và đúng cú pháp
- [ ] `npm run deploy` push lên branch `gh-pages`
- [ ] SEO: mỗi trang có `<title>` và `<meta description>` riêng
- [ ] Responsive: hiển thị đúng trên mobile (375px) và desktop (1280px)
- [ ] Không có console errors khi chạy production build

---

## ⚠️ Lưu ý quan trọng cho Claude Code

1. **Thay thế placeholders** — tìm và thay tất cả `yourusername`, `GITHUB_USERNAME`, `yourdomain.com` trước khi chạy
2. **Utterances repo** — phải là **public** repo mới hoạt động được
3. **GitHub App** — người dùng phải tự cài [utteranc.es](https://utteranc.es) GitHub App cho repo của mình
4. **pathPrefix** — nếu deploy vào `username.github.io/repo-name` (không phải root), thêm `pathPrefix: '/repo-name'` vào `gatsby-config.js`
5. **Node version** — Gatsby 5 yêu cầu Node >= 18, không dùng Node 16

---

*Generated for Claude Code · Stack: Gatsby 5 + GitHub Pages + Utterances · Last updated: 2025*
