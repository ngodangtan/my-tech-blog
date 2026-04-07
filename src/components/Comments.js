import React, { useEffect, useRef } from "react"

const Comments = () => {
  const ref = useRef()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", "ngodangtan/my-blog")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("label", "💬 comment")
    script.setAttribute("theme", "github-light")
    script.crossOrigin = "anonymous"
    script.async = true
    ref.current.appendChild(script)
  }, [])

  return <div ref={ref} style={{ marginTop: "3rem" }} />
}

export default Comments
