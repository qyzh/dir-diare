import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../mdx-components'
import Breadcrumbs from './breadcrumbs'
import UkCallout from './ui/ukcallout'
import Comments from './comments'
import Footer from './footer'
import CopyUrlButton from './copyurl'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import ArticleProgress from './article-progress'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const components = useMDXComponents()
export default function PostRenderer({
  post,
  type,
}: {
  post: any
  type: 'art' | 'writing'
}) {
  const formattedDate = post.publishedAt
    ? formatDate(post.publishedAt)
    : 'Unknown date'
  if (type === 'art') {
    return (
      <section>
        <Breadcrumbs />
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
        <h1 className="post-title tracking-tighter dark:tracking-wider max-w-[650px]">
          {post.title}
        </h1>
        <div className="flex justify-between items-center mt-2 text-sm max-w-[650px] text-neutral-600 dark:text-neutral-300">
          <div className="metadataart items-center">
            <span>
              Created at {' '}
              <time>{formatDate(post.publishedAt)}</time>
            </span>
          </div>
        </div>
        {post.image && (
          <Image
            src={post.image}
            alt="Post Image"
            width={800}
            height={600}
            className="w-full h-auto my-4"
          />
        )}
        <article className="prose prose-quoteless prose-neutral dark:prose-invert dark:prose-p:text-white dark:prose-li:text-white dark:prose-strong:text-white dark:prose-em:text-white">
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
          <UkCallout>
            {post.updatedAt &&
              post.updatedAt !== post.publishedAt && (
                <time>
                  Updated: {formatDate(post.updatedAt)}
                </time>
              )}
          </UkCallout>
        </article>
        <Footer />
      </section>
    )
  }

  const tags: string[] = post.tags ?? []

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

          {/* Footer */}
          <footer className="journal-article-footer">
            <div className="journal-article-footer-inner">
              {tags.length > 0 && (
                <div className="journal-article-tags">
                  {tags.map((tag) => (
                    <span key={tag} className="journal-article-tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="journal-article-footer-row">
                <Link href="/w" className="journal-article-back">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" /></svg>
                  Back to Journal
                </Link>
                <CopyUrlButton url={`https://dir.kyxis.my.id/w/${post.slug}`} />
              </div>
              <p className="journal-article-colophon" style={{ marginTop: '1.5rem' }}>
                Written by qyzh · {formattedDate}
              </p>
            </div>
          </footer>

        </div>
      </main>
    </>
  )
}
