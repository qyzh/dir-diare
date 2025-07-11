import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: notes } = await supabase.from("notes").select()

    if (!notes) {
      return NextResponse.json({ error: 'No notes found' }, { status: 404 })
    }

    // Sort notes by timestamp
    const sortedNotes = notes.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Notes Collection</title>
          <style>
            body {
              margin: 0;
              padding: 32px;
              background: #000000;
              color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              width: 1200px;
              height: 800px;
              overflow: hidden;
            }
            .container {
              height: 100%;
              overflow-y: auto;
            }
            h1 {
              font-size: 48px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 32px;
              color: #fbbf24;
            }
            blockquote {
              margin-bottom: 24px;
              border-left: 4px solid #fbbf24;
              padding-left: 16px;
            }
            .quote {
              font-size: 24px;
              line-height: 1.4;
              margin-bottom: 8px;
              color: #f3f4f6;
            }
            .meta {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .author {
              font-size: 14px;
              color: #9ca3af;
            }
            .author-name {
              color: #fbbf24;
              font-weight: 500;
            }
            .timestamp {
              font-size: 12px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>My Notes Collection</h1>
            ${sortedNotes.map((item) => `
              <blockquote>
                <p class="quote">"${item.quote}"</p>
                <div class="meta">
                  <p class="author">- <span class="author-name">${item.author}</span></p>
                  <time class="timestamp">(${new Date(item.timestamptz).toLocaleDateString('id-ID', { 
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Singapore'
                  })})</time>
                </div>
              </blockquote>
            `).join('')}
          </div>
        </body>
      </html>
    `

    // Return the HTML content
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    })

  } catch (error) {
    console.error('Error generating notes image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
} 