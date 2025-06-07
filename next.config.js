import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkFrontmatter from 'remark-frontmatter'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, {
        theme: 'github-dark',
        onVisitLine(node) {
          // Prevent lines from collapsing in `display: grid` mode
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }]
          }
        },
      }],
    ],
  },
})
 
// Combine MDX and Next.js config
export default withMDX(nextConfig)