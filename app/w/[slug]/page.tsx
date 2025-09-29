import { getPostBySlug, getAllPosts } from 'app/lib/posts'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PostRenderer from 'app/components/post-renderer'

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

    return {
        title: post.title,
        description:
            post.summary || `Read ${post.title} by ${post.author || 'qyzh'}`,
        openGraph: {
            title: post.title,
            description:
                post.summary ||
                `Read ${post.title} by ${post.author || 'qyzh'}`,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author || 'qyzh'],
            tags: post.tags,
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

    return <PostRenderer post={post} type="writing" />
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

