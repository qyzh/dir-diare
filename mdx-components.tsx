import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';
import UKCallout from 'app/components/ukcallout';
import UKButton from 'app/components/ukbtn';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type MarkProps = ComponentPropsWithoutRef<'mark'> & {
  color?: 'green' | 'yellow' | 'red';
};
type CalloutProps = ComponentPropsWithoutRef<'div'> & {
  type?: 'info' | 'warning' | 'error' | 'success' | 'important';
};
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-2xl font-bold dark:text-white/90 dark:hover:text-white pt-8 mb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-xl text-gray-800 dark:text-white/85 dark:hover:text-white/95 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-lg text-gray-800 dark:text-white/85 dark:hover:dark:text-white/90 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium text-neutral-100" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-neutral-300/70 leading-snug my-4" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-neutral-300/70 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-neutral-300/70 list-disc pl-5 space-y-1"
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
        <Link href={href} className="text-emerald-500 hover:text-emerald-300 transition-colors duration-200" {...props}>
          {children}
        </Link>
      );
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
      );
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
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr className="bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200">
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-neutral-600 dark:text-neutral-300"
      {...props}
    />
  ),
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
      onClick={onClick ? () => onClick({} as any) : undefined} 
      {...props}
    >
      {children}
    </UKButton>
  ),
  mark: ({ color = 'yellow', ...props }: MarkProps) => {
    const colors = {
      green: 'bg-teal-200 dark:bg-teal-800/50',
      yellow: 'bg-yellow-200 dark:bg-yellow-800/50',
      red: 'bg-red-200 dark:bg-red-800/50'
    };
    return <mark className={`${colors[color]} px-1`} {...props} />;
  },
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}