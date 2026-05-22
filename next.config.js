import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  allowedDevOrigins: ['172.21.98.95'],
  // Allow .mdx extensions for files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      }
    ],
  },
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // In Next.js 16 with Turbopack, plugins need to be specified as strings
  // and options must be serializable (no functions)
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter'],
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', { behavior: 'wrap' }],
      ['rehype-pretty-code', {
        theme: 'github-dark',
      }],
    ],
  },
})
 
// Combine MDX and Next.js config
export default withMDX(nextConfig)
