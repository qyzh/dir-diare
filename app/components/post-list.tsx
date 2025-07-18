import { getBlogPosts } from '../w/utils'
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
          href={`/w/${post.slug}`}
        >
          <div className='flex'>
            <div className='flex flex-col w-full place-self-center'>
              <h4 className='text-black/60 dark:text-white/80 font-bold tracking-wider group-hover:text-black dark:group-hover:text-white transition-all'>
                {post.metadata.title}
              </h4>
              <p className=' text-black/50 dark:text-neutral-500 text-sm group-hover:text-black/60 dark:group-hover:text-neutral-300 truncate overflow-hidden'>
                {post.metadata.summary}
              </p>
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
