import { readdir } from 'fs/promises'
import fs from 'fs'
import path from 'path'
import Breadcrumbs from 'app/components/breadcrumbs'
import Comments from 'app/components/comments'
import { formatDate } from '../utils'
import Footer from 'app/components/footer'
import Link from 'next/link'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Parse frontmatter
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    const match = frontmatterRegex.exec(fileContent)
    const frontMatterBlock = match?.[1] || ''
    const metadata: Record<string, string> = {}

    frontMatterBlock.split('\n').forEach((line) => {
        const [key, ...valueArr] = line.split(': ')
        if (key && valueArr.length) {
            const value = valueArr.join(': ').trim()
            metadata[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1')
        }
    })

    const { default: Post } = await import(`../../../content/${slug}.mdx`)

    return (
        <section>
            <Breadcrumbs />
            <h1 className="text-xl font-bold ">
                {metadata.title || slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center space-x-2 my-2">
                <time className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                    {metadata.publishedAt
                        ? formatDate(metadata.publishedAt)
                        : 'Unknown date'}
                </time>
            </div>
            <p className="text-black/50 dark:text-neutral-500 font-mono my-4">
                {metadata.summary || ''}
            </p>
            <div className="max-w-none">
                <Post />
            </div>
            <Comments />
            <Footer />
        </section>
    )
}

export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'content')
    const files = await readdir(contentDir)
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

    return mdxFiles.map((file) => ({
        slug: file.replace('.mdx', ''),
    }))
}

export const dynamicParams = false

