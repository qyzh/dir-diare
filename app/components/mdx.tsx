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
      <Link className="text-sky-400 after:content-['_↗']" href={href} {...props}>
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
  href={props.href}>{props.text}
      </Link>
  )
}

function FN(props) {
  return (
<a 
href={props.href}
aria-describedby="footnote-label" 
id={props.id}>{props.children}
</a> 
  )
}
function Footarea(props) {
  return (
    <div className='footnote font-mono my-2 py-4'>
    <h2 id="footnote-label" className='hidden invisible'>Footnotes : </h2>
    <ol>{props.children}
    </ol>
  </div>
  )
}
function FNlist(props) {
  return (
    <li 
    id={props.id}
    >{props.children} 
    <a 
    aria-label="Back to content">
      ↩
    </a>
    </li>
  )
}
function Penting(props) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}
function Kutiptengah(props) {
  return (
<blockquote className="text-xl italic font-semibold text-center mb-4 text-gray-900 dark:text-white">
  {props.children} 
  </blockquote>
  );
}

function Kutipkiri(props) {
  return (
<blockquote className="text-xl italic font-semibold text-left mb-4  text-gray-900 dark:text-white">
  {props.children}
  </blockquote>
  );
}

function Kutipkanan(props) {
  return (
<blockquote className="text-xl italic font-semibold text-right mb-4  text-gray-900 dark:text-white">
  {props.children} 
  </blockquote>
  );
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
  a: CustomLink,Penting,Kutiptengah,Kutipkiri,
  Kutipkanan,Linkext,FN,Footarea,FNlist,
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
