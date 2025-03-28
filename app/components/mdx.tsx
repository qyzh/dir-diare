import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, { Children, memo, useMemo } from 'react'
import { getBlogPosts } from 'app/blog/utils'
import { Code as CodeIcon, Download, Pin, Link2, Rocket, AlertTriangle, Wrench } from 'lucide-react'

interface TableProps {
    data: {
        headers: string[];
        rows: string[][];
    };
}

const Table = memo(function Table({ data }: TableProps) {
    const headers = useMemo(() => 
        data.headers.map((header, index) => (
            <th key={index}>{header}</th>
        )), [data.headers]);

    const rows = useMemo(() => 
        data.rows.map((row, index) => (
            <tr key={index}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                ))}
            </tr>
        )), [data.rows]);

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
});

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

const CustomLink = memo(function CustomLink({ href, children, ...props }: CustomLinkProps) {
    if (href.startsWith('/')) {
        return (
            <Link
                className="text-sky-400 after:content-['_↗']"
                href={href}
                {...props}
            >
                {children}
            </Link>
        )
    }

    if (href.startsWith('#')) {
        return <a {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
});

interface RoundedImageProps extends Omit<React.ComponentProps<typeof Image>, 'alt'> {
    alt: string;
}

const RoundedImage = memo(function RoundedImage(props: RoundedImageProps) {
    return <Image className="rounded-lg" {...props} />
});

interface ImgfullProps {
    src: string;
    alt: string;
    caption?: string;
}

const Imgfull = memo(function Imgfull({ src, alt, caption }: ImgfullProps) {
    return (
        <div className="flex mt-8 justify-center items-center my-2 h-96 lg:h-svh md:h-svh">
            <figure className="absolute left-0">
                <img className="relative h-96 lg:h-svh md:h-svh w-screen" src={src} alt={alt}/>
                {caption && (
                    <figcaption className="relative my-2 text-sm text-center md:text-center text-gray-500 dark:text-gray-400">
                        {caption}
                    </figcaption>
                )}
            </figure>
        </div>
    );
});

interface ImgLgProps {
    src: string;
    alt: string;
    caption?: string;
}

const ImgLg = memo(function ImgLg({ src, alt, caption }: ImgLgProps) {
    return (
        <div className="my-8 md:my-36 md:scale-150">
            <figure className="w-full h-96 relative">
                <img className="absolute inset-0 w-full h-full object-cover" src={src} alt={alt}/>
                {caption && (
                    <figcaption className="relative my-2 text-sm text-center md:text-left lg:text-center text-gray-500 dark:text-gray-400">
                        {caption}
                    </figcaption>
                )}
            </figure>
        </div>
    );
});

interface RelatepostProps {
    linkin: string;
}

const Relatepost = memo(function Relatepost({ linkin }: RelatepostProps) {
    const posts = useMemo(() => getBlogPosts(), []);
    const filteredPost = useMemo(() => 
        posts.filter((post) => post.slug === linkin), [posts, linkin]);

    return (
        <>
            {filteredPost.map((post) => (
                <Link key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="flex flex-col hover:bg-white/5 not-prose">
                    <div className="flex items-center shadow-lg m-auto border border-zinc-800 rounded-lg w-full overflow-hidden">
                        <div className="flex-none w-48 h-32 relative">
                            <img src={post.metadata.image} alt={post.metadata.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className='flex-auto ml-4'>
                            <span className='text-lg font-semibold'>{post.metadata.title}</span><br/>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{post.metadata.summary}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
});

interface LinkextProps {
    href: string;
    text: string;
}

const Linkext = memo(function Linkext({ href, text }: LinkextProps) {
    return (
        <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50 after:content-['_↗']"
            href={href}
        >
            {text}
        </Link>
    );
});

interface StabiloBiruProps {
    children: React.ReactNode;
}

const StabiloBiru = memo(function StabiloBiru({ children }: StabiloBiruProps) {
    return (
        <span className="font-semibold italic bg-blue-200/60 hover:bg-blue-200 text-zinc-900 border-b-2 border-blue-500">
            {children}
        </span>
    );
});

interface FNProps {
    href: string;
    id: string;
    children: React.ReactNode;
}

const FN = memo(function FN({ href, id, children }: FNProps) {
    return (
        <a href={href} aria-describedby="footnote-label" id={id}>
            {children}
        </a>
    );
});

interface FootareaProps {
    id: string;
    children: React.ReactNode;
}

const Footarea = memo(function Footarea({ id, children }: FootareaProps) {
    return (
        <div className="footnote relative overflow-hidden tracking-tight text-sm border-t dark:border-zinc-800 border-zinc-200">
            <h2 id={id} className="hidden invisible">
                Footnotes :{' '}
            </h2>
            <ol className='list-decimal ml-4 font-mono italic'>
                {children}
            </ol>
        </div>
    );
});

interface CboxProps {
    children: React.ReactNode;
    href: string;
    source: string;
}

const Cbox = memo(function Cbox({ children, href, source }: CboxProps) {
    return (
        <div className='relative tracking-tight text-pretty text-soverflow-hidden my-8 border border-zinc-800 rounded-md'>
            <span className="absolute flex h-12 w-12 -right-4 rounded-full items-center justify-center -top-4 overflow-hidden"> 
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-blue-500 items-center justify-center">
                    <Pin/>
                </span>
            </span>
            <div className='p-8'>
                {children}{' '}
            </div>
            <div className='flex bg-neutral-900 text-zinc-200 py-2 px-8 border-t border-zinc-700'>
                <a href={href} target='_blank'>
                    <Link2 className='inline mr-1'/>{source}
                </a>
            </div>
        </div>
    );
});

interface FNlistProps {
    id: string;
    href: string;
    children: React.ReactNode;
}

const FNlist = memo(function FNlist({ id, href, children }: FNlistProps) {
    return (
        <li id={id}>
            {children}<a href={href}>↩</a>
        </li>
    );
});

interface PentingProps {
    emoji: string;
    children: React.ReactNode;
}

const Penting = memo(function Penting({ emoji, children }: PentingProps) {
    return (
        <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">{emoji}</div>
            <div className="w-full callout">{children}</div>
        </div>
    );
});

interface QuoteProps {
    cite: string;
    children: React.ReactNode;
}

const Kutiptengah = memo(function Kutiptengah({ cite, children }: QuoteProps) {
    return (
        <blockquote className="text-xl italic font-semibold text-center mb-4 text-gray-900 dark:text-white">
            {children}{' '}
            <cite className="text-xs font-normal">- {cite}</cite>
        </blockquote>
    );
});

const Kutipkiri = memo(function Kutipkiri({ cite, children }: QuoteProps) {
    return (
        <blockquote className="text-xl italic font-semibold text-left mb-4 text-gray-900 dark:text-white">
            {children}{' '}
            <cite className="text-xs font-normal">- {cite}</cite>
        </blockquote>
    );
});

const Kutipkanan = memo(function Kutipkanan({ cite, children }: QuoteProps) {
    return (
        <blockquote className="text-xl italic font-semibold text-right mb-4 text-gray-900 dark:text-white">
            {children}{' '}
            <cite className="text-xs font-normal">- {cite}</cite>
        </blockquote>
    );
});

interface MarkerProps {
    children: React.ReactNode;
}

const Marker = memo(function Marker({ children }: MarkerProps) {
    return (
        <mark className="transition bg-purple-300 text-purple-900 hover:bg-purple-600 hover:text-zinc-300">
            {children}
        </mark>
    );
});

interface ErrorProps {
    children: React.ReactNode;
}

const Error = memo(function Error({ children }: ErrorProps) {
    return (
        <div className="px-4 text-balance py-3 border border-rose-600 bg-rose-900 rounded p-1 flex items-center text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">
                <AlertTriangle className="size-12" />
            </div>
            <div className="">{children}</div>
        </div>
    );
});

interface ErrorpopProps {
    title: string;
    children: React.ReactNode;
}

const Errorpop = memo(function Errorpop({ title, children }: ErrorpopProps) {
    return (
        <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800">
            <div className="flex items-center justify-center w-12 bg-rose-500">
                <Wrench className="size-6" />
            </div>
            <div className="px-4 -mx-3">
                <div className="mx-3">
                    <div className="font-semibold text-red-500 dark:text-red-400 pt-2">{title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
});

interface ComArtProps {
    src: string;
    alt: string;
}

const ComArt = memo(function ComArt({ src, alt }: ComArtProps) {
    return (
        <Image 
            alt={alt} 
            className="rounded-lg border border-zinc-700"
            loading="lazy"
            width={900}
            height={900}
            quality={100}
            src={src}
        />
    );
});

interface BtnProps {
    href: string;
    text: string;
    dis?: boolean;
}

const BtnDownload = memo(function BtnDownload({ href, text, dis }: BtnProps) {
    return (
        <Link href={href} target='_blank'>
            <button
                className="flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                type="button"
                disabled={dis}
            >
                {text}
                <Download/>
            </button>
        </Link>
    );
});

const BtnSource = memo(function BtnSource({ href, text }: BtnProps) {
    return (
        <Link href={href} target='_blank'>
            <button
                className="flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                type="button"
            >
                {text}
                <CodeIcon/>
            </button>
        </Link>
    );
});

const BtnPreview = memo(function BtnPreview({ href, text }: BtnProps) {
    return (
        <Link href={href} target='_blank'>
            <button
                className="flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                type="button"
            >
                {text}
                <Rocket/>
            </button>
        </Link>
    );
});

interface BtnAreaProps {
    children: React.ReactNode;
}

const BtnArea = memo(function BtnArea({ children }: BtnAreaProps) {
    return (
        <div className=''>
            <div className='justify-center border border-zinc-700 rounded flex flex-rows gap-2 p-4 mb-2 mt-4'>
                {children}
            </div>
        </div>
    );
});

interface CodeProps {
    children: string;
    className?: string;
}

const Code = memo(function Code({ children, className, ...props }: CodeProps) {
    const codeHTML = useMemo(() => highlight(children), [children]);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} className={className} {...props} />;
});

function slugify(str: string): string {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

function createHeading(level: number) {
    const Heading = memo(function Heading({ children }: { children: React.ReactNode }) {
        const slug = useMemo(() => slugify(children as string), [children]);
        return React.createElement(
            `h${level}`,
            { id: slug },
            [
                React.createElement('a', {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: 'anchor',
                }),
            ],
            children
        );
    });

    Heading.displayName = `Heading${level}`;
    return Heading;
}

const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    Penting,
    Imgfull,
    ImgLg,
    Kutiptengah,
    Kutipkiri,
    Relatepost,
    Kutipkanan,
    Linkext,
    ComArt,
    FN,
    Error,
    StabiloBiru,
    Footarea,
    Cbox,
    FNlist,
    BtnArea,
    BtnDownload,
    BtnPreview,
    BtnSource,
    Marker,
    Errorpop,
    code: Code,
    Table,
};

interface CustomMDXProps {
    components?: Record<string, React.ComponentType<any>>;
    source: string;
    [key: string]: any;
}

export const CustomMDX = memo(function CustomMDX(props: CustomMDXProps) {
    const mergedComponents = useMemo(() => ({
        ...components,
        ...(props.components || {})
    }), [props.components]);

    return (
        <MDXRemote
            {...props}
            components={mergedComponents}
        />
    );
});
