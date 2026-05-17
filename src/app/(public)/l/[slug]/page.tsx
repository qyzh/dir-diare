import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArtPostBySlug, getAllArtPosts } from '@/lib/artpost'
import PostRenderer from '@/components/post-renderer'
import { SITE_URL } from '@/lib/constants'

export async function generateStaticParams() {
    const posts = await getAllArtPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export const dynamicParams = true
export const revalidate = 3600

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
    const ogImage = `${SITE_URL}/og?title=${title}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${SITE_URL}/l/${post.slug}`,
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
