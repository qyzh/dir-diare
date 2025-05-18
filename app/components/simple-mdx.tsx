'use client';

import React, { useMemo } from 'react'
import { highlight } from 'sugar-high'

const slugify = (str: string): string => {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

interface SimpleMDXProps {
    content: string;
}

export function SimpleMDX({ content }: SimpleMDXProps) {

    // Helper function to get icon HTML
    const getIconHtml = (iconName: string): string => {
        switch(iconName) {
            case 'github':
                return '<svg class="inline w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>';
            case 'link':
                return '<svg class="inline w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
            case 'download':
                return '<svg class="inline w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
            default:
                return '';
        }
    };

    const renderContent = useMemo(() => {
        let processedContent = content;

        // Headers with anchor links
        processedContent = processedContent
            .replace(/^# (.*)/gm, (_, text) => {
                const slug = slugify(text);
                return `<h1 id="${slug}" class="mt-8 mb-4 text-3xl font-bold"><a href="#${slug}" class="anchor"></a>${text}</h1>`;
            })
            .replace(/^## (.*)/gm, (_, text) => {
                const slug = slugify(text);
                return `<h2 id="${slug}" class="mt-6 mb-3 text-2xl font-bold"><a href="#${slug}" class="anchor"></a>${text}</h2>`;
            })
            .replace(/^### (.*)/gm, (_, text) => {
                const slug = slugify(text);
                return `<h3 id="${slug}" class="mt-5 mb-2 text-xl font-bold"><a href="#${slug}" class="anchor"></a>${text}</h3>`;
            })
            .replace(/^#### (.*)/gm, (_, text) => {
                const slug = slugify(text);
                return `<h4 id="${slug}" class="mt-4 mb-2 text-lg font-bold"><a href="#${slug}" class="anchor"></a>${text}</h4>`;
            })
            .replace(/^##### (.*)/gm, (_, text) => {
                const slug = slugify(text);
                return `<h5 id="${slug}" class="mt-3 mb-1 text-base font-bold"><a href="#${slug}" class="anchor"></a>${text}</h5>`;
            })
            .replace(/^###### (.*)/gm, (_, text) => {
                const slug = slugify(text);
                return `<h6 id="${slug}" class="mt-3 mb-1 text-sm font-bold"><a href="#${slug}" class="anchor"></a>${text}</h6>`;
            });

        // Text formatting
        processedContent = processedContent
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/~~(.*?)~~/g, '<del class="line-through text-gray-500 dark:text-gray-400">$1</del>');

        // Code blocks with syntax highlighting
        processedContent = processedContent
            .replace(/```([\s\S]*?)```/g, (_, codeContent) => {
                const highlighted = highlight(codeContent);
                return `<pre class="p-4 bg-neutral-800 rounded-md overflow-x-auto"><code>${highlighted}</code></pre>`;
            })
            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-neutral-800 rounded text-sm">$1</code>');

        // Links
        processedContent = processedContent
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
                if (url.startsWith('/')) {
                    return `<a href="${url}" class="text-sky-400 hover:text-sky-300 after:content-['_↗']">${text}</a>`;
                } else if (url.startsWith('#')) {
                    return `<a href="${url}" class="text-sky-400 hover:text-sky-300">${text}</a>`;
                } else {
                    return `<a href="${url}" class="text-sky-400 hover:text-sky-300 after:content-['_↗']" target="_blank" rel="noopener noreferrer">${text}</a>`;
                }
            });

        // Custom links and buttons
        processedContent = processedContent
            .replace(/\[\[(.*?)\]\]\((.*?)\)/g, (_, text, url) => {
                // Check if it's a button style link
                if (text.startsWith('btn:')) {
                    const buttonText = text.replace('btn:', '').trim();
                    const buttonSize = url.includes('#size=') ? url.match(/#size=(\w+)/)[1] : 'md';
                    const buttonColor = url.includes('#color=') ? url.match(/#color=(\w+)/)[1] : 'blue';
                    const actualUrl = url.replace(/#size=\w+/, '').replace(/#color=\w+/, '');

                    // Apply different button styles based on size and color
                    let sizeClasses = 'px-4 py-2 text-sm'; // default medium
                    if (buttonSize === 'sm') sizeClasses = 'px-3 py-1 text-xs';
                    if (buttonSize === 'lg') sizeClasses = 'px-6 py-3 text-base';

                    let colorClasses = 'bg-blue-600 hover:bg-blue-700 text-white'; // default blue
                    if (buttonColor === 'green') colorClasses = 'bg-green-600 hover:bg-green-700 text-white';
                    if (buttonColor === 'red') colorClasses = 'bg-red-600 hover:bg-red-700 text-white';
                    if (buttonColor === 'gray') colorClasses = 'bg-gray-600 hover:bg-gray-700 text-white';
                    if (buttonColor === 'outline') colorClasses = 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30';

                    return `<a href="${actualUrl}" class="inline-block ${sizeClasses} ${colorClasses} rounded-md font-medium text-center transition-colors no-underline my-2">${buttonText}</a>`;
                }

                // Custom link styles with optional icon
                const hasIcon = text.includes('#icon=');
                const icon = hasIcon ? text.match(/#icon=(\w+)/)[1] : '';
                const linkText = hasIcon ? text.replace(/#icon=\w+/, '').trim() : text.trim();
                const linkClass = url.includes('#style=') ? url.match(/#style=(\w+)/)[1] : 'default';
                const actualUrl = url.replace(/#style=\w+/, '');

                let linkClasses = 'text-sky-400 hover:text-sky-300'; // default
                if (linkClass === 'underline') linkClasses = 'text-sky-400 hover:text-sky-300 underline';
                if (linkClass === 'bold') linkClasses = 'text-sky-400 hover:text-sky-300 font-bold';
                if (linkClass === 'fancy') linkClasses = 'text-purple-500 hover:text-purple-400 font-medium border-b border-purple-500 pb-1 transition-all hover:border-purple-400';

                // Add icon if specified
                const iconHtml = icon ? getIconHtml(icon) : '';
                return `<a href="${actualUrl}" class="${linkClasses}">${iconHtml}${linkText}</a>`;
            });

        // Blockquotes - Different styles similar to your Kutiptengah, Kutipkiri components
        processedContent = processedContent
            .replace(/^> (.*)\n> -- (.*)/gm,
                '<blockquote class="text-xl italic font-semibold text-center mb-4 text-gray-900 dark:text-white">$1 <cite class="text-xs font-normal">- $2</cite></blockquote>')
            .replace(/^> (.*)/gm,
                '<blockquote class="border-l-4 pl-4 border-neutral-200 dark:border-neutral-700 italic p-2 my-4">$1</blockquote>');

        // Lists
        processedContent = processedContent
            .replace(/^- (.*)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n)+/g, '<ul class="list-disc pl-5 space-y-2 my-4">$&</ul>')
            .replace(/^(\d+)\. (.*)/gm, '<li>$2</li>')
            .replace(/(<li>.*<\/li>\n)+/g, (match) => {
                if (!match.includes('<ul')) {
                    return `<ol class="list-decimal pl-5 space-y-2 my-4">${match}</ol>`;
                }
                return match;
            });

        // Images
        processedContent = processedContent
            .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, (_, alt, src) => {
                return `<div class="my-6"><Image class="rounded-lg w-full object-cover" alt="${alt}" src="${src}" /></div>`;
            });

        // Horizontal rule
        processedContent = processedContent
            .replace(/^---$/gm, '<hr class="border-t border-zinc-700 my-8" />');

        // Callouts - Similar to your Penting, Error, Errorpop components
        processedContent = processedContent
            .replace(/:::(note|warning|tip|error|important) ([\s\S]*?):::/g, (_, type, content) => {
                switch(type) {
                    case 'error':
                        return `<div class="px-4 py-3 border border-rose-600 bg-rose-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-4 mr-4">⚠️</div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                    case 'warning':
                        return `<div class="flex w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800 mb-8">
                            <div class="flex items-center justify-center w-12 bg-yellow-500">
                                ⚠️
                            </div>
                            <div class="px-4 -mx-3">
                                <div class="mx-3">
                                    <div class="font-semibold text-yellow-500 dark:text-yellow-400 pt-2">WARNING</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-200">
                                        ${content.trim()}
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    case 'tip':
                        return `<div class="px-4 py-3 border border-emerald-600 bg-emerald-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-4 mr-4">💡</div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                    case 'important':
                        return `<div class="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
                            <div class="flex items-center w-4 mr-4">🔔</div>
                            <div class="w-full callout">${content.trim()}</div>
                        </div>`;
                    default: // note
                        return `<div class="px-4 py-3 border border-blue-600 bg-blue-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-4 mr-4">ℹ️</div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                }
            });

        // Custom highlighted text similar to StabiloBiru, Marker components
        processedContent = processedContent
            .replace(/==(.*?)==/g, '<span class="font-semibold italic text-emerald-900 bg-emerald-500 hover:bg-emerald-300 ">$1</span>')
            .replace(/\^\^(.*?)\^\^/g, '<mark class="transition bg-rose-300 text-rose-900 hover:bg-rose-600 hover:text-zinc-300">$1</mark>');

        // Tables
        processedContent = processedContent
            .replace(/\|(.+)\|\n\|( *:?-+:? *\|)+ *\n((.*\|.+\|\n)+)/g, (match) => {
                const lines = match.trim().split('\n');
                const headers = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
                const alignments = lines[1].split('|').filter(cell => cell.trim() !== '');
                const rows = lines.slice(2).map(line =>
                    line.split('|').filter(cell => cell !== '').map(cell => cell.trim())
                );

                let tableHtml = '<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-neutral-700">\n<thead class="bg-neutral-800">\n<tr>\n';

                // Table headers
                headers.forEach((header, i) => {
                    const align = alignments[i] && alignments[i].includes(':') ?
                        alignments[i].startsWith(':') && alignments[i].endsWith(':') ? 'center' :
                        alignments[i].endsWith(':') ? 'right' : 'left'
                        : 'left';

                    tableHtml += `<th scope="col" class="px-6 py-3 text-${align} text-xs font-medium text-neutral-300 uppercase tracking-wider">${header}</th>\n`;
                });

                tableHtml += '</tr>\n</thead>\n<tbody class="divide-y divide-neutral-700">\n';

                // Table rows
                rows.forEach((row, rowIndex) => {
                    tableHtml += `<tr class="${rowIndex % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-800'}">\n`;

                    row.forEach((cell, cellIndex) => {
                        const align = alignments[cellIndex] && alignments[cellIndex].includes(':') ?
                            alignments[cellIndex].startsWith(':') && alignments[cellIndex].endsWith(':') ? 'center' :
                            alignments[cellIndex].endsWith(':') ? 'right' : 'left'
                            : 'left';

                        tableHtml += `<td class="px-6 py-4 whitespace-nowrap text-sm text-${align} text-neutral-200">${cell}</td>\n`;
                    });

                    tableHtml += '</tr>\n';
                });

                tableHtml += '</tbody>\n</table></div>';

                return tableHtml;
            });


        return processedContent;
    }, [content]);

    return (
        <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderContent }} />

        </div>
    );
}
