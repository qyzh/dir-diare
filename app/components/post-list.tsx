import { getBlogPosts  } from '../blog/utils'
import Link from 'next/link'
import { Suspense } from 'react';
const LFBR = () => {
    return (
      <>
        <div className='flex'>
        <div className='flex flex-col w-full place-self-center ml-2'>
            <div className='text-zinc-400 font-semibold hover:text-white transition-all '> Loading...</div>
            <div className=' text-sm text-zinc-500 truncate overflow-hidden'>
                Loading...
            </div>
         </div>
        </div>
      </>
    );
  };
const FeaturedBlogPostsList = async () => {
    const featuredPosts = await getBlogPosts()
    return (
      <>
        {featuredPosts
                        .sort((a, b) => {
                          if (
                              new Date(a.metadata.publishedAt) >
                              new Date(b.metadata.publishedAt)
                          ) {
                              return -1
                          }
                          return 1
                      })
        .slice(0, 4)
        .map((post) => (
            <Link
                key={post.slug}
                className="group"
                href={`/blog/${post.slug}`}
                          >
        <div className='flex mb-4'>
        <div className='flex flex-col w-full place-self-center ml-2'>
            <div className='text-zinc-400 font-semibold hover:text-white transition-all '>
                {post.metadata.title}
            </div>
            <div className=' text-sm text-zinc-500 truncate overflow-hidden'>
                {post.metadata.summary}
            </div>
         </div>
        </div>
          </Link>
        ))}
      </>
    );
  };

export default function FBRecentPost () {
    return (
      <>
     <Suspense fallback={<LFBR />}>
        <FeaturedBlogPostsList />
      </Suspense>
      </>
    );
  };