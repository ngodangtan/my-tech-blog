const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          fields { slug }
          frontmatter { tags }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)

  // Create individual blog post pages
  posts.forEach((post, index) => {
    const prev = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: { id: post.id, prevId: prev?.id, nextId: next?.id },
    })
  })

  // Collect all unique tags
  const tagSet = new Set()
  posts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => tagSet.add(tag))
    }
  })

  // Create a page for each tag
  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${tag.toLowerCase().replace(/\s+/g, `-`)}/`,
      component: tagTemplate,
      context: { tag },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({ name: `slug`, node, value: slug })
  }
}
