import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { RelatedPost } from '@/lib/posts'

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="journal-related">
      <h2 className="journal-related-heading">Related Posts</h2>
      <div className="journal-related-grid">
        {posts.map((post) => (
          <Link key={post.slug} href={`/w/${post.slug}`} className="journal-card">
            <p className="journal-card-date">
              {formatDate(post.publishedAt, false, 'short')}
            </p>
            <h3 className="journal-card-title">{post.title}</h3>
            {post.summary && (
              <p className="journal-card-excerpt">{post.summary}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
