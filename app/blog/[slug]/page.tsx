import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { Navbar } from 'app/components/nav'
import  Komentar  from 'app/components/comments'
import Saweria from 'app/components/saweria'
import Breadcrumbs from 'app/components/breadcrumbs'
import { readTime } from 'utils/ReadTime'
import { AnimatedAbove, AnimatedBelow, AnimatedLeft, AnimatedZoom } from 'app/components/animated-section'

export async function generateStaticParams() {
    let posts = getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}
export function generateMetadata({ params }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug)
    if (!post) {
        return
    }

    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata
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
            url: `${baseUrl}/blog/${post.slug}`,
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
    let post = getBlogPosts().find((post) => post.slug === params.slug)

    if (!post) {
        notFound()
    }



    return (
        <section>
            {post && (
                <>
                    <script
                        type="application/ld+json"
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'BlogPosting',
                                headline: post.metadata.title,
                                datePublished: post.metadata.publishedAt,
                                dateModified: post.metadata.publishedAt,
                                description: post.metadata.summary,
                                image: post.metadata.image
                                    ? `${baseUrl}${post.metadata.image}`
                                    : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                                url: `${baseUrl}/blog/${post.slug}`,
                                author: {
                                    '@type': 'Person',
                                    name: 'UQ',
                                },
                            }),
                        }}
                    />
                    <AnimatedAbove delay={0.5}>
                    <Breadcrumbs post={post}/>
                    </AnimatedAbove>
                    <AnimatedAbove delay={0.3}>
                    <h1 className="title font-bold text-3xl tracking-tighter max-w-[650px]">
                        {post.metadata.title}
                    </h1>
                    <p className='text-neutral-600 font-mono dark:text-neutral-400'>{post.metadata.summary}</p>
                    </AnimatedAbove>

                    <div className='grid gap-4'>
                        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-2 gap-y-1 text-m text-neutral-600 dark:text-neutral-400 mb-2">
                        <AnimatedLeft delay={0.7}>
                            <div className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 72 72" className='inline fill-indigo-600'>
                                    <path d="M 22 14 C 17.029 14 13 18.029 13 23 L 13 49 C 13 53.971 17.029 58 22 58 L 50 58 C 54.971 58 59 53.971 59 49 L 59 23 C 59 18.029 54.971 14 50 14 L 22 14 z M 23 28 L 49 28 C 50.103 28 51 28.897 51 30 L 51 48 C 51 49.103 50.103 50 49 50 L 23 50 C 21.897 50 21 49.103 21 48 L 21 30 C 21 28.897 21.897 28 23 28 z M 32 31 C 31.448 31 31 31.448 31 32 L 31 34 C 31 34.552 31.448 35 32 35 L 34 35 C 34.552 35 35 34.552 35 34 L 35 32 C 35 31.448 34.552 31 34 31 L 32 31 z M 38 31 C 37.448 31 37 31.448 37 32 L 37 34 C 37 34.552 37.448 35 38 35 L 40 35 C 40.552 35 41 34.552 41 34 L 41 32 C 41 31.448 40.552 31 40 31 L 38 31 z M 44 31 C 43.448 31 43 31.448 43 32 L 43 34 C 43 34.552 43.448 35 44 35 L 46 35 C 46.552 35 47 34.552 47 34 L 47 32 C 47 31.448 46.552 31 46 31 L 44 31 z M 26 37 C 25.448 37 25 37.448 25 38 L 25 40 C 25 40.552 25.448 41 26 41 L 28 41 C 28.552 41 29 40.552 29 40 L 29 38 C 29 37.448 28.552 37 28 37 L 26 37 z M 32 37 C 31.448 37 31 37.448 31 38 L 31 40 C 31 40.552 31.448 41 32 41 L 34 41 C 34.552 41 35 40.552 35 40 L 35 38 C 35 37.448 34.552 37 34 37 L 32 37 z M 38 37 C 37.448 37 37 37.448 37 38 L 37 40 C 37 40.552 37.448 41 38 41 L 40 41 C 40.552 41 41 40.552 41 40 L 41 38 C 41 37.448 40.552 37 40 37 L 38 37 z M 44 37 C 43.448 37 43 37.448 43 38 L 43 40 C 43 40.552 43.448 41 44 41 L 46 41 C 46.552 41 47 40.552 47 40 L 47 38 C 47 37.448 46.552 37 46 37 L 44 37 z M 26 43 C 25.448 43 25 43.448 25 44 L 25 46 C 25 46.552 25.448 47 26 47 L 28 47 C 28.552 47 29 46.552 29 46 L 29 44 C 29 43.448 28.552 43 28 43 L 26 43 z M 32 43 C 31.448 43 31 43.448 31 44 L 31 46 C 31 46.552 31.448 47 32 47 L 34 47 C 34.552 47 35 46.552 35 46 L 35 44 C 35 43.448 34.552 43 34 43 L 32 43 z M 38 43 C 37.448 43 37 43.448 37 44 L 37 46 C 37 46.552 37.448 47 38 47 L 40 47 C 40.552 47 41 46.552 41 46 L 41 44 C 41 43.448 40.552 43 40 43 L 38 43 z"></path>
                                </svg>
                                <time className='proportional-nums font-mono' dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt, true)}</time>
                            </div>
                            </AnimatedLeft>
                            <AnimatedLeft delay={0.5}>
                            <div className='flex items-center text-m text-teal-400 hover:text-teal-200'>
                                <Link
                                    href="#comments"
                                    className="flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" className='inline fill-teal-400 hover:fill-teal-200' viewBox="0 0 72 72" fill="currentColor">
                                        <path d="M 17.335938 13 C 15.079937 13 13.10325 13.477641 11.40625 14.431641 C 9.70925 15.385641 8.3836875 16.70925 7.4296875 18.40625 C 6.4756875 20.10325 5.9980469 22.081891 5.9980469 24.337891 L 5.9980469 33.691406 C 5.9980469 35.948406 6.4980469 37.924094 7.4980469 39.621094 C 8.4980469 41.318094 9.80125 42.643656 11.40625 43.597656 C 13.01125 44.551656 14.711766 45.027344 16.509766 45.027344 L 17.074219 45.027344 L 17.074219 48.880859 C 17.074219 50.439859 17.491172 51.662734 18.326172 52.552734 C 19.161172 53.442734 20.285266 53.888672 21.697266 53.888672 C 22.670266 53.888672 23.614297 53.680578 24.529297 53.267578 C 25.446297 52.855578 26.493969 52.145719 27.667969 51.136719 L 34.765625 45.027344 L 38.529297 45.027344 C 40.785297 45.027344 42.760031 44.551656 44.457031 43.597656 C 46.154031 42.643656 47.479594 41.318094 48.433594 39.621094 C 49.387594 37.924094 49.865234 35.947406 49.865234 33.691406 L 49.865234 24.337891 C 49.865234 22.080891 49.387594 20.10325 48.433594 18.40625 C 47.479594 16.70925 46.154031 15.385641 44.457031 14.431641 C 42.761031 13.477641 40.785297 13 38.529297 13 L 17.335938 13 z M 18.052734 20.980469 L 37.927734 20.980469 C 39.248734 20.980469 40.256125 21.314375 40.953125 21.984375 C 41.650125 22.654375 42 23.676734 42 25.052734 L 42 32.976562 C 42 34.352562 41.650125 35.373922 40.953125 36.044922 C 40.256125 36.713922 39.248734 37.048828 37.927734 37.048828 L 34.052734 37.048828 C 33.153734 37.048828 32.451266 37.171922 31.947266 37.419922 C 31.443266 37.667922 30.841531 38.12125 30.144531 38.78125 L 23.570312 45.136719 L 23.570312 39.46875 C 23.570312 38.58875 23.345484 37.964656 22.896484 37.597656 C 22.447484 37.230656 21.863437 37.048828 21.148438 37.048828 L 18.052734 37.048828 C 16.731734 37.048828 15.722391 36.714922 15.025391 36.044922 C 14.328391 35.374922 13.978516 34.352562 13.978516 32.976562 L 13.978516 25.052734 C 13.978516 23.676734 14.328391 22.654375 15.025391 21.984375 C 15.722391 21.315375 16.731734 20.980469 18.052734 20.980469 z M 53.820312 23 C 53.850313 23.44 53.869141 23.889844 53.869141 24.339844 L 53.869141 30.980469 L 54.949219 30.980469 C 56.269219 30.980469 57.280469 31.320469 57.980469 31.980469 C 58.670469 32.650469 59.019531 33.680781 59.019531 35.050781 L 59.019531 42.980469 C 59.019531 44.350469 58.670469 45.369062 57.980469 46.039062 C 57.280469 46.709062 56.269219 47.050781 54.949219 47.050781 L 51.849609 47.050781 C 51.139609 47.050781 50.549609 47.229609 50.099609 47.599609 C 49.659609 47.969609 49.429688 48.590703 49.429688 49.470703 L 49.429688 55.140625 L 42.849609 48.779297 C 42.769609 48.699297 42.689375 48.620547 42.609375 48.560547 C 42.452375 48.597547 42.295719 48.633016 42.136719 48.666016 C 39.959719 49.122016 38.325 49.029297 36.25 49.029297 L 30.119141 54.310547 C 31.429141 54.790547 32.880703 55.029297 34.470703 55.029297 L 38.230469 55.029297 L 45.330078 61.140625 C 46.500078 62.140625 47.550703 62.859531 48.470703 63.269531 C 49.380703 63.679531 50.330781 63.890625 51.300781 63.890625 C 52.710781 63.890625 53.839922 63.440781 54.669922 62.550781 C 55.509922 61.660781 55.919922 60.440859 55.919922 58.880859 L 55.919922 55.029297 C 56.370922 55.029297 58.805844 55.252609 61.589844 53.599609 C 63.199844 52.639609 64.5 51.319141 65.5 49.619141 C 66.5 47.919141 67 45.949453 67 43.689453 L 67 34.339844 C 67 32.079844 66.520313 30.100156 65.570312 28.410156 C 64.620312 26.710156 63.289844 25.389687 61.589844 24.429688 C 59.899844 23.479687 57.920156 23 55.660156 23 L 53.820312 23 z"></path>
                                    </svg>
                                    <div className="#comments">Comments</div>
                                </Link>
                            </div>
                            </AnimatedLeft>
                            <AnimatedLeft delay={0.3}>
                            <div className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 72 72" className='inline fill-blue-600'>
                                    <path d="M42.919,37.65l2.856,2.899C49.789,44.626,52,50.042,52,55.8c0,2.867-2.318,5.2-5.167,5.2H25.167 C22.318,61,20,58.667,20,55.8c0-5.758,2.211-11.174,6.225-15.25l2.855-2.899c0.426-0.432,0.67-1.033,0.67-1.65 s-0.244-1.219-0.669-1.65l-2.943-2.987C22.18,27.343,20,22.003,20,16.324C20,13.344,22.315,11,25.161,11h21.678 C49.685,11,52,13.344,52,16.225c0,5.778-2.18,11.118-6.138,15.138L42.92,34.35c-0.426,0.432-0.67,1.033-0.67,1.65 S42.494,37.219,42.919,37.65z M43.62,55c1.247,0,1.872-1.508,0.99-2.39l-6.817-6.817c-0.188-0.188-0.293-0.442-0.293-0.707V32.912 c0-1.035,0.407-2.028,1.133-2.765l1.424-1.445C40.68,28.07,40.232,27,39.345,27h-6.696c-0.887,0-1.335,1.068-0.713,1.701 l1.419,1.444c0.734,0.747,1.145,1.752,1.145,2.799v12.141c0,0.265-0.105,0.52-0.293,0.707L27.39,52.61 C26.508,53.492,27.133,55,28.38,55H43.62z"></path>
                                </svg>{readTime(post.content)} read
                            </div>
                            </AnimatedLeft>
                        </div>
                    </div>
                    <AnimatedZoom delay={0.5}>
                    <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                        <CustomMDX source={post.content} />
                        <hr className='my-4 border-neutral-300 dark:border-neutral-700' />
                        <Komentar/>
                    </article>
                    </AnimatedZoom>
                    <AnimatedBelow delay={0.5}>
                    <Saweria/>
                    </AnimatedBelow>
                </>
            )}
            <Navbar />
        </section>
    )
}
