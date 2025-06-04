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
            color: 'purple',
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
        return CATEGORY_STYLES[normalizedCategory as keyof typeof CATEGORY_STYLES] || {
            color: 'neutral',
            border: false
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
                                borderColor={`border-${categoryStyle.color}-800`}
                                bgColor={`bg-${categoryStyle.color}-900/50`}
                                textColor={`text-${categoryStyle.color}-400`}
                                hoverBorderColor={`border-${categoryStyle.color}-500/70`}
                                hoverBgColor={`bg-${categoryStyle.color}-800/50`}
                                hoverTextColor={`text-${categoryStyle.color}-300`}
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
