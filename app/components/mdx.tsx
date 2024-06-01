import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

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

function FN(props) {
    return (
        <a href={props.href} aria-describedby="footnote-label" id={props.id}>
            {props.children}
        </a>
    )
}
function Footarea(props) {
    return (
        <div className="footnote rounded-lg border border-dashed p-4 lg:p-9 border-gray-700 font-mono my-2 py-4">
            <h2 id="footnote-label" className="hidden invisible">
                Footnotes :{' '}
            </h2>
            <ol>{props.children}</ol>
        </div>
    )
}
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
    
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-12">
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
        <div className="flex items-center justify-center w-12" style={{}}>
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
            </svg>
        </div>
    
        <div className="px-4 -mx-3">
            <div className="mx-3">
                <div className="font-semibold text-red-500 dark:text-red-400">{props.title}</div>
                <div className="not-prose text-sm text-gray-600 dark:text-gray-200">
                    {props.children}
                </div>
            </div>
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
    Penting,
    Kutiptengah,
    Kutipkiri,
    Kutipkanan,
    Linkext,
    FN,Error,
    Footarea,
    FNlist,
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
