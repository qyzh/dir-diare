import './global.css'
import type { Metadata } from 'next'
import { Tinos, Domine, Noto_Serif, Bebas_Neue, Inter, Playfair_Display, Courier_Prime, IM_Fell_English } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { monaspace } from '@/fonts'
import Providers from '@/components/providers'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
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

const imFellEnglish = IM_Fell_English({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    variable: '--font-im-fell',
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
                monaspace.variable,
                playfairDisplay.variable,
                courierPrime.variable,
                imFellEnglish.variable
            )}
        >
            <body className="antialiased">
                <Providers>{children}</Providers>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    )
}
