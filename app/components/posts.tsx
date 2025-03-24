import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import Image from 'next/image'
import { Calendar } from 'lucide-react'


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
                        <div className='flex 
                            flex-row items-center 
                            gap-2 
                            backdrop-blur-sm 
                            backdrop-saturate-50 
                            bg-neutral-800/20 
                            border-zinc-800 
                            px-4 py-4 border 
                            shadow-md rounded-lg mb-4 
                            group-hover:bg-neutral-800/30 
                            group-hover:border-zinc-700'
                        >

                            <div className=' relative h-24 w-32 rounded-md overflow-clip place-self-center '>
                                <Image
                                    src={post.metadata.image || '/images/bg-noise.png' }
                                    className="dark:bg-zinc-800 bg-zinc-100  grayscale group-hover:grayscale-0 rounded object-cover group-hover:scale-125 duration-300"
                                    alt={post.metadata.title}
                                    fill={true}
                                />
                            </div>

                            <div className='w-1/2 ml-2'>
                                <p className='title text-md md:text-xl font-bold'>{post.metadata.title}</p>

                                <p className='text-sm text-zinc-500  '>
                                    <Calendar className=' inline-block mr-1 -mt-1'/>
                                    <span>{formatDate(post.metadata.publishedAt, true)} </span>

                                    <span>{post.metadata.tag}</span>
                                </p>
                                <p className='text-zinc-400 truncate overflow-hidden text-sm md:text-md'>
                                    {post.metadata.summary}
                                </p>
                            </div>
                        </div>

                    </Link>
                ))}
        </div>
    )
}
