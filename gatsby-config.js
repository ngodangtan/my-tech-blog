module.exports = {
  pathPrefix: `/my-tech-blog`,
  siteMetadata: {
    title: `My Blog`,
    author: {
      name: `Felix Ngo`,
      summary: `Mobile developer. Minimalist.`,
    },
    description: `A personal technical blog about mobile, AI, and clean code.`,
    siteUrl: `https://felixngo.github.io`,
    social: {
      twitter: `felixngo`,
      github: `felixngo`,
    },
  },
  plugins: [
    // Read markdown files
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `blog`, path: `${__dirname}/content/blog` },
    },
    // Render markdown → HTML
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 800, quality: 90 },
          },
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    // RSS feed
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `{ site { siteMetadata { title description siteUrl } } }`,
        feeds: [
          {
            output: `/rss.xml`,
            title: `My Blog RSS Feed`,
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map(node => ({
                ...node.frontmatter,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `{
              allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
                nodes {
                  html
                  fields { slug }
                  frontmatter { date title description }
                }
              }
            }`,
          },
        ],
      },
    },
    // Sitemap for SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: { output: `/sitemap.xml` },
    },
  ],
}
