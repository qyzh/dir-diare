import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, { Children } from 'react'
import { getBlogPosts } from 'app/blog/utils'
import { CodeIcon,DownloadIcon, DrawingPinFilledIcon, Link2Icon, RocketIcon } from '@radix-ui/react-icons'

function Table({ data }) {
    let headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))
    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ))

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function CustomLink(props) {
    let href = props.href

    if (href.startsWith('/')) {
        return (
            <Link
                className="text-sky-400 after:content-['_↗']"
                href={href}
                {...props}
            >
                {props.children}
            </Link>
        )
    }

    if (href.startsWith('#')) {
        return <a {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />
}
function Imgfull(props) {
    return (
        <div className="flex mt-8 justify-center items-center my-2 h-96 lg:h-svh md:h-svh">
        <figure className="absolute left-0">
        <img className="relative h-96 lg:h-svh md:h-svh w-screen" src={props.src} alt={props.alt}/>
        <figcaption className="relative my-2 text-sm text-center md:text-center text-gray-500 dark:text-gray-400">{props.caption}</figcaption>
    </figure>
    </div>
    )
}
function ImgLg(props) {
    return (
        <div className="my-8 md:my-36 md:scale-150 ">
        <figure className="w-full h-96 relative">
        <img className="absolute inset-0 w-full h-full object-cover"
         src={props.src} alt={props.alt}/>
        <figcaption className="relative my-2 text-sm text-center md:text-left lg:text-center text-gray-500 dark:text-gray-400">{props.caption}</figcaption>
    </figure>
    </div>
    )
}

function Relatepost({ linkin }) {
    const posts = getBlogPosts();
    return (
        <>
{posts
.filter((post) => post.slug === linkin)
.map((post) => (
    <Link key={post.slug} 
    href={`/blog/${post.slug}`}
    className="flex flex-col not-prose">
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
}


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
            <DrawingPinFilledIcon/>
            </span>
        </span>
        <div className='p-8'>
        {children}{' '}
        </div>
        <div className='flex bg-neutral-900 text-zinc-200 py-2 px-8 border-t border-zinc-700'>
        <a href={href} target='_blank' >
            <Link2Icon className='inline mr-1'/>{source}
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
    
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-12">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
    
</div>
<div className="">{props.children}</div>
</div>
    )
}

function Errorpop(props) {
    return (
        <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <div className="flex items-center justify-center w-12 bg-rose-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
<path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
<path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
<path fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

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
        className="flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200 "
        type="button">
        {text}
<DownloadIcon/>

      </button>
      </Link>
    )
}
function BtnSource({ href, text}) {
    return (
        <Link href={href} target='_blank'>
        <button
        className="flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
        type="button">
        {text}
<CodeIcon/>
    </button>
    </Link>
    )
}
function BtnPreview({ href, text }) {
    return (
        <Link href={href} target='_blank'>
        <button
        className="flex items-center gap-x-2 bg-white/5 text-white-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
        type="button">  
        {text}
<RocketIcon/>
    </button>
    </Link>
    )
}
function BtnArea(props) {
    return (
        <div className=''>
    <div className='justify-center border border-zinc-700 rounded flex flex-rows gap-2 p-4 mb-2 mt-4'>
        {props.children}
    </div>
    </div>
    )
}

function Code({ children, ...props }) {
    let codeHTML = highlight(children)
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
    const Heading = ({ children }) => {
        let slug = slugify(children)
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
        )
    }

    Heading.displayName = `Heading${level}`

    return Heading
}

let components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    Penting,Imgfull,ImgLg,
    Kutiptengah,
    Kutipkiri,Relatepost,
    Kutipkanan,
    Linkext,ComArt,
    FN,Error,StabiloBiru,
    Footarea,Cbox,
    FNlist,BtnArea,BtnDownload,BtnPreview,BtnSource,
    Marker,Errorpop,
    code: Code,
    Table,
}

export function CustomMDX(props) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
        />
    )
}
