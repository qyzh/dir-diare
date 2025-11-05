import Link from 'next/link'
import { getAllPublishedPosts, Post } from 'app/lib/posts'

interface PostCardProps {
    post: Post
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="border-b border-b-neutral-300 dark:border-b-neutral-700 last:border-0 py-4">
            <Link
                href={`/w/${post.slug}`}
                key={post.slug}
                className="group flex flex-col gap-2"
            >
                <h2 className="post-title transition-colors duration-200">
                    {post.title}
                </h2>
                <p className="post-summary">{post.summary}</p>
                <time className="post-date">
                    {new Date(post.publishedAt)
                        .toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                            timeZone: 'Asia/Jakarta',
                        })
                        .toUpperCase()}
                </time>
            </Link>
        </div>
    )
}

export async function BlogPosts() {
    const allBlogs = await getAllPublishedPosts()

    return (
        <div role="list" aria-label="Blog posts">
            <div>
                {allBlogs.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
