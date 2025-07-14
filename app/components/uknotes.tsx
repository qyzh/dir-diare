'use client'

import Link from 'next/link';
import { useRef } from 'react';
import { toPng, toJpeg } from 'html-to-image';

interface Note {
  id: string;
  quote: string;
  author: string;
  source: string;
  timestamp: string;
  timestamptz: string;
}

interface UKnotesProps {
  notes: Note[];
}

export default function UKnotes({ notes }: UKnotesProps) {
  const singleQuoteRef = useRef<HTMLDivElement>(null);

  const downloadSingleQuote = async (note: Note, format: 'png' | 'jpeg' = 'png') => {
    if (!singleQuoteRef.current) return;

    try {
      // Update the single quote content
      const quoteElement = singleQuoteRef.current.querySelector('.single-quote-content');
      if (quoteElement) {
        quoteElement.innerHTML = `
          <p class="quote text-6xl tracking-wider mb-8 text-gray-100 leading-relaxed font-light">"${note.quote}"</p>
          <div class="meta">
            <p class="author text-3xl text-gray-400 mb-4">- <span class="text-amber-200 font-medium">${note.author}</span></p>
            <p class='footnote text-neutral-800'>dir-diare.vercel.app/n</p>
          </div>
        `;
      }

      let dataUrl: string;
      
      if (format === 'png') {
        dataUrl = await toPng(singleQuoteRef.current, {
          cacheBust: true,
          backgroundColor: '#000000',
          width: 1080,
          height: 1920,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }
        });
      } else {
        dataUrl = await toJpeg(singleQuoteRef.current, {
          cacheBust: true,
          backgroundColor: '#000000',
          width: 1080,
          height: 1920,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }
        });
      }

      const link = document.createElement('a');
      link.download = `quote-${note.author.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating single quote image:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        {notes?.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((item) => (
          <div key={item.id} className="mb-4 border-b border-transparent hover:border-amber-200 transition-colors">
            <blockquote className="mb-3">
              <p className="text-xl tracking-wider mb-2 text-gray-100">
                "{item.quote}"
              </p>
              <div className='flex justify-between items-center'>
                <p className="text-sm text-gray-400">
                  - <Link href={item.source} className='hover:underline hover:text-neutral' target='_blank'>
                    <span className="text-amber-200 font-medium">{item.author}</span>
                  </Link>
                </p>
                <time 
                  className="text-xs text-gray-500 cursor-pointer hover:text-amber-200 transition-colors"
                  onClick={() => downloadSingleQuote(item, 'png')}
                  title="Click to generate Instagram Story image"
                >
                  ({new Date(item.timestamptz).toLocaleDateString('id-ID', { 
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Singapore'
                  })})
                </time>            
              </div>
            </blockquote>
          </div>
        ))}
      </div>

      {/* Hidden element for single quote image generation */}
      <div 
        ref={singleQuoteRef}
        className="bg-black text-white p-6 absolute top-0 left-0 -z-10"
        style={{ width: '1080px', height: '1920px', overflow: 'hidden', transform: 'translateX(-9999px)' }}
      >
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-mono uppercase font-bold mb-12 text-left text-neutral-400">
            .dir-diare
          </h1>
          <div className="single-quote-content text-center max-w-4xl px-8">
            {/* Content will be dynamically updated */}
          </div>
        </div>
      </div>
    </div>
  );
}
