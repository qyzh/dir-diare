import './global.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import BackToTop from './components/back2top'
import { monaspace } from './fonts'
import ThemeProvider from './components/theme-provider'

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: '.dir-diare',
        template: '%s | .dir-diare',
    },
    description: 'This is my dir.',
    openGraph: {
        title: 'My Dir',
        description: 'This is my dir.',
        url: baseUrl,
        siteName: 'My Dir',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={cx(
                'scroll-smooth',
                montserrat.variable,
                monaspace.variable
            )}
        >
            <body className="antialiased tracking-tight bg-white dark:bg-neutral-950 text-black dark:text-neutral-100">
                <ThemeProvider>
                    <main className="max-w-2xl mb-40 flex flex-col mx-4 mt-8 md:mx-auto">
                        {children}
                    </main>
                    <BackToTop />
                    <SpeedInsights />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    )
}
