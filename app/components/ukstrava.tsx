'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import UKCallout from './ukcallout'
interface StravaProps {}
interface ActivityType {
    id: number
    name: string
    distance: number
    moving_time: number
    elapsed_time: number
    average_speed: number
    kudos_count: number
    type: string
    start_date: string
    photos: {
        primary: {
            urls: {
                '100': string
                '600': string
            }
        }
    }
}

const Strava: React.FC<StravaProps> = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activities, setActivities] = useState<ActivityType[]>([])

    const fetchActivities = useCallback(async () => {
        try {
            const response = await fetch('/api/strava')
            if (!response.ok) {
                throw new Error('Failed to fetch activities')
            }
            const data = await response.json()
            setActivities(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchActivities()
    }, [fetchActivities])

    if (error) {
        return (
            <UKCallout type="error">
                <p>{error}</p>
                <button
                    onClick={fetchActivities}
                    className="mt-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500/30 transition-colors"
                >
                    Retry
                </button>
            </UKCallout>
        )
    }

    return <Activities activities={activities} isLoading={isLoading} />
}

interface ActivitiesProps {
    activities: ActivityType[]
    isLoading: boolean
}

const Activities: React.FC<ActivitiesProps> = React.memo(
    ({ activities, isLoading }) => {
        const formatDate = useCallback((dateString: string) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
        }, [])

        const formatTime = useCallback((minutes: number) => {
            return `${minutes.toFixed(1)}`
        }, [])

        const formatDistance = useCallback((meters: number) => {
            return `${(meters / 1000).toFixed(1)}`
        }, [])

        const latestActivity = useMemo(() => activities[0], [activities])

        if (isLoading) {
            return (
                <div className="font-mono text-sm p-4 bg-black text-white rounded-md">
                    <div className="flex items-center">
                        <span className="text-green-400">$</span>
                        <span className="ml-2 text-gray-300">
                            strava --latest-activity
                        </span>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-400">
                            Fetching latest activity...
                        </p>
                    </div>
                </div>
            )
        }

        if (!activities.length) return null

        return (
            <div className="font-mono text-sm p-4 text-white ">
                <div className="">
                    <div className="grid grid-cols-[100px_1fr] gap-x-4">
                        <span className="text-neutral-400">Name:</span>
                        <span className="text-neutral-200">
                            {latestActivity.name}
                        </span>

                        <span className="text-neutral-400">Date:</span>
                        <span className="text-neutral-200">
                            {formatDate(latestActivity.start_date)}
                        </span>

                        <span className="text-neutral-400">Duration:</span>
                        <span className="text-neutral-200">
                            {formatTime(latestActivity.moving_time * 0.0166667)}{' '}
                            min
                        </span>

                        <span className="text-neutral-400">Distance:</span>
                        <span className="text-neutral-200">
                            {formatDistance(latestActivity.distance)} km
                        </span>
                    </div>
                </div>
            </div>
        )
    }
)

Activities.displayName = 'Activities'

export default Strava
