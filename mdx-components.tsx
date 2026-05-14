import React, { ComponentPropsWithoutRef, useMemo } from 'react'
import Link from 'next/link'
import { highlight } from 'sugar-high'
import UKCallout from '@/components/ui/ukcallout'
import UKButton from '@/components/ui/ukbtn'
import UKTagUser from '@/components/ui/uktaguser'
import UKImage from '@/components/ui/ukimage'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'> & {
    model?: 'default' | 'minimal' | 'accent' | 'bordered'
}
type TagUserProps = {
    children: React.ReactNode
    link?: string
    className?: string
}
type MarkProps = ComponentPropsWithoutRef<'mark'> & {
    color?: 'green' | 'yellow' | 'red'
}
type CalloutProps = ComponentPropsWithoutRef<'div'> & {
    type?: 'info' | 'warning' | 'error' | 'success' | 'important'
}
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
}
type ImageProps = {
    src?: string
    alt?: string
    model?: 'blueprint' | 'wsketch' | 'oldsketch' | 'blackboard'
    size?: 'small' | 'medium' | 'large' | 'hero' | 'thumbnail'
    className?: string
    width?: number
    height?: number
    priority?: boolean
    quality?: number
}

function normalizeImageSrc(src: string): string {
    const trimmed = src.trim()
    if (!trimmed) {
        return trimmed
    }

    if (trimmed.startsWith('api/images/')) {
        return `/${trimmed}`
    }

    if (trimmed.startsWith('images/')) {
        return `/${trimmed}`
    }

    const canBeLocalUpload =
        trimmed.startsWith('/api/images/') ||
        trimmed.includes('/api/images/')

    if (!canBeLocalUpload) {
        return trimmed
    }

    try {
        const parsed = new URL(trimmed)
        const isLocalhost =
            parsed.hostname === 'localhost' ||
            parsed.hostname === '127.0.0.1'

        if (isLocalhost && parsed.pathname.startsWith('/api/images/')) {
            return `${parsed.pathname}${parsed.search}${parsed.hash}`
        }
    } catch {
        // Keep original src when URL parsing fails (likely already a relative path)
    }

    return trimmed
}

