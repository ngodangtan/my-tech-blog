import React from "react"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} Felix Ngo ·{" "}
          <a
            href="https://github.com/felixngo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          ·{" "}
          <a href="/rss.xml">RSS</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
