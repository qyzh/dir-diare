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
    isLatest: boolean
}

const PostCard = ({ post, isLatest }: PostCardProps) => {
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
                            <div className="font-bold flex items-center gap-2">
                                {post.metadata.title}
                                {isLatest && (
                                    <span className="relative px-2 py-0.5 text-xs font-semibold bg-green-500 dark:bg-green-500/20 text-green-100 dark:text-green-400 rounded">
                                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        New
                                    </span>
                                )}
                            </div>
                            <div className="text-black/50 dark:text-neutral-600 font-mono line-clamp-1 text-sm ">
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
            {sortedBlogs.map((post, index) => (
                <PostCard key={post.slug} post={post} isLatest={index === 0} />
            ))}
        </div>
    )
}
