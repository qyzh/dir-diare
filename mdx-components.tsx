import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

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
    <h1 className="font-medium pt-12 mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
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
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
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
        <tr>
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
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  Callout: ({ type = 'info', children, ...props }: CalloutProps) => {
    const styles = {
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'text-yellow-700 dark:text-yellow-300',
        border: 'border-yellow-200 dark:border-yellow-800',
        hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-300',
        border: 'border-red-200 dark:border-red-800',
        hover: 'hover:bg-red-100 dark:hover:bg-red-900/30'
      },
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800',
        hover: 'hover:bg-green-100 dark:hover:bg-green-900/30'
      },
      important: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
      }
    };
    
    return (
      <div 
        className={`${styles[type].bg} ${styles[type].text} ${styles[type].border} ${styles[type].hover} my-2 border font-mono text-sm transition-colors duration-200`} 
        {...props}
      >
        <div className="relative">
          <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 ${styles[type].border}`}></div>
          <div className={`absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 ${styles[type].border}`}></div>
          <div className="p-4">
            {children}
          </div>
          <div className={`absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 ${styles[type].border}`}></div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 ${styles[type].border}`}></div>
        </div>
      </div>
    );
  },
  Button: ({ 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    children, 
    ...props 
  }: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    };
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
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