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
        return <div className="flex items-center space-x-3"></div>
    }

    const statusColor =
        {
            online: 'text-green-500',
            idle: 'text-yellow-500',
            dnd: 'text-red-500',
            offline: 'text-gray-500',
        }[status.discord_status] || 'text-white-500'

    return (
        <div className="ml-6">
            <div>
                <span className="webtree">└──</span>
                <span className="websub">username/</span>
                <span className={`${statusColor}`}>
                    {status.discord_user.username}
                </span>
            </div>
            <div>
                <span className="webtree">└──</span>
                <span className="websub">activity/</span>
                <span className="webcontent">
                    {activity && (
                        <span>
                            {activity.name}
                            {activity.details && (
                                <span> {activity.details}</span>
                            )}
                            {activity.state && (
                                <span>
                                    {activity.details ? ' @ ' : ''}
                                    {activity.state}
                                </span>
                            )}
                        </span>
                    )}
                </span>
            </div>
        </div>
    )
}
