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

// Helper function to render images - avoids code duplication
const renderImage = ({
    src,
    alt,
    model,
    size,
    className,
    width,
    height,
    priority,
    quality,
}: ImageProps) =>
    typeof src === 'string' ? (
        <UKImage
            alt={alt}
            model={model}
            size={size}
            className={className}
            src={src}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
        />
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
    p: (props: ParagraphProps) => <p {...props} />,
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
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5em 0', border: '1px solid var(--line)' }}>
            <thead>
                <tr>
                    {data.headers.map((header, index) => (
                        <th key={index} style={{ padding: '0.6rem 0.75rem', background: 'var(--bg-card)', color: 'var(--text-mid)', fontWeight: 500, borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', borderBottom: '1px solid var(--line)' }}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ),
    blockquote: ({ model = 'default', ...props }: BlockquoteProps) => {
        const styles: Record<string, React.CSSProperties> = {
            default: { marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--line)', color: 'var(--text-dim)', fontStyle: 'italic' },
            minimal: { textAlign: 'center', fontStyle: 'italic', color: 'var(--text-dim)' },
            accent: { marginLeft: '0.5rem', padding: '0.75rem 1rem 0.75rem 1.5rem', borderLeft: '2px solid var(--text-mid)', background: 'var(--bg-card)', color: 'var(--text-main)' },
            bordered: { padding: '1rem', border: '1px solid var(--line)', background: 'var(--bg-card)', color: 'var(--text-main)' },
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
            green:  { background: 'rgba(52,211,153,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
            yellow: { background: 'rgba(251,191,36,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
            red:    { background: 'rgba(248,113,113,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
        }
        return <mark style={colors[color]} {...props} />
    },
    TagUser: ({ children, ...props }: TagUserProps) => (
        <UKTagUser {...props}>{children}</UKTagUser>
    ),
    img: ({ src, ...props }: ImageProps) =>
        typeof src === 'string' ? <UKImage src={src} {...props} /> : null,
    Image: ({ src, ...props }: ImageProps) =>
        typeof src === 'string' ? <UKImage src={src} {...props} /> : null,
}

declare global {
    type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
