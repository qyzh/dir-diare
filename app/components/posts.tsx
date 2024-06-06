
import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import Image from 'next/image'
import { CalendarIcon } from '@radix-ui/react-icons'


export function BlogPosts() {
    let allBlogs = getBlogPosts()

    return (
        <div>
            {allBlogs
                .sort((a, b) => {
                    if (
                        new Date(a.metadata.publishedAt) >
                        new Date(b.metadata.publishedAt)
                    ) {
                        return -1
                    }
                    return 1
                })
                .map((post) => (
                    <Link
                        key={post.slug}
                        className="group"
                        href={`/blog/${post.slug}`}
                    >
            <div className='flex flex-row  gap-2 bg-black/20 border-zinc-700 p-2 border rounded shadow-md mb-4 group-hover:bg-black/30 group-hover:border-zinc-600'>

<div className=' relative bg-red-500 h-24 w-32 rounded-md overflow-clip place-self-center'>
<Image
                  src={post.metadata.image || '/images/bg-noise.png' }
                  className="dark:bg-zinc-800 bg-zinc-100 layout-fill grayscale group-hover:grayscale-0 rounded object-cover group-hover:scale-125 duration-300"
                  alt={post.metadata.title}
layout='fill'
                />
</div>

<div className=' p-4'>
<p className='title text-md md:text-xl font-bold'>{post.metadata.title}</p>

<p className='text-sm text-zinc-500  '>
<CalendarIcon className=' inline-block mr-1 -mt-1'/>
<span>{formatDate(post.metadata.publishedAt, false)} </span>

<span>{post.metadata.tag}</span>
</p>
<p className='text-zinc-400 text-sm md:text-md'>
{post.metadata.summary}
</p>
</div>
</div>

                    </Link>
                ))}
        </div>
    )
}
