import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Bio from "../components/Bio"
import Comments from "../components/Comments"
import TagList from "../components/TagList"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  const { previous, next } = data
  const { title, date, description, tags } = post.frontmatter
  const timeToRead = post.timeToRead

  return (
    <Layout>
      <SEO
        title={title}
        description={description || post.excerpt}
      />
      <article>
        <header className="blog-post-header">
          <h1 className="blog-post-title">{title}</h1>
          <div className="blog-post-meta">
            <time dateTime={date}>{date}</time>
            {timeToRead && <span>{timeToRead} min read</span>}
          </div>
          <TagList tags={tags} />
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer>
          <Bio />

          <nav className="blog-post-nav">
            {previous && (
              <Link to={previous.fields.slug} className="prev" rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
            {next && (
              <Link to={next.fields.slug} className="next" rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </nav>

          <Comments />
        </footer>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($id: String!, $prevId: String, $nextId: String) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $prevId }) {
      fields { slug }
      frontmatter { title }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      fields { slug }
      frontmatter { title }
    }
  }
`

export default BlogPost
