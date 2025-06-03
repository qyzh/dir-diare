import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
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
    const formattedDate = formatDate(post.metadata.publishedAt, true, 'short-month-date')
    
    return (
        <div className="mb-2">
            <div key={post.slug} className="opacity-80 group-hover:opacity-40 hover:!opacity-100 transition-all duration-200  group-hover:blur-[1px] hover:!blur-none">
                <Link
                    key={post.slug}
                    className="group flex w-full transition-colors duration-200"
                    href={`/blog/${post.slug}`}
                    aria-label={`Read blog post: ${post.metadata.title}`}
                >
                    <div className="rotate-180 flex items-center justify-center [writing-mode:_vertical-lr]">
                        <time className="text-xs font-bold text-neutral-400 uppercase">
                            <span>{formattedDate}</span>
                        </time>
                    </div>
                    <div className="flex-1 pl-2 min-w-0">
                        <div className="items-center content-center transition-all duration-200">
                            <div className="font-bold">{post.metadata.title}</div>
                            <div className="text-zinc-200 font-mono line-clamp-1 text-sm ">
                                {post.metadata.summary}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
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
        <div role="list" aria-label="Blog posts" className="group">
            {sortedBlogs.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    )
}
