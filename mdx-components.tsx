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

// Helper function to render images with an attractive notebook polaroid aesthetic
const AttractiveImage = ({ src, alt, ...props }: ImageProps) =>
    typeof src === 'string' ? (
        <figure className="my-10 mx-auto max-w-full group relative z-0">
            <div className="relative p-3 sm:p-4 bg-[#fdfbf7] dark:bg-[#171410] shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-[#e5e0d8] dark:border-[#2a2620] -rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:z-10">
                {/* Washi tape effect */}
                <div className="absolute -top-3.5 left-1/2 w-24 h-7 -ml-12 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/5 -rotate-2 shadow-sm z-10 opacity-90" />
                <div className="overflow-hidden border border-[#e5e0d8] dark:border-[#2a2620] bg-[var(--line)] rounded-[2px]">
                    <img 
                        src={src} 
                        alt={alt || ''} 
                        className="w-full h-auto object-cover filter sepia-[20%] grayscale-[10%] transition-all duration-700 group-hover:sepia-0 group-hover:grayscale-0" 
                        loading="lazy" 
                        {...(props as any)}
                    />
                </div>
                {alt && (
                    <figcaption className="mt-4 mb-1 text-center font-serif text-[0.85rem] text-[var(--text-dim)] italic tracking-wide">
                        {alt}
                    </figcaption>
                )}
            </div>
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
            alignItems: 'center',
            textAlign: 'center'
        }
        
        const styles: Record<string, React.CSSProperties> = {
            default: { ...baseStyle, margin: '1.5rem auto', padding: '1rem', borderLeft: '2px solid var(--line)', borderRight: '2px solid var(--line)', color: 'var(--text-dim)', fontStyle: 'italic' },
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
            green:  { background: 'rgba(52,211,153,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
            yellow: { background: 'rgba(251,191,36,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
            red:    { background: 'rgba(248,113,113,0.2)', color: 'var(--text-bright)', padding: '0 0.25em' },
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
