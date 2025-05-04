import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getArtPosts } from 'app/work/utils'
import { baseUrl } from 'app/sitemap'
import { Navbar } from 'app/components/nav'
import  Breadcrumbs  from 'app/components/breadcrumbs'
import Saweria from 'app/components/saweria'
import { AnimatedAbove, AnimatedBelow, AnimatedLeft, AnimatedRight, AnimatedZoom } from 'app/components/animated-section'


export async function generateStaticParams() {
    let works = getArtPosts()

    return works.map((work) => ({
        slug: work.slug,
    }))
}

export function generateMetadata({ params }) {
    let work = getArtPosts().find((work) => work.slug === params.slug)
    if (!work) {
        return
    }

    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = work.metadata
    let ogImage = image
        ? image
        : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/work/${work.slug}`,
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

export default function Blog({ params }) {
    let work = getArtPosts().find((work) => work.slug === params.slug)

    if (!work) {
        notFound()
    }
    const getTagBackgroundColor = (tag) => {
        switch(tag.toLowerCase()) {
            case 'code':
                return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
            case 'design':
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
            case 'art':
                return 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200';
            case 'project':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            default:
                return 'bg-neutral-100 dark:bg-neutral-800';
        }
    };
    const getlangBackgroundColor = (language) => {
        switch(language.toLowerCase()) {
            case 'javascript':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 hover:dark:bg-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600 hover:border-2 transition-all duration-200';
             case 'typescript':
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 hover:dark:bg-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:border-2 transition-all duration-200';
                case 'css':
                    return 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 hover:dark:bg-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 hover:border-2 transition-all duration-200';
            default:
                return 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:border-2 transition-all duration-200';
        }
    };
    return (
        <section>
            {work && (
            <>
            <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
        __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: work.metadata.title ,
            datePublished: work.metadata.publishedAt ,
            dateModified: work.metadata.publishedAt ,
            description: work.metadata.summary ,
            image: work.metadata.image
                ? `${baseUrl}${work.metadata.image}`
                : `/og?title=${encodeURIComponent(work.metadata.title)}`,
            url: `${baseUrl}/work/${work.slug}`,
            author: {
                '@type': 'Person',
                name: 'UQ',
            },
        }),
    }}
/>
            <AnimatedAbove delay={0.5}>
                <Breadcrumbs post={work}/>
            </AnimatedAbove>
            <AnimatedAbove delay={0.3}>
            {work.metadata.tag && (
    <span className={`text-sm px-2 py-1 rounded ${getTagBackgroundColor(work.metadata.tag)}`}>
        {work.metadata.tag}
    </span>
)}
            </AnimatedAbove>
            <AnimatedAbove delay={0.1}>
                    <h1 className="title font-mono font-bold text-3xl tracking-tighter max-w-[650px]">
                        {work.metadata.title}
                    </h1>
            </AnimatedAbove>

            <div className="flex items-center flex-wrap gap-4 mb-4">
                <AnimatedLeft delay={0.5}>
                <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 72 72" className='inline fill-indigo-600'>
<path d="M 22 14 C 17.029 14 13 18.029 13 23 L 13 49 C 13 53.971 17.029 58 22 58 L 50 58 C 54.971 58 59 53.971 59 49 L 59 23 C 59 18.029 54.971 14 50 14 L 22 14 z M 23 28 L 49 28 C 50.103 28 51 28.897 51 30 L 51 48 C 51 49.103 50.103 50 49 50 L 23 50 C 21.897 50 21 49.103 21 48 L 21 30 C 21 28.897 21.897 28 23 28 z M 32 31 C 31.448 31 31 31.448 31 32 L 31 34 C 31 34.552 31.448 35 32 35 L 34 35 C 34.552 35 35 34.552 35 34 L 35 32 C 35 31.448 34.552 31 34 31 L 32 31 z M 38 31 C 37.448 31 37 31.448 37 32 L 37 34 C 37 34.552 37.448 35 38 35 L 40 35 C 40.552 35 41 34.552 41 34 L 41 32 C 41 31.448 40.552 31 40 31 L 38 31 z M 44 31 C 43.448 31 43 31.448 43 32 L 43 34 C 43 34.552 43.448 35 44 35 L 46 35 C 46.552 35 47 34.552 47 34 L 47 32 C 47 31.448 46.552 31 46 31 L 44 31 z M 26 37 C 25.448 37 25 37.448 25 38 L 25 40 C 25 40.552 25.448 41 26 41 L 28 41 C 28.552 41 29 40.552 29 40 L 29 38 C 29 37.448 28.552 37 28 37 L 26 37 z M 32 37 C 31.448 37 31 37.448 31 38 L 31 40 C 31 40.552 31.448 41 32 41 L 34 41 C 34.552 41 35 40.552 35 40 L 35 38 C 35 37.448 34.552 37 34 37 L 32 37 z M 38 37 C 37.448 37 37 37.448 37 38 L 37 40 C 37 40.552 37.448 41 38 41 L 40 41 C 40.552 41 41 40.552 41 40 L 41 38 C 41 37.448 40.552 37 40 37 L 38 37 z M 44 37 C 43.448 37 43 37.448 43 38 L 43 40 C 43 40.552 43.448 41 44 41 L 46 41 C 46.552 41 47 40.552 47 40 L 47 38 C 47 37.448 46.552 37 46 37 L 44 37 z M 26 43 C 25.448 43 25 43.448 25 44 L 25 46 C 25 46.552 25.448 47 26 47 L 28 47 C 28.552 47 29 46.552 29 46 L 29 44 C 29 43.448 28.552 43 28 43 L 26 43 z M 32 43 C 31.448 43 31 43.448 31 44 L 31 46 C 31 46.552 31.448 47 32 47 L 34 47 C 34.552 47 35 46.552 35 46 L 35 44 C 35 43.448 34.552 43 34 43 L 32 43 z M 38 43 C 37.448 43 37 43.448 37 44 L 37 46 C 37 46.552 37.448 47 38 47 L 40 47 C 40.552 47 41 46.552 41 46 L 41 44 C 41 43.448 40.552 43 40 43 L 38 43 z"></path>
</svg>
                    <time className='proportional-nums' dateTime={work.metadata.publishedAt}>
                        {formatDate(work.metadata.publishedAt)}
                    </time>
                </p>
                </AnimatedLeft>
<div className="flex flex-wrap gap-2">
    {work.metadata.language && work.metadata.language.split(',').map((lang, index) => (
       <AnimatedRight key={index} delay={0.5 + index * 0.1}>
       <div
            className={`text-sm font-mono px-2 py-1 rounded ${getlangBackgroundColor(lang.trim())}`}
        > <span className='font-bold'>#</span>{lang.trim()}
        </div>
         </AnimatedRight>
    ))}
</div>
            </div>
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
               <AnimatedZoom delay={0.5}>
                <CustomMDX source={work.content} />
                </AnimatedZoom>
                <hr className='mb-2 border-neutral-300 dark:border-neutral-800' />
            </article>
                <AnimatedBelow delay={0.5}>
                <Saweria/>
                </AnimatedBelow>
            </>
            )}
            <Navbar />
        </section>
    )
}
