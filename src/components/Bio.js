import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <div className="bio">
      <div
        className="bio-avatar"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "700",
          fontFamily: "sans-serif",
        }}
      >
        {author.name.charAt(0)}
      </div>
      <div className="bio-content">
        <div className="bio-name">{author.name}</div>
        <p className="bio-summary">{author.summary}</p>
        <div className="bio-links">
          {social.github && (
            <a
              href={`https://github.com/${social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {social.twitter && (
            <a
              href={`https://twitter.com/${social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter/X
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bio
