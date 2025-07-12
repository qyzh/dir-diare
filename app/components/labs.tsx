import Link from 'next/link'
import Image from 'next/image'
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

const getCategoryColor = (category: string): string => {
  const tagLower = category.toLowerCase()
  switch (tagLower) {
    case 'personal projects':
      return 'bg-rose-900 dark:bg-rose-900/50 dark:group-hover:bg-rose-800/50'
    case 'design graphics':
      return 'bg-indigo-900 dark:bg-indigo-900/50 group-hover:bg-indigo-800/50'
    case 'code projects':
      return 'bg-emerald-900 dark:bg-emerald-900/50 dark:group-hover:bg-emerald-800/50'
    default:
      return 'bg-neutral-800 dark:bg-neutral-800 dark:group-hover:bg-neutral-700'
  }
}

const LabCard = ({ post, isLatest }: LabCardProps) => {
  
  return (
    <div
    >
      <div className="mb-2 dark:hover:bg-white/5 border border-neutral-300 dark:border-neutral-800 bg-clip-border dark:text-gray-700 dark:hover:border-zinc-700 transition-colors duration-200">
        <Link href={`/l/${post.slug}`} className='group' aria-label={`Link to ${post.metadata.title}`}>
          <div className="overflow-hidden flex flex-row">
            <div className="rotate-180 flex items-center justify-center [writing-mode:_vertical-lr]">
              <time className="text-xs font-bold text-neutral-400 uppercase">
                <div className={`inline ${getCategoryColor(post.metadata.category || '')} px-3 py-1 text-xs font-mono text-white truncate`}>
                  {post.metadata.category}
                </div>
              </time>
            </div>
            
            <div className="flex-1 pl-4 min-w-0 flex items-center gap-4">
              {post.metadata.image && (
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    alt={post.metadata.title}
                    src={post.metadata.image}
                    className="absolute inset-0 w-full h-full object-cover bg-clip-border bg-black shadow-lg rounded-md"
                    width={180}
                    height={180}
                    priority={isLatest}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h2 className="font-bold uppercase tracking-tight text-black dark:text-white/80 dark:group-hover:text-white transition-colors duration-200">
                  {post.metadata.title}
                </h2>
                <div className="truncate font-mono pr-4 overflow-hidden mt-1 text-sm font-medium text-white/50">
                  {post.metadata.summary}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export function LabPosts() {
  const allLabs = getArtPosts()
  
  const sortedLabs = useMemo(() => 
    [...allLabs].sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    ), 
    [allLabs]
  )

  return (
    <div role="list" aria-label="Lab posts" className="group">
      {sortedLabs.map((post, index) => (
        <LabCard key={post.slug} post={post} isLatest={index === 0} />
      ))}
    </div>
  )
}
