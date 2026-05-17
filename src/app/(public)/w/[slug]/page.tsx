import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PostRenderer from '@/components/post-renderer'
import { SITE_URL } from '@/lib/constants'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested post could not be found',
        }
    }

    const description = post.summary || `Read ${post.title} by ${post.author || 'qyzh'}`
    const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(post.title)}`

    return {
        title: post.title,
        description,
        alternates: { canonical: `/w/${post.slug}` },
        openGraph: {
            title: post.title,
            description,
            type: 'article',
            publishedTime: post.publishedAt,
            url: `${SITE_URL}/w/${post.slug}`,
            authors: [post.author || 'qyzh'],
            tags: post.tags,
            images: [{ url: ogImage }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images: [ogImage],
        },
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(post.tags, post.slug)

    return <PostRenderer post={post} type="writing" relatedPosts={relatedPosts} />
}

export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts
        .map((post) => {
            if (!post.slug) {
                console.warn(`Post without slug found: ${post._id}`)
                return null
            }
            return { slug: post.slug }
        })
        .filter(Boolean)
}

export const dynamicParams = true

export const revalidate = 3600

