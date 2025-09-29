import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArtPostBySlug, getAllArtPosts } from 'app/lib/artpost'
import PostRenderer from 'app/components/post-renderer'

export async function generateStaticParams() {
    const posts = await getAllArtPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getArtPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested post could not be found',
        }
    }

    const { title, publishedAt: publishedTime, summary: description } = post
    const ogImage = `https://kynoci.com/og?title=${title}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `https://kynoci.com/l/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}
export default async function ArtPost({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getArtPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return <PostRenderer post={post} type="art" />
}

