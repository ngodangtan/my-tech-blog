import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About"
        description="About Tan Ngo — mobile developer, minimalist, and writer."
      />
      <div className="about-page">
        <h1>About</h1>

        <div
          className="about-avatar"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "3rem",
            fontWeight: "700",
            fontFamily: "sans-serif",
          }}
        >
          F
        </div>

        <p>
          Hi, I'm <strong>Tan Ngo</strong> — a mobile developer with a passion
          for clean code, minimal design, and continuous learning.
        </p>

        <p>
          I build iOS and Android apps professionally, and in my spare time I
          explore on-device machine learning, Swift concurrency, and the craft of
          writing readable code.
        </p>

        <p>
          This blog is where I share what I learn — tutorials, opinions, and
          notes to my future self.
        </p>

        <h2>Skills</h2>
        <ul className="skills-list">
          <li>Swift / iOS</li>
          <li>Kotlin / Android</li>
          <li>React / Gatsby</li>
          <li>Core ML / on-device AI</li>
          <li>SwiftUI</li>
          <li>Jetpack Compose</li>
          <li>Git / CI/CD</li>
          <li>TypeScript</li>
        </ul>

        <h2>Contact</h2>
        <p>
          The best way to reach me is via{" "}
          <a
            href="https://github.com/felixngo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          or{" "}
          <a
            href="https://twitter.com/felixngo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter/X
          </a>
          .
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage
