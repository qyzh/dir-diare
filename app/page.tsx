
import React from 'react'
import { Suspense } from 'react';
import { getBlogPosts  } from './blog/utils'
import { Navbar } from './components/nav'
import Link from 'next/link';
import ArtList from './work/ArtList'
import Image from 'next/image'
import { CaretRightIcon} from '@radix-ui/react-icons';
import  Strava  from './components/strava';
import { LanyardProfile } from './components/discord';

const FBRecentWork = () => {
    return (
      <>
        <div className='flex bg-zinc-800 mb-4 rounded-md'>
        <div className='w-full min-h-[240px] overflow-hidden'>
        <div className='absolute bottom-4 left-8 items-center py-2 px-4 rounded bg-neutral-900 animate-pulse'>Loading...</div>
        <Image src={'/images/bg-noise.png'}  alt="Background" width={240} height={240} />
        </div>
        </div>
      </>
    );
  };
const StravaComponent = () => {
    return (
      <>
<Strava />
      </>
    );
}
const FBRecentPost = () => {
    return (
      <>
        <div className='flex bg-zinc-800 p-4 mb-4 rounded-md'>
        <div className=''>
            <div className='w-16 h-16 rounded-full bg-neutral-900 animate-pulse'></div>
        </div>
        <div className='flex flex-col w-full place-self-center ml-2'>
            <div className=' bg-neutral-900 text-neutral-900 rounded animate-pulse'>Loading...</div>
            <div className=' text-sm text-zinc-500'>Loading...</div>
         </div>
        </div>
      </>
    );
  };
  const RecentWork = () => {
    return (
      <>
            {ArtList.slice(0,1).map((d) => (
              <Link href={d.href || '/work'} className='group'
                key={d.title}
              >
        <div className="flex bg-zinc-800 opacity-80 group-hover:opacity-100 mb-4 rounded-md">
        <div className='w-full h-[240px] min-h-[240px] relative rounded-md overflow-clip place-self-center  overflow-hidden'>
        <div className='absolute z-10 font-semibold block bottom-4 left-8 items-center py-2 px-4 rounded bg-black/70'>{d.title}</div>
        <Image src={d.thumbnail || '/images/bg-noise.png'}  
            alt="Background" className='grayscale group-hover:grayscale-0 rounded object-cover object-center group-hover:scale-125 duration-300' fill={true} />
        </div>
        </div>
        </Link>
            ))}
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
        .slice(0, 3)
        .map((post) => (
            <Link
                key={post.slug}
                className="group"
                href={`/blog/${post.slug}`}
                          >
        <div className='flex p-4 mb-4  bg-white/5 border border-transparent rounded-md duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200'>
        <div className='relative justify-items-center'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
                <Image src={post.metadata.image || '/images/bg-noise.png'}  
                alt="Background" className='w-full h-full rounded-full object-cover overflow-hidden'  fill={true}/>
            </div>
        </div>
        <div className='flex flex-col w-full place-self-center ml-2'>
            <div className='font-semibold'>{post.metadata.title}</div>
            <div className=' text-sm text-zinc-500'>{post.metadata.summary}</div>
         </div>
        </div>
          </Link>
        ))}
      </>
    );
  };

export default function Page() {
    return (
        <section>
                <LanyardProfile />
      <Suspense fallback={<FBRecentPost />}>
    <div className='flex justify-between mb-4'>
      <div className='title text-neutral-300 font-semibold text-lg place-self-center '>
        <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="inline-block size-5 mr-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
            </svg>
            <h2 className='inline '>Recent Post:</h2></div>
      <div className=''><Link href='/blog'>
        <button className="flex text-sm items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200">
        <CaretRightIcon />
        </button></Link>
      </div>
    </div>
        <FeaturedBlogPostsList />
      </Suspense>
      <Suspense  fallback={<FBRecentWork />}>
      <div className='flex justify-between mb-4'>
        
      <div className='title text-neutral-300  font-semibold text-lg place-self-center '>
      <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor "
                className="size-5 inline-block mr-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
            </svg>
        <h2 className='inline '>Recent Work:</h2></div>
      <div className=''><Link href='/work'>
        <button className="flex text-sm items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200">
        <CaretRightIcon />
        </button></Link>
      </div>
    </div>
      <RecentWork/>
      </Suspense>
      <div className='title text-neutral-300  font-semibold text-lg place-self-center mb-4 '>
      <svg xmlns="http://www.w3.org/2000/svg" 
      fill="none"
       viewBox="0 0 24 24" 
       strokeWidth={1.5} 
       stroke="currentColor" 
       className="size-5 inline mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        <h2 className='inline'>Recent Activity:</h2></div>
      <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <StravaComponent />
      </div>
            <Navbar />
        </section>
        
    )
}
