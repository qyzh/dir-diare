import './global.css'
import type { Metadata } from 'next'
import { Playfair_Display, Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Providers from '@/components/providers'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Dir-diare',
        template: '%s | Dir-diare',
    },
    description:
        'My Dir - My little space on internet, place to share my thoughts and ideas',
    openGraph: {
        images: [{ url: `${SITE_URL}/og?title=Dir-diare` }],
    },
}

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
    display: 'swap',
})

const courierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    variable: '--font-courier-prime',
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`scroll-smooth ${playfairDisplay.variable} ${courierPrime.variable}`}
        >
            <body className="antialiased" suppressHydrationWarning>
                <Providers>{children}</Providers>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    )
}