const AttractiveImage = ({ src, alt, ...props }: ImageProps) =>
    typeof src === 'string' ? (
        <figure className="my-8 mx-auto max-w-full">
            <div className="border border-[var(--line)] p-2 rounded-md">
                <img
                    src={normalizeImageSrc(src)}
                    alt={alt || ''}
                    className="w-full h-auto object-cover rounded-sm"
                    loading="lazy"
                    {...(props as any)}
                />
            </div>
            {alt && (
                <figcaption className="mt-2 text-center text-sm text-[var(--text-dim)] italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    ) : null

const components = {
    h1: (props: HeadingProps) => (
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--text-bright)', lineHeight: 1.2, margin: '2.5em 0 0.75em' }} {...props} />
    ),
    h2: (props: HeadingProps) => <h2 {...props} />,
    h3: (props: HeadingProps) => <h3 {...props} />,
    h4: (props: HeadingProps) => (
        <h4 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)', margin: '1.5em 0 0.5em' }} {...props} />
    ),
    p: ({ children, ...props }: ParagraphProps) => {
        const hasBlock = React.Children.toArray(children).some(
            (child) => React.isValidElement(child) && (child.type === AttractiveImage || child.type === 'figure' || child.type === 'div')
        );
        return hasBlock ? <div {...props}>{children}</div> : <p {...props}>{children}</p>;
    },
    ol: (props: ListProps) => (
        <ol style={{ color: 'var(--text-main)', paddingLeft: '1.25rem', marginBottom: '1.5em' }} {...props} />
    ),
    ul: (props: ListProps) => (
        <ul style={{ color: 'var(--text-main)', paddingLeft: '1.25rem', marginBottom: '1.5em' }} {...props} />
    ),
    li: (props: ListItemProps) => (
        <li style={{ color: 'var(--text-main)', marginBottom: '0.375em' }} {...props} />
    ),
    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em style={{ fontFamily: 'var(--font-fell)', fontStyle: 'italic', color: 'var(--text-mid)' }} {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong style={{ color: 'var(--text-bright)', fontWeight: 500 }} {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        if (href?.startsWith('/')) {
            return (
                <Link href={href} {...props}>
                    {children}
                </Link>
            )
        }
        if (href?.startsWith('#')) {
            return <a href={href} {...props}>{children}</a>
        }
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        )
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const codeHTML = useMemo(
            () => highlight(children as string),
            [children]
        )
        return (
            <code
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.875em', background: 'var(--bg-card)', border: '1px solid var(--line)', padding: '0.1em 0.4em', color: 'var(--text-mid)' }}
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        )
    },
    pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
        <pre style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '0.5rem', padding: '1rem', overflowX: 'auto', margin: '1.5em 0', fontSize: '0.875rem' }} {...props}>
            {children}
        </pre>
    ),
    table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
        <div style={{ overflowX: 'auto', margin: '1.5em 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', border: '1px solid var(--line)' }} {...props}>
                {children}
            </table>
        </div>
    ),
    th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
        <th style={{ padding: '0.6rem 0.75rem', background: 'var(--bg-card)', color: 'var(--text-mid)', fontWeight: 500, borderBottom: '1px solid var(--line)', textAlign: 'left' }} {...props}>
            {children}
        </th>
    ),
    td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
        <td style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', borderBottom: '1px solid var(--line)' }} {...props}>
            {children}
        </td>
    ),
    tr: ({ children, ...props }: ComponentPropsWithoutRef<'tr'>) => (
        <tr style={{ borderBottom: '1px solid var(--line)' }} {...props}>
            {children}
        </tr>
    ),
    blockquote: ({ model = 'default', ...props }: BlockquoteProps) => {
        const baseStyle: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            textAlign: 'left'
        }

        const styles: Record<string, React.CSSProperties> = {
            default: { ...baseStyle, margin: '1.5rem auto', padding: '1rem', borderLeft: '2px solid var(--line)', color: 'var(--text-dim)', fontStyle: 'italic' },
            minimal: { ...baseStyle, margin: '1.5rem auto', fontStyle: 'italic', color: 'var(--text-dim)' },
            accent: { ...baseStyle, margin: '1.5rem auto', padding: '1.5rem', border: '1px solid var(--line)', borderTop: '2px solid var(--text-mid)', background: 'var(--bg-card)', color: 'var(--text-main)' },
            bordered: { ...baseStyle, margin: '1.5rem auto', padding: '1.5rem', border: '1px solid var(--line)', background: 'var(--bg-card)', color: 'var(--text-main)', borderRadius: '4px' },
        }
        return <blockquote style={styles[model]} {...props} />
    },
    Callout: ({ type = 'info', children, ...props }: CalloutProps) => (
        <UKCallout type={type} {...props}>
            {children}
        </UKCallout>
    ),
    Button: ({
        variant = 'primary',
        size = 'md',
        className = '',
        children,
        onClick,
        ...props
    }: ButtonProps) => (
        <UKButton variant={variant} size={size} className={className} onClick={onClick} {...props}>
            {children}
        </UKButton>
    ),
    mark: ({ color = 'yellow', ...props }: MarkProps) => {
        const colors: Record<string, React.CSSProperties> = {
            green: { background: 'rgba(52,211,153,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
            yellow: { background: 'rgba(251,191,36,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
            red: { background: 'rgba(248,113,113,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
        }
        return <mark style={colors[color]} {...props} />
    },
    TagUser: ({ children, ...props }: TagUserProps) => (
        <UKTagUser {...props}>{children}</UKTagUser>
    ),
    img: AttractiveImage,
    Image: AttractiveImage,
}

declare global {
    type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
