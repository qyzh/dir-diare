import { readdir } from 'fs/promises'
import fs from 'fs'
import path from 'path'

import { Navbar } from 'app/components/nav'
import Breadcrumbs from 'app/components/breadcrumbs'
import Comments from 'app/components/comments'
import { formatDate } from '../utils'
import Footer from 'app/components/footer'
import { Badge } from 'app/components/ukbadge'

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'art', `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // Parse frontmatter
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    const match = frontmatterRegex.exec(fileContent)
    const frontMatterBlock = match?.[1] || ''
    const metadata: Record<string, string> = {}
    
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const getCatColor = (category: string): string => {
      const catLower = category.toLowerCase().trim();
      switch (catLower) {
        case 'personal projects':
          return 'bg-rose-950/80 text-rose-500 border-rose-700 hover:border-rose-600 hover:bg-rose-900 hover:text-rose-400';
        case 'design graphics':
          return 'bg-indigo-950/80 text-indigo-500 border-indigo-700 hover:border-indigo-600 hover:bg-indigo-900 hover:text-indigo-400';
        case 'code projects':
          return 'bg-emerald-950/80 text-emerald-500 border-emerald-700 hover:border-emerald-600 hover:bg-emerald-900 hover:text-emerald-400';
        default:
          return '';
      }
    }
    
    frontMatterBlock.split('\n').forEach((line) => {
      const [key, ...valueArr] = line.split(': ')
      if (key && valueArr.length) {
        const value = valueArr.join(': ').trim()
        metadata[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1')
      }
    })

    const { default: Lab } = await import(`../../../art/${slug}.mdx`)
   
    return (
      <section>
      <Breadcrumbs/>
      <Navbar />
      <Badge
                    text={metadata.category || 'untag'}
                    className={getCatColor(metadata.category || 'untag')}
                />
      <h1 className="text-3xl font-bold ">{metadata.title || slug.replace(/-/g, ' ')}</h1>
      <time className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-4">
        {metadata.publishedAt ? formatDate(metadata.publishedAt) : 'Unknown date'}
      </time>
      <p className="text-black/50 dark:text-neutral-500 font-mono my-4">
        {metadata.summary || ''}
      </p>      
      <div className="prose dark:prose-invert max-w-none">
        {metadata.image && (
          <img src={metadata.image} alt={metadata.title} className="rounded-lg shadow-md" />
        )}
        <Lab />
      </div>
      <div className="mt-4 border-y border-neutral-300 dark:border-neutral-700">
          {metadata.tags && (
            <p className='text-sm py-2 text-black dark:text-white'>Tags {''}: <span className='font-mono text-neutral-300 dark:text-neutral-600'>{metadata.tags.split(',').map(tag => capitalizeFirstLetter(tag.trim())).join(', ')}</span></p>
          )}
      </div>
      <Comments />
      <Footer/>
      </section>
    )
  }
   
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'art')
  const files = await readdir(contentDir)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))
  
  return mdxFiles.map(file => ({
    slug: file.replace('.mdx', '')
  }))
}
   
export const dynamicParams = false
