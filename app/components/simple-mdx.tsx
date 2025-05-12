'use client';

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

interface ImageProps {
    src: string;
    alt: string;
    caption?: string;
}

export function RoundedImage({ alt, src }: ImageProps) {
    return <Image className="rounded-lg" alt={alt} src={src} width={720} height={480} />
}

interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
}

export function CustomLink({ href, children, ...props }: CustomLinkProps) {
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
            >
                {children}
            </a>
        )
    }

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 after:content-['_↗']"
            href={href}
            {...props}
        >
            {children}
        </a>
    )
}

interface SimpleMDXProps {
    content: string;
}

export function SimpleMDX({ content }: SimpleMDXProps) {
    // Very basic rendering of markdown content as HTML
    // For a production app, you'd want a proper Markdown parser
    const html = content
        .replace(/^# (.*)/gm, '<h1>$1</h1>')
        .replace(/^## (.*)/gm, '<h2>$1</h2>')
        .replace(/^### (.*)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*)/gm, '<h4>$1</h4>')
        .replace(/^##### (.*)/gm, '<h5>$1</h5>')
        .replace(/^###### (.*)/gm, '<h6>$1</h6>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-sky-400 hover:text-sky-300" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^> (.*)/gm, '<blockquote>$1</blockquote>')
        .replace(/^- (.*)/gm, '<li>$1</li>')
        .replace(/\n\n/g, '<br/><br/>');

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
