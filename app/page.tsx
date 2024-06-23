
import React from 'react'
import { Suspense } from 'react';
import Uq from './components/uq'
import { getBlogPosts  } from './blog/utils'
import { Navbar } from './components/nav'
import Link from 'next/link';
import ArtList from './work/ArtList'
import Image from 'next/image'
import { CaretRightIcon, CaretUpIcon } from '@radix-ui/react-icons';
import  Strava  from './components/strava';

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
            <Uq />
      <Suspense fallback={<FBRecentPost />}>
    <div className='flex justify-between mb-4'>
      <div className='title font-semibold text-lg place-self-center '><h2>Recent Post:</h2></div>
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
      <div className='title font-semibold text-lg place-self-center '><h2>Recent Work:</h2></div>
      <div className=''><Link href='/work'>
        <button className="flex text-sm items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200">
        <CaretRightIcon />
        </button></Link>
      </div>
    </div>
      <RecentWork/>
      </Suspense>
      <div className='title font-semibold text-lg place-self-center '><h2>Recent Activity:</h2></div>
      <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <StravaComponent />
      </div>
            <Navbar />
        </section>
        
    )
}
