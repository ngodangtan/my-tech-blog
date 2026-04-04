import React from "react"
import { Link } from "gatsby"
import TagList from "./TagList"

const PostCard = ({ post }) => {
  const { fields, frontmatter, excerpt, timeToRead } = post
  const { slug } = fields
  const { title, date, description, tags } = frontmatter

  return (
    <article className="post-card">
      <h2 className="post-card-title">
        <Link to={slug}>{title}</Link>
      </h2>
      <div className="post-card-meta">
        <time dateTime={date}>{date}</time>
        {timeToRead && <span>{timeToRead} min read</span>}
      </div>
      <p className="post-card-description">{description || excerpt}</p>
      <TagList tags={tags} />
    </article>
  )
}

export default PostCard
