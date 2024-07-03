"use client";

import { useLanyard } from "react-use-lanyard";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";
import Link from "next/link";

const statusMap = {
    online: <span className="text-green-500">Online</span>, //""Online",
    dnd: <span className="text-red-500">Do Not Disturb</span>, //""Do Not Disturb",
    idle: <span className="text-yellow-500">Idle</span>, //""Idle",
    offline: <span className="text-neutral-400">Offline</span>, //""Offline",
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
<div className="flex flex-row space-x-2 items-center animate-pulse">
  <div className="h-16 mr-2 w-16 rounded-lg bg-white/5"></div>
  <div className="flex flex-col space-y-1">
    <div className="h-4 bg-white/5 w-24"></div>
    <div className="h-4 bg-white/5 w-36 mt-1"></div>
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
                <p className="group text-lg font-semibold text-neutral-300 hover:text-white">
                   <Link href='/about' className=""> {status.discord_user.global_name}</Link> 
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="inline-block text-sky-600 group-hover:text-sky-500 ml-1 mb-1.5 size-6 group-hover:rotate-360 duration-300">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
                </p>

                <div className="flex flex-row space-x-1 items-center">
                    {activity ? (
                        <p className="text-neutral-400 text-sm">
                            {activity.type === 2 ? (
                                <span>
                                    Listening to
                                    {status.spotify?.song.length! +
                                        status.spotify?.artist.length! <
                                    60 ? (
                                        <span>
                                            {" "}
                                            <strong>{status.spotify?.song}</strong> by{" "}
                                            <strong>{status.spotify?.artist}</strong>
                                        </span>
                                    ) : (
                                        <span className="text-green-500 bg-green-700/20 font-semibold border border-green-600 hover:text-green-300 px-1 py-0.5 mx-1 rounded-full"> Spotify<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="inline-block size-4">
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
                            {statusMap[status.discord_status]} on <span className="font-bold text-indigo-500">Discord</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}