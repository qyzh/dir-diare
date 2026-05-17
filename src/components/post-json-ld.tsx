import { SITE_URL } from '@/lib/constants'

interface PostJsonLdProps {
    post: {
        title: string
        publishedAt: string
        updatedAt?: string
        summary?: string
        slug: string
    }
    type: 'art' | 'writing'
}

export default function PostJsonLd({ post, type }: PostJsonLdProps) {
    const path = type === 'art' ? 'l' : 'w'
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        description: post.summary,
        url: `${SITE_URL}/${path}/${post.slug}`,
        image: `${SITE_URL}/og?title=${encodeURIComponent(post.title)}`,
        author: {
            '@type': 'Person',
            name: 'qyzh',
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Person',
            name: 'qyzh',
            url: SITE_URL,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/${path}/${post.slug}`,
        },
        inLanguage: 'en',
    }

    return (
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
