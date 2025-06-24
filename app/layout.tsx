import './global.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { monaspace } from './fonts'

export const metadata: Metadata = {
  metadataBase: new URL('https://dir-diare.vercel.app'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Dir-diare',
    template: '%s | Dir-diare'
  },
  description: 'My Dir - My little space on internet, place to share my thoughts and ideas'
};

const cx = (...classes) => classes.filter(Boolean).join(' ')

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
})
const space_grotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
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
                space_grotesk.variable,
                playfair_display.variable,
                monaspace.variable
            )}
        >
            <body className="antialiased tracking-tight bg-white dark:bg-neutral-950 text-black dark:text-neutral-100">
                    <main className="max-w-2xl mb-40 flex flex-col mx-4 mt-8 md:mx-auto">
                        {children}
                    </main>
                    {/* <BackToTop /> */}
                    <SpeedInsights />
                    <Analytics />
            </body>
        </html>
    )
}
