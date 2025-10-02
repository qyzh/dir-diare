import Link from 'next/link'
import { getAllPublishedPosts, Post } from 'app/lib/posts'

interface PostCardProps {
    post: Post
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <>
            <div key={post.slug}>
                <span className="webtree">−rw−r−−r−−</span>{' '}
                <span className="webtree uppercase">{post.author}</span>
                <span className="webtree">
                    {new Date(post.publishedAt)
                        .toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                            timeZone: 'Asia/Jakarta',
                        })
                        .toUpperCase()}
                </span>
                <Link
                    key={post.slug}
                    className="group text-lg transition-colors duration-200"
                    href={`/w/${post.slug}`}
                    aria-label={`Read blog post: ${post.title}`}
                >
                    {post.title}
                </Link>
            </div>
        </>
    )
}

export async function BlogPosts() {
    const allBlogs = await getAllPublishedPosts()

    return (
        <div role="list" aria-label="Blog posts" className="group">
            <div>
                {allBlogs.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
