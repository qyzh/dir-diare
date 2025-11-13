import React, { ComponentPropsWithoutRef, useMemo } from 'react'
import Link from 'next/link'
import { highlight } from 'sugar-high'
import UKCallout from 'app/components/ukcallout'
import UKButton from 'app/components/ukbtn'
import UKTagUser from 'app/components/uktaguser'
import UKImage from 'app/components/ukimage'

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
type ImageProps = ComponentPropsWithoutRef<'img'> & {
    alt?: string
    model?: 'blueprint' | 'wsketch' | 'oldsketch'
    size?: 'small' | 'medium' | 'large' | 'hero' | 'thumbnail'
    className?: string
}

// Helper function to render images - avoids code duplication
const renderImage = ({
    src,
    alt,
    model,
    size,
    className,
    ...props
}: ImageProps) =>
    typeof src === 'string' ? (
        <UKImage
            alt={alt}
            model={model}
            size={size}
            className={className}
            src={src}
            {...props}
        />
    ) : null

const components = {
    h1: (props: HeadingProps) => (
        <h1
            className="text-3xl md:text-4xl font-bold dark:text-white/90 dark:hover:text-white pt-8 mb-4"
            {...props}
        />
    ),
    h2: (props: HeadingProps) => (
        <h2
            className="text-2xl md:text-3xl text-gray-800 dark:text-white/85 dark:hover:text-white/95 font-medium mt-8 mb-3"
            {...props}
        />
    ),
    h3: (props: HeadingProps) => (
        <h3
            className="text-xl md:text-2xl text-gray-800 dark:text-white/85 dark:hover:text-white/90 font-medium mt-8 mb-3"
            {...props}
        />
    ),
    h4: (props: HeadingProps) => (
        <h4
            className="text-lg md:text-xl font-medium text-neutral-100"
            {...props}
        />
    ),
    p: (props: ParagraphProps) => (
        <p
            className="text-base md:text-lg text-gray-800 dark:text-neutral-300/70 leading-relaxed my-4"
            {...props}
        />
    ),
    ol: (props: ListProps) => (
        <ol
            className="text-base md:text-lg text-gray-800 dark:text-neutral-300/70 list-decimal pl-5 space-y-2"
            {...props}
        />
    ),
    ul: (props: ListProps) => (
        <ul
            className="text-base md:text-lg text-gray-800 dark:text-neutral-300/70 list-disc pl-5 space-y-1"
            {...props}
        />
    ),
    li: (props: ListItemProps) => <li className="pl-1" {...props} />,
    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em className="font-medium" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong className="font-medium" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        if (href?.startsWith('/')) {
            return (
                <Link
                    href={href}
                    className="text-emerald-500 hover:text-emerald-300 transition-colors duration-200"
                    {...props}
                >
                    {children}
                </Link>
            )
        }
        if (href?.startsWith('#')) {
            return (
                <a
                    href={href}
                    className="transition-colors duration-200"
                    {...props}
                >
                    {children}
                </a>
            )
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-300 hover:underline transition-colors duration-200"
                {...props}
            >
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
                className="px-1.5 py-0.5 rounded-md bg-[#FAFAFA] dark:bg-[#0B132B] text-sm font-mono"
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        )
    },
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
        <table className="table-auto text-md border-collapse border border-neutral-200 dark:border-neutral-600 my-4 w-full">
            <thead>
                <tr className="">
                    {data.headers.map((header, index) => (
                        <th
                            className="p-2 border bg-neutral-200 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800"
                            key={index}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, cellIndex) => (
                            <td
                                className="p-2 border border-neutral-200  dark:border-neutral-800"
                                key={cellIndex}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ),
    blockquote: ({ model = 'default', ...props }: BlockquoteProps) => {
        const models = {
            default:
                'ml-2 pl-4 border-l-4 border-neutral-400 hover:border-neutral-800 dark:hover:border-neutral-200 transition-all duration-300',
            minimal:
                'text-center italic border-emerald-400 font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all duration-300',
            accent: 'ml-2 pl-6 pr-4 py-3 border-l-4 border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-r-lg',
            bordered:
                'p-4 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 shadow-sm',
        }
        return <blockquote className={models[model]} {...props} />
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
        <UKButton
            variant={variant}
            size={size}
            className={className}
            onClick={onClick}
            {...props}
        >
            {children}
        </UKButton>
    ),
    mark: ({ color = 'yellow', ...props }: MarkProps) => {
        const colors = {
            green: 'bg-teal-200 dark:bg-emerald-400',
            yellow: 'bg-yellow-200 dark:bg-amber-400',
            red: 'bg-red-200 dark:bg-rose-400',
        }
        return <mark className={`${colors[color]} px-1`} {...props} />
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
