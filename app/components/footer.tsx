import Link from "next/link"

function Linkext({ name, href }) {
    return (
        <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50  after:content-['_↗']"
            href={href}
        >
            {name}
        </Link>
    )
}

export default function Footer() {
    return (
        <footer className="prose mb-8">
            <div className="mt-8 text-neutral-600 dark:text-neutral-300 ">
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
                    
                    make with 💔 and 💸 © {new Date().getFullYear()} All rights
                    reserved.
                </p>
            </div>
        </footer>
    )
}
