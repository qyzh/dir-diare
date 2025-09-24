import Link from 'next/link'
import { formatDate, getArtPosts } from 'app/l/utils'
import { useMemo } from 'react'

interface LabPost {
    slug: string
    metadata: {
        title: string
        publishedAt: string
        summary: string
        image?: string
        category?: string
        languages?: string
        tags?: string
    }
}

interface LabCardProps {
    post: LabPost
    isLatest: boolean
}

const LabCard = ({ post, isLatest }: LabCardProps) => {
    return (
        <div>
            <div className="ml-6">
                <span className="webtree">└──</span>
                <Link
                    href={`/l/${post.slug}`}
                    className="webcontent group font-medium"
                    aria-label={`Link to ${post.metadata.title}`}
                >
                    {post.metadata.title}
                </Link>
                <div className=" ml-8 group-hover:block">
                    <span className="text-xs webformat">
                        {'>'} {post.metadata.summary}
                    </span>
                </div>
            </div>
        </div>
    )
}

export function LabPosts() {
    const allLabs = getArtPosts()

    const sortedLabs = useMemo(
        () =>
            [...allLabs].sort(
                (a, b) =>
                    new Date(b.metadata.publishedAt).getTime() -
                    new Date(a.metadata.publishedAt).getTime()
            ),
        [allLabs]
    )

    return (
        <div role="list" aria-label="Lab posts" className="group">
            <div>
                <span className="webtree">└──</span>
                <span className="webmain">lab/</span>
            </div>
            {sortedLabs.map((post, index) => (
                <LabCard key={post.slug} post={post} isLatest={index === 0} />
            ))}
        </div>
    )
}
