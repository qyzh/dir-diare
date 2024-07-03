"use client";

import { useLanyard } from "react-use-lanyard";
import Image from "next/image";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";
import Link from "next/link";

const statusMap = {
    online: "Online",
    dnd: "Do Not Disturb",
    idle: "Idle",
    offline: "Offline",
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
                status.activities.find((activity) => activity.type !== 4),
            );
        }
    }, [status]);

    // if (loading || !status || !status.discord_user) {
    //     return null;
    // }

    return loading || !status || !status.discord_user ? (
        <div className="flex flex-row space-x-2  items-center">
            <div className="h-[64px] mr-2 w-[64px] rounded-lg" />
            <div className="flex flex-col space-y-1">
                <div className="h-4 w-[4.5rem]" />
                <div className="h-4 translate-y-1 w-36" />
            </div>
        </div>
    ) : (
        <div className="flex flex-row mb-8 space-x-2 items-center">
            <div className="relative mr-2">
                <img
                    src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`}
                    alt="discord avatar"
                    width={64}
                    height={64}
                    className="rounded-lg"
                />
                <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1">
                    <span className="relative flex h-4 w-4">
                        <span
                            className={`animate-ping transition-all absolute inline-flex h-full w-full rounded-full ${
                                statusColorMap[status.discord_status]
                            }`}
                        ></span>
                        <span
                            className={`relative inline-flex rounded-full h-4 w-4 ${
                                statusColorMap[status.discord_status]
                            }`}
                        ></span>
                    </span>
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <p className="text-lg font-semibold text-neutral-300 hover:text-white">
                   <Link href='/about'> {status.discord_user.username}</Link> 
                </p>

                <div className="flex flex-row space-x-1 items-center">
                    {activity ? (
                        <p className="text-neutral-400 text-sm">
                            {activity.type === 2 ? (
                                <span>
                                    Listening to
                                    {status.spotify?.song.length! +
                                        status.spotify?.artist.length! <
                                    30 ? (
                                        <span>
                                            {" "}
                                            <strong>{status.spotify?.song}</strong> by{" "}
                                            <strong>{status.spotify?.artist}</strong>
                                        </span>
                                    ) : (
                                        <span> Spotify<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="inline-block size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                                      </svg>
                                      </span>
                                    )}
                                </span>
                            ) : (
                                <span>Playing <strong>{activity.name}</strong> @ <strong>{activity.details}</strong></span>
                            )}
                        </p>
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            {statusMap[status.discord_status]} on Discord
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}