import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

function extractNotionPageId(url: string): string {
  // Extract the last part after the last dash
  const parts = url.split('-');
  return parts[parts.length - 1];
}

export async function GET() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const rawPageId = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;
    
    if (!rawPageId) {
      return NextResponse.json({ error: 'NOTION_PAGE_ID is not defined' }, { status: 400 });
    }

    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json({ error: 'NOTION_API_KEY is not defined' }, { status: 400 });
    }

    const pageId = extractNotionPageId(rawPageId);
    const page = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    const response = {
      page,
      blocks: blocks.results,
    };
    
    // Prevent caching
    const headers = new Headers();
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    
    return NextResponse.json(response, { headers });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch Notion page',
      details: error.message 
    }, { status: 500 });
  }
} 