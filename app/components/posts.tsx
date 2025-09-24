import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/w/utils'
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
    const formattedDate = formatDate(
        post.metadata.publishedAt,
        true,
        'short-month-date'
    )

    return (
        <>
            <div key={post.slug}>
                <span className="webtree">└──</span>
                <Link
                    key={post.slug}
                    className="group text-lg transition-colors duration-200"
                    href={`/w/${post.slug}`}
                    aria-label={`Read blog post: ${post.metadata.title}`}
                >
                    {post.metadata.title}
                </Link>
            </div>
        </>
    )
}

export function BlogPosts() {
    const allBlogs = getBlogPosts()

    const sortedBlogs = useMemo(() => {
        return [...allBlogs].sort((a, b) => {
            return (
                new Date(b.metadata.publishedAt).getTime() -
                new Date(a.metadata.publishedAt).getTime()
            )
        })
    }, [allBlogs])

    return (
        <div role="list" aria-label="Blog posts" className="group">
            <div>
                <span className="webtree">└──</span>
                <span className="webmain">tulisan/</span>
            </div>
            <div className="ml-6 ">
                {sortedBlogs.map((post, index) => (
                    <PostCard
                        key={post.slug}
                        post={post}
                        isLatest={index === 0}
                    />
                ))}
            </div>
        </div>
    )
}
