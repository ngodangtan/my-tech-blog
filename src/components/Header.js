import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="header"
      style={{ boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.08)" : "none" }}
    >
      <div className="header-inner">
        <Link to="/" className="header-logo">
          {siteTitle || "My Blog"}
        </Link>
        <nav>
          <ul className="header-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
