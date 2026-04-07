import React from "react"
import { Link } from "gatsby"

const TagList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Link
          key={tag}
          to={`/tags/${tag.toLowerCase().replace(/\s+/g, `-`)}/`}
          className="tag"
          style={{ textDecoration: "none" }}
        >
          #{tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
