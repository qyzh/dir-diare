import Link from 'next/link'
import { getAllArtPosts, ArtPost } from 'app/lib/artpost'
import UkCLI from 'app/components/ukcli'
interface PostCardProps {
    post: ArtPost
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
                </span>{' '}
                <Link
                    key={post.slug}
                    className="group text-lg webcontent"
                    href={`/l/${post.slug}`}
                    aria-label={`Read art post: ${post.title}`}
                >
                    {post.title}
                </Link>
            </div>
        </>
    )
}

export async function ArtPosts() {
    const allPosts = await getAllArtPosts()

    return (
        <div role="list" aria-label="Art posts" className="group">
            <UkCLI path=" " command="ls -l labs" />
            <div>
                {allPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
