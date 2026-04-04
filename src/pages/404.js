import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404 — Page Not Found" description="This page does not exist." />
      <div className="not-found-page">
        <h1>404</h1>
        <p>Oops — this page doesn't exist.</p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
