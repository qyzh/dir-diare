import './global.css'
import type { Metadata } from 'next'
import { Tinos, Domine, Noto_Serif, Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { monaspace } from './fonts'
import Providers from './components/providers'

export const metadata: Metadata = {
    metadataBase: new URL('https://dir-diare.vercel.app'),
    alternates: {
        canonical: '/',
    },
    title: {
        default: 'Dir-diare',
        template: '%s | Dir-diare',
    },
    description:
        'My Dir - My little space on internet, place to share my thoughts and ideas',
}

const cx = (...classes: (string | boolean | undefined | null)[]) =>
    classes.filter(Boolean).join(' ')

const tinos = Tinos({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-tinos',
    display: 'swap',
})

const domine = Domine({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-domine',
    display: 'swap',
})

const notoSerif = Noto_Serif({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-noto-serif',
    display: 'swap',
})

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas-neue',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
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
            className={cx(
                'scroll-smooth',
                tinos.variable,
                domine.variable,
                notoSerif.variable,
                bebasNeue.variable,
                inter.variable,
                monaspace.variable
            )}
        >
            <body className="antialiased tracking-tight bg-neutral-100 dark:bg-neutral-950 ">
                <main className="max-w-3xl mb-40 flex flex-col px-4">
                    <Providers>{children}</Providers>
                </main>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    )
}
