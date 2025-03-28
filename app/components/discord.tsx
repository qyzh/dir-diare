"use client";

import { useLanyard } from "react-use-lanyard";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";

interface DiscordStatusProps {
    userId: string;
    className?: string;
}

export function DiscordStatus({ userId, className = "" }: DiscordStatusProps) {
    const [activity, setActivity] = useState<Activity | undefined>(undefined);

    const { loading, status } = useLanyard({
        userId,
        socket: true,
    });

    useEffect(() => {
        if (status?.activities) {
            setActivity(status.activities.find((activity) => activity.type !== 4));
        }
    }, [status]);

    if (loading || !status?.discord_user) {
        return (
            <div className={`flex items-center space-x-3 ${className}`}>
                <div className="h-9 w-9 rounded-full bg-white/5 animate-pulse" />
                <div className="flex flex-col space-y-1">
                    <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
                    <div className="h-3 w-32 bg-white/5 animate-pulse rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <img
                src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`}
                alt={`${status.discord_user.username}'s avatar`}
                width={36}
                height={36}
                className="rounded-full"
            />
            <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                    {status.discord_user.username}
                </span>
                {activity && (
                    <span className="text-xs text-neutral-400">
                        {activity.name}
                        {activity.state && ` • ${activity.state}`}
                    </span>
                )}
            </div>
        </div>
    );
}
