'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [theme, resolvedTheme])

    if (!mounted) {
        return (
            <button
                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle theme"
            >
                <div className="w-5 h-5" />
            </button>
        )
    }

    const handleClick = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)

        // Force check after a short delay
        setTimeout(() => {
            const htmlElement = document.documentElement
        }, 100)
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleClick}
                className="inline-flex items-center justify-center rounded-md p-2 bg-neutral-200 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors border border-neutral-300 dark:border-neutral-700"
                aria-label="Toggle theme"
                title={`Current: ${theme}`}
            >
                {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                ) : (
                    <Moon className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                )}
            </button>
        </div>
    )
}
