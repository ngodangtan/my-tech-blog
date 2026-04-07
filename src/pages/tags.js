import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const TagsPage = ({ data }) => {
  const tagCounts = {}

  data.allMarkdownRemark.nodes.forEach(node => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <Layout>
      <SEO title="Tags" description="Browse all blog posts by tag." />
      <h1 style={{ fontFamily: "sans-serif", marginBottom: "1.5rem" }}>Tags</h1>
      <div className="tag-list" style={{ gap: "0.75rem" }}>
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            to={`/tags/${tag.toLowerCase().replace(/\s+/g, `-`)}/`}
            className="tag"
            style={{
              textDecoration: "none",
              fontSize: "0.9rem",
              padding: "0.35rem 0.85rem",
            }}
          >
            #{tag}{" "}
            <span style={{ opacity: 0.6, fontSize: "0.8em" }}>{count}</span>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`

export default TagsPage
