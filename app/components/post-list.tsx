import { getBlogPosts } from '../blog/utils'
import Link from 'next/link'
import { Suspense } from 'react'

interface Post {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
  }
}

const LoadingFallback = () => (
  <div className='flex'>
    <div className='flex flex-col w-full place-self-center ml-2'>
      <div className='text-zinc-400 font-semibold hover:text-white transition-all'>Loading...</div>
      <div className='text-sm text-zinc-500 truncate overflow-hidden'>Loading...</div>
    </div>
  </div>
)

const sortPostsByDate = (posts: Post[]) => {
  return posts.sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )
}

const FeaturedBlogPostsList = async () => {
  const featuredPosts = await getBlogPosts()
  const sortedPosts = sortPostsByDate(featuredPosts).slice(0, 4)

  return (
    <>
      {sortedPosts.map((post) => (
        <Link
          key={post.slug}
          className="group"
          href={`/blog/${post.slug}`}
        >
          <div className='flex mb-4'>
            <div className='flex flex-col w-full place-self-center'>
              <div className='text-zinc-400 font-semibold group-hover:text-white transition-all'>
                {post.metadata.title}
              </div>
              <div className='text-sm text-zinc-500 group-hover:text-zinc-300 truncate overflow-hidden'>
                {post.metadata.summary}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default function FBRecentPost() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FeaturedBlogPostsList />
    </Suspense>
  )
}
