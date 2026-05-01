'use client'

import { useLanyard } from 'react-use-lanyard'
import type { Activity } from 'react-use-lanyard'
import { useEffect, useState } from 'react'

export function DiscordStatus() {
    const [activity, setActivity] = useState<Activity | undefined>(undefined)
    const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID || ''

    const { loading, status } = useLanyard({
        userId,
        socket: true,
    })

    useEffect(() => {
        if (status?.activities) {
            setActivity(
                status.activities.find((activity) => activity.type !== 4)
            )
        }
    }, [status])

    if (loading || !status?.discord_user) {
        return (
            <div className="font-mono text-sm p-4 text-white rounded-md">
                <div className="flex items-center">
                    <span className="text-green-400">$</span>
                    <span className="ml-2 text-neutral-300">
                        discord --status
                    </span>
                </div>
                <div className="mt-2">
                    <p className="text-neutral-400">
                        Fetching discord status...
                    </p>
                </div>
            </div>
        )
    }

    const statusColor =
        {
            online: 'text-green-500',
            idle: 'text-yellow-500',
            dnd: 'text-red-500',
            offline: 'text-neutral-500',
        }[status.discord_status] || 'text-white-500'

    return (
        <div className="font-mono text-sm p-4 text-white">
            <div className="grid grid-cols-[100px_1fr] gap-x-4">
                <span className="text-neutral-400">Username:</span>
                <span className={statusColor}>
                    {status.discord_user.username}
                </span>

                <span className="text-neutral-400">Activity:</span>
                <span className="text-neutral-200">
                    {activity ? (
                        activity.name === 'Spotify' ? (
                            <span>
                                Listening to {activity.details} by{' '}
                                {activity.state}
                            </span>
                        ) : (
                            <span>
                                {activity.name}
                                {activity.details && (
                                    <span> {activity.details}</span>
                                )}
                                {activity.state && (
                                    <span> - {activity.state}</span>
                                )}
                            </span>
                        )
                    ) : (
                        <span>{status.discord_status}</span>
                    )}
                </span>
            </div>
        </div>
    )
}
