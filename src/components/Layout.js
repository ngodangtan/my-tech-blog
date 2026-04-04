import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Footer from "./Footer"
import "../styles/global.css"
import "../styles/typography.css"
import "prismjs/themes/prism-tomorrow.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
