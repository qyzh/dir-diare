import { notFound } from 'next/navigation';
import { SimpleMDX } from 'app/components/simple-mdx'
import { formatDate, getArtPosts } from 'app/work/utils';
import { baseUrl } from 'app/sitemap';
import { Navbar } from 'app/components/nav';
import Breadcrumbs from 'app/components/breadcrumbs';
import Saweria from 'app/components/saweria';
import { AnimatedAbove, AnimatedBelow, AnimatedLeft, AnimatedRight, AnimatedZoom } from 'app/components/animated-section';

export async function generateStaticParams() {
    let works = getArtPosts();

    return works.map((work) => ({
        slug: work.slug,
    }));
}

export async function generateMetadata({ params }) {
    // Await the params object before accessing its properties
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    let work = getArtPosts().find((work) => work.slug === slug);

    if (!work) {
        return;
    }

    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = work.metadata;
    let ogImage = image
        ? image
        : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

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
    };
}

export default async function Blog({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const posts = await getArtPosts();
    const work = posts.find((work) => work.slug === slug);

    if (!work) {
        notFound();
    }

    const CATEGORY_STYLES = {
        'design graphics': {
            color: 'indigo',
            opacity: {
                light: '100',
                dark: '900/50'
            },
            border: true
        },
        'code projects': {
            color: 'emerald',
            opacity: {
                light: '100/50',
                dark: '900/50'
            },
            border: true
        },
        'ux/ui research': {
            color: 'orange',
            opacity: {
                light: '100/50',
                dark: '900/50'
            },
            border: true
        },
        'client projects': {
            color: 'violet',
            opacity: {
                light: '100/50',
                dark: '900/50'
            },
            border: true
        },
        'personal projects': {
            color: 'rose',
            opacity: {
                light: '100/50',
                dark: '900/30'
            },
            border: true
        }
    };

    const getCategoryBackgroundColor = (category) => {
        const normalizedCategory = category.toLowerCase();
        const style = CATEGORY_STYLES[normalizedCategory] || {
            color: 'neutral',
            opacity: {
                light: '100',
                dark: '800/50'
            }
        };

        const { color, opacity, border } = style;
        const baseClasses = `bg-${color}-${opacity.light} dark:bg-${color}-${opacity.dark} text-${color}-800 dark:text-${color}-200 transition-opacity duration-200 opacity-80 hover:opacity-100`;
        const borderClasses = border ? `border border-${color}-800` : '';

        return `${baseClasses} ${borderClasses}`.trim();
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
                                headline: work.metadata.title,
                                datePublished: work.metadata.publishedAt,
                                dateModified: work.metadata.publishedAt,
                                description: work.metadata.summary,
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
                        <Breadcrumbs post={work} />
                    </AnimatedAbove>
                        {/* Display main category */}
                        {work.metadata.category && (
                            <AnimatedRight delay={0.3}>
                                <span className={`text-sm font-mono px-2 py-1 rounded ${getCategoryBackgroundColor(work.metadata.category)}`}>
                                    {work.metadata.category}
                                </span>
                            </AnimatedRight>
                        )}
                    <AnimatedAbove delay={0.1}>
                        <h1 className="title font-mono font-bold text-3xl tracking-tighter max-w-[650px]">
                            {work.metadata.title}
                        </h1>
                    </AnimatedAbove>

                    <div className="flex items-center flex-wrap gap-4 mb-4">
                        <AnimatedLeft delay={0.5}>
                            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                <time className="proportional-nums" dateTime={work.metadata.publishedAt}>
                                {formatDate(work.metadata.publishedAt, true, )}
                                </time>
                            </p>
                        </AnimatedLeft>
                    </div>

                    <article>
                        <AnimatedZoom delay={0.5}>
                            <img
                                className="rounded-lg mb-4 max-h-[500px] w-full object-cover"
                                loading="lazy"
                                src={work.metadata.image ? work.metadata.image : '/og?title=' + encodeURIComponent(work.metadata.title)}
                                alt={work.metadata.title}
                            />
                        </AnimatedZoom>
                        <AnimatedZoom delay={0.5}>
                            <SimpleMDX content={work.content} />
                        </AnimatedZoom>
                        <hr className="mb-2 border-neutral-300 dark:border-neutral-800" />
                    </article>
                    <AnimatedBelow delay={0.5}>
                        <Saweria />
                    </AnimatedBelow>
                </>
            )}
            <Navbar />
        </section>
    );
}
