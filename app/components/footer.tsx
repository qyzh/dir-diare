"use client"
import {motion} from "framer-motion"
import Link from "next/link"
import B2T from "./back2top"

function Linkext({ name, href }) {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50  after:content-['_↗']"
            href={href}
        >
            {name}
        </a>
    )
}

export default function Footer() {
    return (
        <footer className="prose mb-8">
            <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-neutral-600 dark:text-neutral-300 ">
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
                    
                    make with <span className="animate-ping">💔</span> and 💸 © {new Date().getFullYear()} All rights
                    reserved.
                </p>
            </motion.div>
            <B2T/>
        </footer>
    )
}
