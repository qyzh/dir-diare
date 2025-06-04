import { notFound } from 'next/navigation';
import { SimpleMDX } from 'app/components/simple-mdx'
import { formatDate, getArtPosts } from 'app/work/utils';
import { baseUrl } from 'app/sitemap';
import { Navbar } from 'app/components/nav';
import Breadcrumbs from 'app/components/breadcrumbs';
import { Badge } from 'app/components/ui/ukbadge';
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

    const ogImage = image || `${baseUrl}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/work/${work.slug}`,
            images: [{ url: ogImage }],
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
            border: true
        },
        'code projects': {
            color: 'emerald',
            border: true
        },
        'ux/ui research': {
            color: 'orange',
            border: true
        },
        'client projects': {
            color: 'violet',
            border: true
        },
        'personal projects': {
            color: 'rose',
            border: true
        }
    };

    const getCategoryStyle = (category: string) => {
        const normalizedCategory = category.toLowerCase();
        const style = CATEGORY_STYLES[normalizedCategory as keyof typeof CATEGORY_STYLES] || {
            color: 'neutral',
            border: false
        };

        const color = style.color;
        const colorClasses = {
            indigo: {
                border: 'border-indigo-800',
                bg: 'bg-indigo-900/50',
                text: 'text-indigo-400',
                hoverBorder: 'hover:border-indigo-500/70',
                hoverBg: 'hover:bg-indigo-800/50',
                hoverText: 'hover:text-indigo-300'
            },
            emerald: {
                border: 'border-emerald-800',
                bg: 'bg-emerald-900/50',
                text: 'text-emerald-400',
                hoverBorder: 'hover:border-emerald-500/70',
                hoverBg: 'hover:bg-emerald-800/50',
                hoverText: 'hover:text-emerald-300'
            },
            orange: {
                border: 'border-orange-800',
                bg: 'bg-orange-900/50',
                text: 'text-orange-400',
                hoverBorder: 'hover:border-orange-500/70',
                hoverBg: 'hover:bg-orange-800/50',
                hoverText: 'hover:text-orange-300'
            },
            violet: {
                border: 'border-violet-800',
                bg: 'bg-violet-900/50',
                text: 'text-violet-400',
                hoverBorder: 'hover:border-violet-500/70',
                hoverBg: 'hover:bg-violet-800/50',
                hoverText: 'hover:text-violet-300'
            },
            rose: {
                border: 'border-rose-800',
                bg: 'bg-rose-900/50',
                text: 'text-rose-400',
                hoverBorder: 'hover:border-rose-500/70',
                hoverBg: 'hover:bg-rose-800/50',
                hoverText: 'hover:text-rose-300'
            },
            neutral: {
                border: 'border-neutral-800',
                bg: 'bg-neutral-900/50',
                text: 'text-neutral-400',
                hoverBorder: 'hover:border-neutral-500/70',
                hoverBg: 'hover:bg-neutral-800/50',
                hoverText: 'hover:text-neutral-300'
            }
        };

        return {
            ...style,
            classes: colorClasses[color as keyof typeof colorClasses] || colorClasses.neutral
        };
    };

    const categoryStyle = work.metadata.category ? getCategoryStyle(work.metadata.category) : null;

    const formatTag = (tag: string) => {
        return tag
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
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
                    {work.metadata.category && categoryStyle && (
                        <AnimatedRight delay={0.3}>
                            <Badge
                                text={work.metadata.category}
                                borderColor={categoryStyle.classes.border}
                                bgColor={categoryStyle.classes.bg}
                                textColor={categoryStyle.classes.text}
                                hoverBorderColor={categoryStyle.classes.hoverBorder}
                                hoverBgColor={categoryStyle.classes.hoverBg}
                                hoverTextColor={categoryStyle.classes.hoverText}
                            /> 
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
                                    {formatDate(work.metadata.publishedAt, true)}
                                </time> -
                                {work.metadata.languages ? ` ${work.metadata.languages.split(',').map(lang => lang.trim()).join(', ')}` : ''}
                            </p>
                        </AnimatedLeft>
                    </div>

                    <article>
                        <AnimatedZoom delay={0.5}>
                            <img
                                className="rounded-lg mb-4 max-h-[500px] w-full object-cover"
                                loading="lazy"
                                src={work.metadata.image || `/og?title=${encodeURIComponent(work.metadata.title)}`}
                                alt={work.metadata.title}
                            />
                        </AnimatedZoom>
                        <AnimatedZoom delay={0.5}>
                            <SimpleMDX content={work.content} />
                        </AnimatedZoom>
                        <hr className="mt-2 mb-2 border-neutral-300 dark:border-neutral-800" />
                        <AnimatedZoom delay={0.5}>
                            <p className="text-sm text-neutral-400 dark:text-neutral-200">
                                Tags: 
                               <span className='font-mono text-neutral-500 dark:text-neutral-400'>
                                {' '}
                                {work.metadata.tags ? work.metadata.tags.split(',').map(tag => formatTag(tag.trim())).join(', ') : ''}

                                </span>
                                {' '}
                            </p>
                        </AnimatedZoom>
                        <hr className="mt-2 mb-2 border-neutral-300 dark:border-neutral-800" />
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
