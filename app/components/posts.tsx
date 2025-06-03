import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import Image from 'next/image'
import { useMemo } from 'react'

interface BlogPost {
    slug: string
    metadata: {
        title: string
        publishedAt: string
        summary: string
        tag: string
        image?: string
    }
}

interface PostCardProps {
    post: BlogPost
}

const PostCard = ({ post }: PostCardProps) => {
    const formattedDate = formatDate(post.metadata.publishedAt, true)
    
    return (
        <Link
            key={post.slug}
            className="group flex "
            href={`/blog/${post.slug}`}
            aria-label={`Read blog post: ${post.metadata.title}`}
        >
            <div className='
                flex flex-1 flex-row
                backdrop-blur-sm
                backdrop-saturate-50
                bg-neutral-800/20
                border-zinc-800
                px-4 py-4 border
                shadow-md rounded mb-4
                group-hover:bg-neutral-800/30
                group-hover:border-zinc-700 truncate '
            >


                <div className='z-2 overflow-hidden'>
                    <div className='title font-bold'>{post.metadata.title}</div>

                    <div className='text-zinc-200 font-mono '>
                        {post.metadata.summary}
                    </div>
                </div>
                
            </div>
        </Link>
    )
}

export function BlogPosts() {
    const allBlogs = getBlogPosts()
    
    const sortedBlogs = useMemo(() => {
        return [...allBlogs].sort((a, b) => {
            return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
        })
    }, [allBlogs])

    return (
        <div role="list" aria-label="Blog posts">
            {sortedBlogs.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    )
}
