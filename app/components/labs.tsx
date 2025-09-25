import Link from 'next/link'
import { getartPosts } from 'app/lib/artpost'

interface ArtPost {
    _id: string
    slug: string
    title: string
    publishedAt: string
    summary: string
    tag: string
    image?: string
}

interface PostCardProps {
    post: ArtPost
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <>
            <div key={post.slug}>
                <span className="webtree">└──</span>
                <Link
                    key={post.slug}
                    className="group text-lg webcontent"
                    href={`/l/${post.slug}`}
                    aria-label={`Read art post: ${post.title}`}
                >
                    {post.title}
                </Link>
                <div className="text-sm webformat ml-8">
                    {'>'} {post.summary}
                </div>
            </div>
        </>
    )
}

export async function ArtPosts() {
    const allPosts = await getartPosts()

    return (
        <div role="list" aria-label="Art posts" className="group">
            <div>
                <span className="webtree">└──</span>
                <span className="webmain">Art/</span>
            </div>
            <div className="ml-6 ">
                {allPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
