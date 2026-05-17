import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Dir-diare'

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#14120f',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '80px',
                    fontFamily: 'serif',
                }}
            >
                <p
                    style={{
                        color: '#4a4540',
                        fontSize: 18,
                        margin: 0,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                    }}
                >
                    dir-diare
                </p>
                <h1
                    style={{
                        color: '#ede8e0',
                        fontSize: title.length > 60 ? 48 : 64,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        margin: '16px 0 0',
                        lineHeight: 1.15,
                        maxWidth: '900px',
                    }}
                >
                    {title}
                </h1>
                <div
                    style={{
                        width: '100%',
                        height: '1px',
                        background: '#2e2b25',
                        marginTop: '48px',
                    }}
                />
                <p
                    style={{
                        color: '#7a7268',
                        fontSize: 16,
                        margin: '16px 0 0',
                        fontFamily: 'monospace',
                        letterSpacing: '0.05em',
                    }}
                >
                    dir.kyxis.my.id
                </p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    )
}
