"use client"
import Link from "next/link"
import B2T from "./back2top"
import { memo } from "react"
import Image from "next/image"
import CrocoGif from "/public/gif/croco.gif"
import CCCGif from "/public/gif/ccc.gif"
import HeartGif from "/public/gif/heart.gif"
interface LinkextProps {
    name: string;
    href: string;
}

const Linkext = memo(function Linkext({ name, href }: LinkextProps) {
    return (
        <Link
            href={href}
            className="text-slate-50 hover:text-slate-300 transition-colors after:content-['_↗']"
        >
            {name}
        </Link>
    )
})

const Footer = memo(function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="prose mb-8" role="contentinfo">
            <div className="text-center">
                <div className="flex items-center justify-center flex-wrap gap-1 text-sm">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-200">
                        dir-diare
                    </span>{' '}
                    <span>by</span>{' '}
                    <Linkext
                        href="/about"
                        name="Syauqiashadullah"
                    />
                    {' '}
                    <span className="flex items-center">
                        made with <Image src={HeartGif} alt="Writing" className="mx-1" width={20} height={20} />
                        and <Image unoptimized src={CCCGif} alt="Writing" className="mx-1" width={20} height={20} />
                    </span>
                    <span>© {currentYear} All rights reserved.</span>
                </div>
            </div>
            <B2T />
            <div className="flex items-center justify-center gap-4 mt-4">
                <Image unoptimized src={CrocoGif} alt="Writing" className="mr-2" width={64} height={64} />
            </div>
        </footer>
    )
})

export default Footer
