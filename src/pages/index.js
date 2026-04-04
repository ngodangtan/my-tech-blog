import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Bio from "../components/Bio"
import PostCard from "../components/PostCard"

const POSTS_PER_PAGE = 10

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <Layout>
      <SEO />
      <Bio />
      <section>
        {visiblePosts.length === 0 ? (
          <p>No posts yet. Stay tuned!</p>
        ) : (
          visiblePosts.map(post => (
            <PostCard key={post.fields.slug} post={post} />
          ))
        )}
      </section>
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          {page > 1 && (
            <button onClick={() => setPage(p => p - 1)} style={{ cursor: "pointer" }}>
              ← Prev
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
              style={{ cursor: "pointer" }}
            >
              {i + 1}
            </button>
          ))}
          {page < totalPages && (
            <button onClick={() => setPage(p => p + 1)} style={{ cursor: "pointer" }}>
              Next →
            </button>
          )}
        </nav>
      )}
    </Layout>
  )
}

export const query = graphql`
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
`

export default IndexPage
