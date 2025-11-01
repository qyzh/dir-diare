import Link from 'next/link'
import Image from 'next/image'
import { getAllArtPosts, ArtPost } from 'app/lib/artpost'
import UkCLI from 'app/components/ukcli'
interface PostCardProps {
    post: ArtPost
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="border-b border-b-neutral-700 last:border-0 py-4">
            <Link
                href={`/l/${post.slug}`}
                key={post.slug}
                className="group flex flex-col gap-2"
            >
                {post.image && (
                    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                    </div>
                )}
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

export async function ArtPosts() {
    const allPosts = await getAllArtPosts()

    return (
        <div role="list" aria-label="Art posts">
            <div>
                {allPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
