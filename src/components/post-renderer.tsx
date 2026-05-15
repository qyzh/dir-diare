import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../mdx-components'
import { formatDate } from '@/lib/utils'
import type { RelatedPost } from '@/lib/posts'
import Image from 'next/image'
import ArticleProgress from './article-progress'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Footer from './footer'
import RelatedPosts from './related-posts'

const components = useMDXComponents()
export default function PostRenderer({
  post,
  type,
  relatedPosts,
}: {
  post: any
  type: 'art' | 'writing'
  relatedPosts?: RelatedPost[]
}) {
  const formattedDate = post.publishedAt
    ? formatDate(post.publishedAt)
    : 'Unknown date'

  const tags: string[] = Array.isArray(post.tags) ? post.tags : []

  if (type === 'art') {
    return (
      <>
        <ArticleProgress />
        <main className="article-wrap article-wrap--writing">
          <div className="journal-article">
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: post.title,
                  datePublished: post.publishedAt,
                  dateModified: post.updatedAt || post.publishedAt,
                  description: post.summary,
                  image: `https://dir.kyxis.my.id/og?title=${post.title}`,
                  url: `https://dir.kyxis.my.id/l/${post.slug}`,
                  author: {
                    '@type': 'Person',
                    name: 'uki',
                  },
                }),
              }}
            />

            {/* Header */}
            <header className="journal-article-header">
              <nav className="journal-article-nav">
                <Link href="/l" className="journal-article-back">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" /></svg>
                  Art
                </Link>
              </nav>

              <div className="journal-article-meta">
                <time>{formattedDate}</time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <>
                    <span className="journal-article-meta-sep" aria-hidden="true" />
                    <span>Revised {formatDate(post.updatedAt)}</span>
                  </>
                )}
              </div>

              <h1 className="journal-article-title">
                {post.title}
              </h1>

              {post.summary && (
                <p className="journal-article-summary">{post.summary}</p>
              )}

              <div className="journal-article-ornament" aria-hidden="true">
                <span className="journal-article-ornament-glyph">✦ ✦ ✦</span>
              </div>
            </header>

            {/* Body */}
            <div className="journal-article-body-wrap">
              <article className="journal-article-body">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-auto mb-8 rounded-sm"
                  />
                )}
                <MDXRemote
                  source={post.content}
                  components={components}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm, remarkFrontmatter],
                      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                    },
                  }}
                />
              </article>
            </div>

            {/* Footer */}
            <Footer
              variant="writing"
              backHref="/l"
              backLabel="Back to Art"
              tags={tags}
              publishedAt={formattedDate}
              copyUrl={`https://dir.kyxis.my.id/l/${post.slug}`}
            />

          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <ArticleProgress />
      <main className="article-wrap article-wrap--writing">
        <div className="journal-article">

          {/* Header */}
          <header className="journal-article-header">
            <nav className="journal-article-nav">
              <Link href="/w" className="journal-article-back">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" /></svg>
                Journal
              </Link>
            </nav>

            <div className="journal-article-meta">
              <time>{formattedDate}</time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span className="journal-article-meta-sep" aria-hidden="true" />
                  <span>Revised {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>

            <h1 className="journal-article-title">
              {post.title || post.slug.replace(/-/g, ' ')}
            </h1>

            {post.summary && (
              <p className="journal-article-summary">{post.summary}</p>
            )}

            <div className="journal-article-ornament" aria-hidden="true">
              <span className="journal-article-ornament-glyph">✦ ✦ ✦</span>
            </div>
          </header>

          {/* Body */}
          <div className="journal-article-body-wrap">
            <article className="journal-article-body">
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkFrontmatter],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                  },
                }}
              />
            </article>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}

          {/* Footer */}
          <Footer
            variant="writing"
            tags={tags}
            copyUrl={`https://dir.kyxis.my.id/w/${post.slug}`}
          />

        </div>
      </main>
    </>
  )
}
