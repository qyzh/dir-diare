'use client';

import React, { useMemo, useEffect, useState } from 'react'
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                return `<pre class="p-4 my-2 rounded-md overflow-x-auto"><code>${highlighted}</code></pre>`;
            })
            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-neutral-800 text-neutral-300 rounded text-sm">$1</code>');

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
                    const buttonColor = url.includes('#color=') ? url.match(/#color=(\w+)/)[1] : 'teal';
                    const actualUrl = url.replace(/#size=\w+/, '').replace(/#color=\w+/, '');

                    // Apply different button styles based on size and color
                    let sizeClasses = 'px-4 py-2 text-sm'; // default medium
                    if (buttonSize === 'sm') sizeClasses = 'px-3 py-1 text-xs';
                    if (buttonSize === 'lg') sizeClasses = 'px-6 py-3 text-base';

                    let colorClasses = 'bg-teal-600 hover:bg-teal-700 text-white'; // default teal
                    if (buttonColor === 'green') colorClasses = 'bg-green-600 hover:bg-green-700 text-white';
                    if (buttonColor === 'red') colorClasses = 'bg-red-600 hover:bg-red-700 text-white';
                    if (buttonColor === 'gray') colorClasses = 'bg-gray-600 hover:bg-gray-700 text-white';
                    if (buttonColor === 'outline') colorClasses = 'bg-transparent border border-teal-600 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/30';

                    return `<a href="${actualUrl}" target='_blank' class="inline-block ${sizeClasses} ${colorClasses} rounded-md font-medium text-center transition-colors no-underline my-2">${buttonText}</a>`;
                }

                // Custom link styles with optional icon
                const hasIcon = text.includes('#icon=');
                const icon = hasIcon ? text.match(/#icon=(\w+)/)[1] : '';
                const linkText = hasIcon ? text.replace(/#icon=\w+/, '').trim() : text.trim();
                const linkClass = url.includes('#style=') ? url.match(/#style=(\w+)/)[1] : 'default';
                const actualUrl = url.replace(/#style=\w+/, '');

                let linkClasses = 'text-teal-400 hover:text-teal-300'; // default
                if (linkClass === 'underline') linkClasses = 'text-teal-400 hover:text-teal-300 underline';
                if (linkClass === 'bold') linkClasses = 'text-teal-400 hover:text-teal-300 font-bold';
                if (linkClass === 'fancy') linkClasses = 'text-purple-500 hover:text-purple-400 font-medium border-b border-purple-500 pb-1 transition-all hover:border-purple-400';

                // Add icon if specified
                const iconHtml = icon ? getIconHtml(icon) : '';
                return `<a href="${actualUrl}" class="${linkClasses}" target='_blank'>${iconHtml}${linkText}</a>`;
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
                            <div class="flex items-center w-10 mr-4">

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class='animate-pulse fill-red-500 ' width="64" height="64" viewBox="0 0 72 72">
<path d="M 36 12 C 22.745 12 12 22.745 12 36 C 12 49.255 22.745 60 36 60 C 49.255 60 60 49.255 60 36 C 60 22.745 49.255 12 36 12 z M 36 20 C 44.837 20 52 27.163 52 36 C 52 44.837 44.837 52 36 52 C 27.163 52 20 44.837 20 36 C 20 27.163 27.163 20 36 20 z M 36 25.71875 C 34.911 25.71875 34.037859 26.028437 33.380859 26.648438 C 32.723859 27.268437 32.432812 28.093953 32.507812 29.126953 L 32.900391 35.267578 C 33.013391 37.182578 34.055344 38.140625 36.027344 38.140625 C 37.961344 38.140625 38.986609 37.163938 39.099609 35.210938 L 39.492188 29.126953 C 39.567188 28.093953 39.282766 27.268438 38.634766 26.648438 C 37.986766 26.028437 37.108 25.71875 36 25.71875 z M 36.027344 40.099609 C 33.518344 40.099609 32.455078 41.564281 32.455078 43.113281 C 32.455078 44.662281 33.554344 46.126953 36.027344 46.126953 C 38.500344 46.126953 39.544922 44.584281 39.544922 43.113281 C 39.544922 41.641281 38.536344 40.099609 36.027344 40.099609 z"></path>
</svg>
    
                            </div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                    case 'warning':
                        return `<div class="px-4 py-3 border border-yellow-600 bg-yellow-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-10 mr-4">

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class='animate-pulse fill-amber-300' width="64" height="64" viewBox="0 0 72 72">
<path d="M 36 13.869141 C 32.747 13.869141 29.832078 15.551141 28.205078 18.369141 L 13.119141 44.5 C 11.492141 47.318 11.492141 50.683 13.119141 53.5 C 14.745141 56.318 17.658109 58 20.912109 58 L 51.087891 58 C 54.341891 58 57.254859 56.318 58.880859 53.5 C 60.507859 50.682 60.507859 47.317 58.880859 44.5 L 43.794922 18.369141 C 42.167922 15.551141 39.253 13.869141 36 13.869141 z M 36 21.869141 C 36.263 21.869141 36.626234 21.955141 36.865234 22.369141 L 51.953125 48.5 C 52.191125 48.913 52.085125 49.272 51.953125 49.5 C 51.821125 49.728 51.564891 50 51.087891 50 L 20.912109 50 C 20.435109 50 20.178875 49.728 20.046875 49.5 C 19.914875 49.272 19.808875 48.913 20.046875 48.5 L 35.134766 22.369141 C 35.373766 21.955141 35.737 21.869141 36 21.869141 z M 36 27.71875 C 34.911 27.71875 34.037859 28.028437 33.380859 28.648438 C 32.723859 29.268437 32.432812 30.093953 32.507812 31.126953 L 32.900391 37.267578 C 33.013391 39.182578 34.055344 40.140625 36.027344 40.140625 C 37.961344 40.140625 38.986609 39.163938 39.099609 37.210938 L 39.492188 31.126953 C 39.567188 30.093953 39.282766 29.268438 38.634766 28.648438 C 37.986766 28.028437 37.108 27.71875 36 27.71875 z M 36.027344 42.099609 C 33.518344 42.099609 32.455078 43.564281 32.455078 45.113281 C 32.455078 46.662281 33.554344 48.126953 36.027344 48.126953 C 38.500344 48.126953 39.544922 46.584281 39.544922 45.113281 C 39.544922 43.641281 38.536344 42.099609 36.027344 42.099609 z"></path>
</svg>
    
                            </div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                    case 'tip':
                        return `<div class="px-4 py-3 border border-sky-600 bg-sky-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-10 mr-4">

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class='fill-sky-500' width="64" height="64" viewBox="0 0 72 72">
<path d="M 36 10 C 25.523 10 17 18.523 17 29 C 17 36.274 20.468953 39.857609 23.001953 42.474609 C 25.080953 44.622609 26 45.67 26 48 C 26 50.209 27.791 52 30 52 L 42 52 C 44.209 52 46 50.209 46 48 C 46 45.67 46.919047 44.622609 48.998047 42.474609 C 51.531047 39.857609 55 36.274 55 29 C 55 18.523 46.477 10 36 10 z M 13 12 C 11.343 12 10 13.343 10 15 C 10 16.657 11.343 18 13 18 C 14.657 18 16 16.657 16 15 C 16 13.343 14.657 12 13 12 z M 59 12 C 57.343 12 56 13.343 56 15 C 56 16.657 57.343 18 59 18 C 60.657 18 62 16.657 62 15 C 62 13.343 60.657 12 59 12 z M 36 18 C 42.065 18 47 22.935 47 29 C 47 33.037 45.427 34.661156 43.25 36.910156 C 41.534 38.683156 39.509734 40.774 38.552734 44 L 33.445312 44 C 32.489313 40.775 30.466 38.683156 28.75 36.910156 C 26.573 34.661156 25 33.037 25 29 C 25 22.935 29.935 18 36 18 z M 8 28 C 6.343 28 5 29.343 5 31 C 5 32.657 6.343 34 8 34 C 9.657 34 11 32.657 11 31 C 11 29.343 9.657 28 8 28 z M 64 28 C 62.343 28 61 29.343 61 31 C 61 32.657 62.343 34 64 34 C 65.657 34 67 32.657 67 31 C 67 29.343 65.657 28 64 28 z M 13 44 C 11.343 44 10 45.343 10 47 C 10 48.657 11.343 50 13 50 C 14.657 50 16 48.657 16 47 C 16 45.343 14.657 44 13 44 z M 59 44 C 57.343 44 56 45.343 56 47 C 56 48.657 57.343 50 59 50 C 60.657 50 62 48.657 62 47 C 62 45.343 60.657 44 59 44 z M 32 54.5 C 30.343 54.5 29 55.843 29 57.5 C 29 59.157 30.343 60.5 32 60.5 L 32.125 60.5 C 32.904607 61.8393 34.338861 62.75 36 62.75 C 37.661139 62.75 39.095393 61.8393 39.875 60.5 L 40 60.5 C 41.657 60.5 43 59.157 43 57.5 C 43 55.843 41.657 54.5 40 54.5 L 32 54.5 z"></path>
</svg>
    
                            </div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                    case 'important':
                        return `<div class="px-4 py-3 border border-amber-600 bg-amber-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-10 mr-4">

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class='fill-amber-500' width="64" height="64" viewBox="0 0 72 72">
<path d="M 45.980469 8.5371094 C 43.522889 8.4284326 41.2025 9.467125 39.523438 11.148438 C 37.300929 13.373182 36.206996 16.725088 37.40625 20.029297 L 31.46875 26.726562 C 28.595136 26.491216 24.193183 26.61125 20.675781 28.892578 C 19.455781 29.684578 18.670437 30.941844 18.523438 32.339844 C 18.383437 33.670844 18.849734 34.979641 19.802734 35.931641 L 25.177734 41.306641 L 11.878906 55.878906 C 10.850906 57.012906 10.826906 58.774734 11.878906 59.927734 C 12.996906 61.152734 14.896094 61.239094 16.121094 60.121094 L 30.695312 46.824219 L 35.982422 52.111328 C 36.824422 52.953328 38.020172 53.531578 39.576172 53.392578 C 41.111172 53.255578 42.231437 52.461234 43.023438 51.240234 C 45.302095 47.727304 45.427522 43.330782 45.193359 40.457031 L 51.941406 34.585938 C 52.883211 34.924642 53.863058 35.106002 54.767578 35.056641 C 57.268578 35.091641 59.375813 34.075812 60.882812 32.507812 C 63.951813 29.315812 64.533672 23.835344 60.888672 20.277344 L 51.724609 11.111328 C 49.885797 9.4011406 47.89192 8.6216357 45.980469 8.5371094 z M 45.597656 16.558594 C 45.747281 16.560594 45.898906 16.632578 46.066406 16.767578 L 55.228516 25.933594 C 55.535516 26.242594 55.448031 26.638141 55.207031 26.869141 C 54.976031 27.091141 54.605688 27.161281 54.304688 26.863281 C 54.242463 26.801016 54.17066 26.756523 54.105469 26.699219 C 53.997944 26.604582 53.890495 26.512917 53.775391 26.431641 C 53.673425 26.359592 53.567757 26.297708 53.460938 26.236328 C 53.341991 26.168038 53.223812 26.102074 53.099609 26.046875 C 52.985433 25.996022 52.869508 25.955638 52.751953 25.916016 C 52.622616 25.872433 52.493884 25.830855 52.361328 25.800781 C 52.248525 25.775211 52.135734 25.759835 52.021484 25.744141 C 51.880931 25.724711 51.741377 25.707616 51.599609 25.703125 C 51.483162 25.699517 51.368303 25.706385 51.251953 25.712891 C 51.112337 25.72056 50.974469 25.731593 50.835938 25.753906 C 50.721093 25.772446 50.609283 25.801502 50.496094 25.830078 C 50.362096 25.863879 50.230415 25.899241 50.099609 25.947266 C 49.98082 25.990767 49.867006 26.044472 49.751953 26.099609 C 49.632862 26.156801 49.514761 26.213352 49.400391 26.283203 C 49.284422 26.353857 49.176231 26.437957 49.066406 26.521484 C 48.995683 26.575307 48.917587 26.614587 48.849609 26.673828 L 39.244141 35.029297 C 38.304069 35.84756 37.85484 37.008317 37.886719 38.164062 C 37.874738 38.454817 37.885168 38.749498 37.949219 39.046875 C 38.146219 39.962875 38.405078 41.97675 38.205078 43.96875 C 38.189078 44.13675 37.978375 44.208844 37.859375 44.089844 L 27.826172 34.058594 C 27.707172 33.938594 27.780266 33.727938 27.947266 33.710938 C 29.939266 33.511938 31.954141 33.768797 32.869141 33.966797 C 33.384824 34.080116 33.895552 34.063445 34.378906 33.955078 C 35.222624 33.847091 36.086781 33.475719 36.861328 32.701172 L 45.140625 23.365234 L 45.144531 23.361328 C 45.150437 23.355427 45.154285 23.347733 45.160156 23.341797 L 45.304688 23.179688 C 45.323916 23.158006 45.336797 23.133306 45.355469 23.111328 C 45.507932 22.933416 45.642805 22.743789 45.763672 22.542969 C 45.772416 22.52805 45.78053 22.513049 45.789062 22.498047 C 46.397448 21.458291 46.547855 20.163301 45.962891 18.916016 C 45.921878 18.822789 45.874563 18.732973 45.826172 18.642578 C 45.764544 18.532992 45.702746 18.42447 45.628906 18.316406 C 45.524408 18.159442 45.404064 18.012717 45.275391 17.869141 C 45.226187 17.812673 45.193604 17.753011 45.140625 17.697266 C 44.883625 17.441266 44.870625 17.009578 45.140625 16.767578 C 45.300625 16.624578 45.448031 16.556594 45.597656 16.558594 z"></path>
</svg>
    
                            </div>
                            <div class="">${content.trim()}</div>
                        </div>`;
                    default: // note
                        return `<div class="px-4 py-3 border border-emerald-600 bg-emerald-900/30 rounded p-1 flex items-center text-neutral-100 mb-8">
                            <div class="flex items-center w-10 mr-4">

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class='fill-emerald-500' width="64" height="64" viewBox="0 0 72 72">
<path d="M 22 14 C 17.589 14 14 17.589 14 22 L 14 50 C 14 54.411 17.589 58 22 58 L 45 58 C 46.061 58 47.078125 57.578125 47.828125 56.828125 L 56.828125 47.828125 C 57.578125 47.078125 58 46.061 58 45 L 58 22 C 58 17.589 54.411 14 50 14 L 22 14 z M 23 22 L 49 22 C 49.552 22 50 22.448 50 23 L 50 41 L 46 41 C 43.239 41 41 43.239 41 46 L 41 50 L 23 50 C 22.448 50 22 49.552 22 49 L 22 23 C 22 22.448 22.448 22 23 22 z M 28 27 C 26.896 27 26 27.896 26 29 C 26 30.104 26.896 31 28 31 L 44 31 C 45.104 31 46 30.104 46 29 C 46 27.896 45.104 27 44 27 L 28 27 z M 28 33.5 C 26.896 33.5 26 34.396 26 35.5 C 26 36.604 26.896 37.5 28 37.5 L 44 37.5 C 45.104 37.5 46 36.604 46 35.5 C 46 34.396 45.104 33.5 44 33.5 L 28 33.5 z M 28 40 C 26.896 40 26 40.896 26 42 C 26 43.104 26.896 44 28 44 L 36 44 C 37.104 44 38 43.104 38 42 C 38 40.896 37.104 40 36 40 L 28 40 z"></path>
</svg>
    
                            </div>
                            <div class="">${content.trim()}</div>
                        </div>

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

    if (!isMounted) {
        return <div className="prose prose-invert max-w-none" />;
    }

    return (

            <div dangerouslySetInnerHTML={{ __html: renderContent }} />

    );
}
