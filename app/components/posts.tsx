import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
    let allBlogs = getBlogPosts()

    return (
        <div>
            {allBlogs
                .sort((a, b) => {
                    if (
                        new Date(a.metadata.publishedAt) >
                        new Date(b.metadata.publishedAt)
                    ) {
                        return -1
                    }
                    return 1
                })
                .map((post) => (
                    <Link
                        key={post.slug}
                        className="flex bg-white/[60%] border-zinc-800 border rounded shadow-md flex-col space-y-1 mb-4 hover:bg-white/[90%]"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="w-full flex flex-row">
                            <p className="text-neutral-400 p-2 font-mono dark:text-neutral-600 w-[100px] tabular-nums hover:text-neutral-600">
                                {formatDate(post.metadata.publishedAt, false)}
                            </p>
                            
                            <p className="transition-all active:opacity-0 bg-neutral-900 w-full pt-5 pl-2 font-bold font-mono -ml-6 flex align-middle text-neutral-900 hover:-ml-2 hover:bg-neutral-800 dark:text-neutral-100 tracking-tight">
                                {post.metadata.title}
                            </p>
                            
                        </div>
                    </Link>
                ))}
        </div>
    )
}
