import { SITE_URL } from '@/lib/constants'
import { getAllPublishedPosts } from '@/lib/posts'
import { getAllArtPosts } from '@/lib/artpost'
import { getAllTags } from '@/lib/tags'

export default async function sitemap() {
    const [posts, artPosts, tags] = await Promise.all([
        getAllPublishedPosts(),
        getAllArtPosts(),
        getAllTags(),
    ])

    const now = new Date().toISOString()

    const staticRoutes = ['', '/about', '/w', '/n', '/l'].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: now,
    }))

    const writingRoutes = posts.map((post) => ({
        url: `${SITE_URL}/w/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || now,
    }))

    const artRoutes = artPosts.map((post) => ({
        url: `${SITE_URL}/l/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || now,
    }))

    const tagRoutes = tags.map((tag) => ({
        url: `${SITE_URL}/w/tags/${tag.slug}`,
        lastModified: now,
    }))

    return [...staticRoutes, ...writingRoutes, ...artRoutes, ...tagRoutes]
}
