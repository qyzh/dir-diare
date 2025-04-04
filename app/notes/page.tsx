'use client';

import { useEffect, useState } from 'react';
import { Navbar } from 'app/components/nav';
import Breadcrumbs from 'app/components/breadcrumbs';

interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

interface NotionPage {
  id: string;
  properties: any;
  [key: string]: any;
}

export default function DailyNotes() {
  const [page, setPage] = useState<NotionPage | null>(null);
  const [blocks, setBlocks] = useState<NotionBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notion', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch notes');
      }
      
      const data = await response.json();
      setPage(data.page);
      setBlocks(data.blocks);
      setLastUpdate(new Date().toLocaleTimeString());
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    const intervalId = setInterval(fetchNotes, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const renderBlock = (block: NotionBlock) => {
    if (!block[block.type]?.rich_text) {
      return null;
    }

    const content = block[block.type].rich_text.map((text: any, index: number) => (
      <span key={index}>{text.plain_text}</span>
    ));

    switch (block.type) {
      case 'paragraph':
        return <p className="mb-4">{content}</p>;
      case 'heading_1':
        return <h1 className="text-3xl font-bold mb-4">{content}</h1>;
      case 'heading_2':
        return <h2 className="text-2xl font-bold mb-4">{content}</h2>;
      case 'heading_3':
        return <h3 className="text-xl font-bold mb-4">{content}</h3>;
      case 'bulleted_list_item':
        return <li className="ml-4 mb-2">{content}</li>;
      case 'numbered_list_item':
        return <li className="ml-4 mb-2">{content}</li>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Daily Notes</h1>
        <span className="text-sm text-gray-500">Last updated: {lastUpdate}</span>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {page && (
        <div className="prose max-w-none">
          {blocks.length === 0 ? (
            <p className="text-gray-500">No content found in this page.</p>
          ) : (
            blocks.map((block) => (
              <div key={block.id}>
                {renderBlock(block)}
              </div>
            ))
          )}
        </div>
      )}
      <Navbar />
    </div>
  );
} 