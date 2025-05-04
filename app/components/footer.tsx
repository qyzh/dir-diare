"use client"
import Link from "next/link"
import B2T from "./back2top"
import { memo } from "react"

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
                <p className="text-left">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-200">
                        dir-diare
                    </span>{' '}
                    by{' '}
                    <Linkext
                        href="/about"
                        name="Syauqiashadullah"
                    />
                    {' '}
                    made with <span className="animate-ping">💔</span> and 💸 © {currentYear} All rights
                    reserved.
                </p>
            <B2T />
        </footer>
    )
})

export default Footer
