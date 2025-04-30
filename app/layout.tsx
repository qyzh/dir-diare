import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import AnimatedSection from './components/animated-section'
import { baseUrl } from './sitemap'

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

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
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
                'text-black bg-white dark:text-white dark:bg-neutral-900 [color-scheme:dark] scroll-smooth',
                GeistSans.variable,
                jetbrainsMono.variable
            )}
        >
            <body className="antialiased max-w-2xl mb-40 flex flex-col mx-4 mt-8 md:mx-auto">
                <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
                    <AnimatedSection delay={0.1}>
                        {children}
                    </AnimatedSection>
                    <AnimatedSection delay={0.3}>
                        <Footer />
                    </AnimatedSection>
                    <AnimatedSection delay={0.5}>
                        <Analytics />
                    </AnimatedSection>
                    <AnimatedSection delay={0.7}>
                        <SpeedInsights />
                    </AnimatedSection>
                </main>
            </body>
        </html>
    )
}
