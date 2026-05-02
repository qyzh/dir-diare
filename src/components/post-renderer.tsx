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
          <MDXRemote source={post.content} components={components} />
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

  return (
    <>
      <ArticleProgress />
      <main className="article-wrap article-wrap--writing">
        <header className="article-header">
          <Link href="/n" className="page-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Journal
          </Link>
          <div className="article-meta">
            <time>{formattedDate}</time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>Updated: {formatDate(post.updatedAt)}</span>
            )}
            {post.tags && post.tags.map((tag: string) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h1 className="article-title">
            {post.title || post.slug.replace(/-/g, ' ')}
          </h1>
          {post.summary && (
            <p className="article-summary">{post.summary}</p>
          )}
        </header>

        <article className="article-body article-body--writing drop-cap">
          <MDXRemote source={post.content} components={components} />
        </article>

        <div className="article-actions">
          <CopyUrlButton url={`https://dir-diare.vercel.app/w/${post.slug}`} />
        </div>

        <Comments />
      </main>

      <footer className="dir-footer">
        <span>dir-diare</span>
      </footer>
    </>
  )
}
