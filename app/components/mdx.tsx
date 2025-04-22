import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, { memo, useMemo } from 'react'
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
        <table className="w-full border-collapse">
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
                className="text-sky-400 hover:text-sky-300 after:content-['_↗']"
                href={href}
                {...props}
            >
                {children}
            </Link>
        )
    }

    if (href.startsWith('#')) {
        return (
            <a
                className="text-sky-400 hover:text-sky-300"
                href={href}
                {...props}
            />
        )
    }

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 after:content-['_↗']"
            href={href}
            {...props}
        />
    )
});

interface ImageProps {
    src: string;
    alt: string;
    caption?: string;
}

const RoundedImage = memo(function RoundedImage({ alt, ...props }: ImageProps) {
    return <Image className="rounded-lg" alt={alt} {...props} />
});

const Imgfull = memo(function Imgfull({ src, alt, caption }: ImageProps) {
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

const ImgLg = memo(function ImgLg({ src, alt, caption }: ImageProps) {
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
        posts.find((post) => post.slug === linkin), [posts, linkin]);

    if (!filteredPost) return null;

    return (
        <Link
            href={`/blog/${filteredPost.slug}`}
            className="flex flex-col hover:bg-white/5 not-prose">
            <div className="flex items-center shadow-lg m-auto border border-zinc-800 rounded-lg w-full overflow-hidden">
                <div className="flex-none w-48 h-32 relative">
                    <img
                        src={filteredPost.metadata.image}
                        alt={filteredPost.metadata.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div className='flex-auto ml-4'>
                    <span className='text-lg font-semibold'>{filteredPost.metadata.title}</span><br/>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{filteredPost.metadata.summary}</span>
                </div>
            </div>
        </Link>
    );
});

function Linkext(props) {
    return (
        <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50  after:content-['_↗']"
            href={props.href}
        >
            {props.text}
        </Link>
    )
}
function StabiloBiru(props) {
    return (
        <span
            className="font-semibold italic bg-blue-200/60 hover:bg-blue-200 text-zinc-900 border-b-2 border-blue-500"
        >
            {props.children}
        </span>
    )
}
function FN(props) {
    return (
        <a href={props.href} aria-describedby="footnote-label" id={props.id}>
            {props.children}
        </a>
    )
}
function Footarea(props) {
    return (
        <div className="
        footnote relative
        overflow-hidden
        tracking-tight
        text-sm
        border-t
        dark:border-zinc-800
        border-zinc-200
        ">
            <h2 id={props.id} className="hidden invisible">
                Footnotes :{' '}
            </h2>
            <ol className='list-decimal ml-4 font-mono italic'>
                {props.children}</ol>
        </div>
    )
}
const Cbox = ({ children, href, source }) => (
    <div
        className='relative tracking-tight text-pretty text-soverflow-hidden my-8 border border-zinc-800 rounded-md'
    >
        <span className="absolute flex h-12 w-12 -right-4 rounded-full items-center justify-center -top-4 overflow-hidden">
            <span className="animate-ping absolute inline-flex  h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-blue-500 items-center justify-center">
            <Pin/>
            </span>
        </span>
        <div className='p-8'>
        {children}{' '}
        </div>
        <div className='flex bg-neutral-900 text-zinc-200 py-2 px-8 border-t border-zinc-700'>
        <a href={href} target='_blank' >
            <Link2 className='inline mr-1'/>{source}
        </a>
        </div>
    </div>
)
function FNlist(props) {
    return (
        <li id={props.id}>
            {props.children}<a href={props.href}>↩</a>
        </li>
    )
}
function Penting(props) {
    return (
        <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">{props.emoji}</div>
            <div className="w-full callout">{props.children}</div>
        </div>
    )
}
function Kutiptengah(props) {
    return (
        <blockquote className="text-xl italic font-semibold text-center mb-4 text-gray-900 dark:text-white">
            {props.children}{' '}
            <cite className="text-xs font-normal">- {props.cite}</cite>
        </blockquote>
    )
}

function Kutipkiri(props) {
    return (
        <blockquote className="text-xl italic font-semibold text-left mb-4  text-gray-900 dark:text-white">
            {props.children}{' '}
            <cite className="text-xs font-normal">- {props.cite}</cite>
        </blockquote>
    )
}

function Kutipkanan(props) {
    return (
        <blockquote className="text-xl italic font-semibold text-right mb-4  text-gray-900 dark:text-white">
            {props.children}{' '}
            <cite className="text-xs font-normal">- {props.cite}</cite>
        </blockquote>
    )
}

function Marker(props) {
    return (
        <mark className="transition bg-purple-300 text-purple-900 hover:bg-purple-600 hover:text-zinc-300">
            {props.children}
        </mark>
    )
}

function Error(props) {
    return (
<div className="px-4 text-balance py-3 border border-rose-600 bg-rose-900 rounded p-1 flex items-center text-neutral-100 mb-8">
<div className="flex items-center w-4 mr-4">
    <AlertTriangle className="size-12" />
</div>
<div className="">{props.children}</div>
</div>
    )
}

function Errorpop(props) {
    return (
        <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <div className="flex items-center justify-center w-12 bg-rose-500">
            <Wrench className="size-6" />
        </div>

        <div className="px-4 -mx-3">
            <div className="mx-3">
                <div className="font-semibold text-red-500 dark:text-red-400 pt-2">{props.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-200">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
    )
}

function ComArt({ src, alt}) {
    return (
<Image alt={alt} className="rounded-lg border border-zinc-700"
    loading="lazy"
    width={900}
    height={900}
    quality={100}
    src={src}
 />
    )
}
function BtnDownload({ href, text, dis }) {
    return (
            <Link href={href} target='_blank'>
        <button
        className="group flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
        type="button">
        {text}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 72 72"
        className='group inline-block fill-blue-800 group-hover:fill-blue-500'>
<path d="M 41.939453 12.275391 C 35.913453 12.275391 30.410219 15.129578 26.949219 19.892578 C 26.548219 19.854578 26.144234 19.835938 25.740234 19.835938 C 19.572234 19.835937 14.318734 24.17875 12.927734 29.96875 C 8.1517344 32.33975 5 37.259375 5 42.734375 C 5 50.430375 11.117672 56.815797 18.638672 56.966797 C 20.826672 57.011797 52.251406 57.011797 54.441406 56.966797 C 61.366406 56.826797 67 50.926453 67 43.814453 C 67 39.006453 64.437172 34.728828 60.451172 32.423828 C 60.497172 31.900828 60.519531 31.377469 60.519531 30.855469 C 60.519531 20.610469 52.183453 12.275391 41.939453 12.275391 z M 41.941406 20.273438 C 47.774406 20.273438 52.519531 25.019516 52.519531 30.853516 C 52.519531 31.824516 52.377656 32.810203 52.097656 33.783203 C 51.795656 34.834203 51.937281 35.963203 52.488281 36.908203 C 53.039281 37.853203 53.955531 38.531203 55.019531 38.783203 C 57.363531 39.339203 59 41.407453 59 43.814453 C 59 46.603453 56.882297 48.91675 54.279297 48.96875 C 52.288297 49.00875 20.788781 49.00875 18.800781 48.96875 C 15.602781 48.90375 13 46.107375 13 42.734375 C 13 39.922375 14.898187 37.442125 17.617188 36.703125 C 19.333187 36.237125 20.533406 34.694969 20.566406 32.917969 C 20.619406 30.114969 22.940234 27.835938 25.740234 27.835938 C 26.331234 27.835938 26.926719 27.942297 27.511719 28.154297 C 29.424719 28.852297 31.561797 27.999828 32.466797 26.173828 C 34.269797 22.535828 37.900406 20.273438 41.941406 20.273438 z M 38 29 C 36.896 29 36 29.896 36 31 L 36 39 L 34.128906 39 C 33.706906 39 33.321906 39.222219 33.128906 39.574219 C 32.935906 39.926219 32.955891 40.358828 33.212891 40.673828 L 37.197266 45.556641 C 37.408266 45.814641 37.718453 45.984047 38.064453 45.998047 C 38.410453 46.012047 38.767703 45.893859 38.970703 45.630859 L 42.736328 40.746094 C 42.994328 40.411094 43.088297 39.990234 42.904297 39.615234 C 42.720297 39.240234 42.320859 39 41.880859 39 L 40 39 L 40 31 C 40 29.896 39.104 29 38 29 z"></path>
</svg>
      </button>
      </Link>
    )
}
function BtnSource({ href, text}) {
    return (
        <Link href={href} target='_blank'>
        <button
        className="group flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
        type="button">
        {text}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 72 72"
        className='group inline-block fill-amber-800 group-hover:fill-amber-500'>
<path d="M 19 12 C 14.037 12 10 16.038 10 21 L 10 51 C 10 55.962 14.037 60 19 60 L 53 60 C 57.963 60 62 55.962 62 51 L 62 21 C 62 16.038 57.963 12 53 12 L 19 12 z M 19 20 L 53 20 C 53.552 20 54 20.449 54 21 L 54 24 L 18 24 L 18 21 C 18 20.449 18.448 20 19 20 z M 43 21 C 42.448 21 42 21.448 42 22 C 42 22.552 42.448 23 43 23 C 43.552 23 44 22.552 44 22 C 44 21.448 43.552 21 43 21 z M 47 21 C 46.448 21 46 21.448 46 22 C 46 22.552 46.448 23 47 23 C 47.552 23 48 22.552 48 22 C 48 21.448 47.552 21 47 21 z M 51 21 C 50.448 21 50 21.448 50 22 C 50 22.552 50.448 23 51 23 C 51.552 23 52 22.552 52 22 C 52 21.448 51.552 21 51 21 z M 18 28 L 54 28 L 54 51 C 54 51.551 53.552 52 53 52 L 19 52 C 18.448 52 18 51.551 18 51 L 18 28 z M 28.607422 33.005859 C 27.967598 32.953594 27.315313 33.209297 26.882812 33.748047 C 26.192813 34.610047 26.329406 35.869547 27.191406 36.560547 L 30.859375 39.5 L 27.191406 42.439453 C 26.328406 43.130453 26.192812 44.389953 26.882812 45.251953 C 27.278813 45.744953 27.857359 46 28.443359 46 C 28.883359 46 29.324359 45.855547 29.693359 45.560547 L 35.306641 41.060547 C 35.780641 40.680547 36.056641 40.107 36.056641 39.5 C 36.056641 38.893 35.780641 38.319453 35.306641 37.939453 L 29.693359 33.439453 C 29.370109 33.180703 28.991316 33.037219 28.607422 33.005859 z M 38 42 C 36.896 42 36 42.896 36 44 C 36 45.104 36.896 46 38 46 L 44 46 C 45.104 46 46 45.104 46 44 C 46 42.896 45.104 42 44 42 L 38 42 z"></path>
</svg>
    </button>
    </Link>
    )
}
function BtnPreview({ href, text }) {
    return (
        <Link href={href} target='_blank'>
        <button
        className="group flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
        type="button">
        {text}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 72 72"
        className='group inline-block fill-teal-800 group-hover:fill-teal-500'>
<path d="M 16.027344 13.015625 C 11.698344 13.015625 7.0234375 16.452484 7.0234375 21.646484 L 7.0234375 44.474609 C 7.0234375 48.548609 10.805063 53.003906 16.039062 53.003906 L 29.039062 53.003906 L 28.964844 57.007812 C 27.859844 57.007812 26.990234 57.909672 26.990234 59.013672 C 26.990234 60.117672 27.903813 61 29.007812 61 L 42.279297 60.990234 C 43.569297 60.812234 43.900328 59.694922 43.861328 59.669922 C 39.182328 56.699922 39.055547 48.085109 40.935547 45.037109 L 16.037109 45.037109 C 15.486109 45.037109 14.986328 44.606687 14.986328 44.054688 L 15.035156 21.992188 C 15.035156 21.440187 15.425562 21.027344 15.976562 21.027344 L 54.015625 21.003906 C 54.567625 21.003906 54.980469 21.490969 54.980469 22.042969 L 55.005859 35.992188 C 56.637859 36.091187 59.87675 36.734422 62.96875 39.232422 L 62.96875 21.992188 C 63.06775 17.936188 59.679672 13.040625 54.263672 13.015625 L 16.027344 13.015625 z M 53.982422 39.943359 C 48.445422 39.943359 43.957031 44.43175 43.957031 49.96875 C 43.957031 55.50575 48.445422 59.994141 53.982422 59.994141 C 59.519422 59.994141 64.007812 55.50575 64.007812 49.96875 C 64.007812 44.43175 59.518422 39.943359 53.982422 39.943359 z M 58.066406 43.917969 C 58.322156 43.918844 58.576484 44.017844 58.771484 44.214844 C 59.160484 44.606844 59.158625 45.239906 58.765625 45.628906 L 56.708984 47.667969 L 58.751953 49.710938 C 59.141953 50.100937 59.141953 50.734 58.751953 51.125 C 58.556953 51.32 58.300922 51.417969 58.044922 51.417969 C 57.788922 51.417969 57.532891 51.32 57.337891 51.125 L 54.585938 48.371094 C 54.396938 48.183094 54.291969 47.928109 54.292969 47.662109 C 54.293969 47.396109 54.399891 47.142078 54.587891 46.955078 L 57.357422 44.207031 C 57.553422 44.012531 57.810656 43.917094 58.066406 43.917969 z M 49.671875 49.167969 C 49.927625 49.166969 50.184859 49.263031 50.380859 49.457031 L 53.132812 52.185547 C 53.321812 52.372547 53.426734 52.628531 53.427734 52.894531 C 53.428734 53.160531 53.322766 53.415516 53.134766 53.603516 L 50.400391 56.337891 C 50.205391 56.532891 49.949359 56.630859 49.693359 56.630859 C 49.437359 56.630859 49.181328 56.532891 48.986328 56.337891 C 48.595328 55.946891 48.595328 55.314828 48.986328 54.923828 L 51.011719 52.898438 L 48.972656 50.876953 C 48.579656 50.487953 48.577797 49.854891 48.966797 49.462891 C 49.161797 49.266891 49.416125 49.168969 49.671875 49.167969 z"></path>
</svg>
    </button>
    </Link>
    )
}
interface BtnAreaProps {
    children: React.ReactNode;
}

function BtnArea(props: BtnAreaProps) {
    return (
        <div className=''>
            <div className='justify-center border-1 border-zinc-700 rounded flex flex-rows gap-2 p-4 mb-2 mt-4'>
                {props.children}
            </div>
        </div>
    );
}

const Code = memo(function Code({ children, ...props }: { children: string } & React.HTMLAttributes<HTMLElement>) {
    const codeHTML = useMemo(() => highlight(children), [children]);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
});

const slugify = (str: string): string => {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const createHeading = (level: number) => {
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
};

const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    del: ({ children }) => <del className="line-through text-gray-500 dark:text-gray-400">{children}</del>,
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

export const CustomMDX = memo(function CustomMDX(props: any) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
        />
    );
});
