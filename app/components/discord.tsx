"use client";

import { useLanyard } from "react-use-lanyard";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";
import Link from "next/link";

const statusMap = {
    online: <span className="text-green-500">Online</span>,
    dnd: <span className="text-red-500">Do Not Disturb</span>,
    idle: <span className="text-yellow-500">Idle</span>,
    offline: <span className="text-neutral-400">Offline</span>,
};

const statusColorMap = {
    online: "bg-green-500",
    dnd: "bg-red-500",
    idle: "bg-yellow-500",
    offline: "bg-neutral-400",
};

export function LanyardProfile() {
    const [activity, setActivity] = useState<Activity | undefined>(undefined);

    const { loading, status } = useLanyard({
        userId: "334529486773026817",
        socket: true,
    });

    useEffect(() => {
        if (status && status.activities) {
            setActivity(
                status.activities.find((activity) => activity.type !== 4)
            );
        }
    }, [status]);

    return loading || !status || !status.discord_user ? (
        <div className="flex flex-row space-x-2 items-center animate-pulse">
            <div className="h-16 mr-2 w-16 rounded-lg bg-white/5"></div>
            <div className="flex flex-col space-y-1">
                <div className="h-4 bg-white/5 w-24"></div>
                <div className="h-4 bg-white/5 w-36 mt-1"></div>
            </div>
        </div>
    ) : (
        <div className="fixed inset-x-2 top-2">
            <div className="flex flex-row-reverse">
                    <img
                        src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`}
                        alt="discord avatar"
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                    
                </div>
            </div>
    );
}
