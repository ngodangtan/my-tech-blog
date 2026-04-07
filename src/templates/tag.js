import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostCard from "../components/PostCard"

const TagPage = ({ data, pageContext }) => {
  const { tag } = pageContext
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  return (
    <Layout>
      <SEO
        title={`#${tag}`}
        description={`${totalCount} post${totalCount === 1 ? "" : "s"} tagged with #${tag}`}
      />
      <div style={{ marginBottom: "2rem" }}>
        <Link
          to="/"
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
            textDecoration: "none",
          }}
        >
          ← All posts
        </Link>
        <h1 style={{ marginTop: "1rem", fontFamily: "sans-serif" }}>
          #{tag}
        </h1>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
            color: "var(--color-text-muted)",
            marginTop: "0.25rem",
          }}
        >
          {totalCount} post{totalCount === 1 ? "" : "s"}
        </p>
      </div>
      <section>
        {posts.map(post => (
          <PostCard key={post.fields.slug} post={post} />
        ))}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query TagPageQuery($tag: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
`

export default TagPage
