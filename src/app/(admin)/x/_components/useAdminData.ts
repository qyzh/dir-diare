'use client'

import { useCallback, useEffect, useState } from 'react'

export function useAdminData<T>(url: string) {
    const [data, setData] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`)
            }

            const payload = (await response.json()) as T[]
            setData(payload)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsLoading(false)
        }
    }, [url])

    useEffect(() => {
        void refresh()
    }, [refresh])

    return { data, isLoading, error, refresh }
}
