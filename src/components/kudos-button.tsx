'use client'
import { useState, useEffect } from 'react'
import Button from './ui/ukbtn'
import { Heart } from 'pixelarticons/react'

export default function KudosButton({
    slug,
    initialCount,
}: {
    slug: string
    initialCount: number
}) {
    const storageKey = `kudos_sent_${slug}`
    const [count, setCount] = useState(initialCount)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        setSent(localStorage.getItem(storageKey) === '1')
    }, [storageKey])

    const handleKudos = async () => {
        if (sent) return
        setCount((c) => c + 1)
        setSent(true)
        localStorage.setItem(storageKey, '1')
        try {
            const res = await fetch(`/api/posts/${slug}/kudos`, { method: 'POST' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            setCount(data.kudos)
        } catch {
            setCount((c) => c - 1)
            setSent(false)
            localStorage.removeItem(storageKey)
        }
    }

    return (
        <Button
            variant="primary"
            size="sm"
            onClick={handleKudos}
            disabled={sent}
            className={`px-2 py-1${sent ? ' opacity-100' : ''}`}
        >
            <Heart className={`w-4 h-4${sent ? ' text-amber-400' : ''}`} />
            {count > 0 && (
                <span className="text-xs pl-0.5">{count}</span>
            )}
        </Button>
    )
}
