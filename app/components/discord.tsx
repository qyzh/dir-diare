"use client";

import { useLanyard } from "react-use-lanyard";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";

interface DiscordStatusProps {
    userId?: string;
    className?: string;
}
interface DiscordUser {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    global_name?: string;
    clan?: {
      tag: string;
      identity_guild_id: string;
      badge: string;
    };
  }
export function DiscordStatus({ userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID || '', className = "" }: DiscordStatusProps) {
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
<div className={`flex items-center space-x-3 `}>

<div className="relative">
  <div className="w-[120px] h-[120px] rounded bg-neutral-800/50 animate-pulse" />
  <div className="absolute bottom-0 right-0 w-4 h-4 bg-neutral-700 rounded-full border-2 border-zinc-900 animate-pulse" />
</div>


<div className="flex flex-col">

  <div className="flex items-center gap-2">
    <div className="h-8 w-36 bg-neutral-800/50 rounded animate-pulse" />
    <div className="h-5 w-24 bg-neutral-800/50 rounded-2xl animate-pulse" />
  </div>


  <div className="h-4 w-28 bg-neutral-800/50 rounded mt-1 animate-pulse" />


  <div className="mt-3">
    <div className="flex items-center gap-1">
      <div className="h-8 w-8 bg-neutral-800/50 rounded animate-pulse" />
      <div className="flex flex-col gap-1">
        <div className="h-4 w-32 bg-neutral-800/50 rounded animate-pulse" />
        <div className="h-3 w-48 bg-neutral-800/50 rounded animate-pulse" />
      </div>
    </div>
  </div>
</div>
</div>
        );
    }

    // Check if avatar exists, use default if not
    const avatarUrl = status.discord_user.avatar
        ? `https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(status.discord_user.discriminator) % 5}.png`;

    // Handle status colors
    const statusColor = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-gray-500"
    }[status.discord_status] || "bg-gray-500";

    // clan tag
    const clan = (status.discord_user as unknown as DiscordUser)?.clan;

    //spotify things
    const clanTag = clan?.tag || "Unknown Clan";
    const clanGuildId = clan?.identity_guild_id || "Unknown Clan ID";
    const clanBadge = clan?.badge || "Unknown Badge";
    const clanIconUrl = clan ? `https://cdn.discordapp.com/clan-badges/${clanGuildId}/${clanBadge}.png?size=16` : "";

    return (
        <div
            className="group bg-[url('https://dcdn.dstn.to/banners/334529486773026817')] bg-cover bg-center bg-no-repeat rounded relative overflow-hidden"
        >
            <div className="absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300"></div>

            <div className={`flex items-center space-x-3 ${className} relative z-10`}>
                <div className="relative">
                    <img
                        src={avatarUrl}
                        alt={`${status.discord_user.username}'s avatar`}
                        width={120}
                        height={120}
                        className="rounded"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 ${statusColor} rounded-full border-2 border-zinc-900`} />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-neutral-200">
                            {status.discord_user.global_name || status.discord_user.username}
                        </span>
                            <span className="text-xs font-semibold inline-flex items-center px-1 py-0.5 text-zinc-200 bg-neutral-600 rounded-2xl border border-neutral-500 hover:bg-neutral-700 transition-all">
                            <img
                        src={clanIconUrl}
                        alt={`${status.discord_user.username}'s avatar`}
                        width={12}
                        height={12}
                        className="inline-block"
                    />{clanTag}
                            </span>
                    </div>

                    <span className="text-sm font-mono italic text-neutral-400">
                        @{status.discord_user.username} • he/him
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                        <img src="https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png" className="w-4 h-4 rounded" alt='Nitro'/>
                        <img src="https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png" className="w-4 h-4 rounded" alt='HypeSquad Brilliance'/>
                        <img src="https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png" className="w-4 h-4 rounded" alt='Active Developer'/>
                        <img src="https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png" className="w-4 h-4 rounded" alt='Early Supporter'/>
                        <img src="https://cdn.discordapp.com/badge-icons/51040c70d4f20a921ad6674ff86fc95c.png" className="w-4 h-4 rounded" alt='Server boosting since Apr 16, 2025'/>
                        <img src="https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png" className="w-4 h-4 rounded" alt='Originally known as UQ#9662'/>
                        <img src="https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png" className="w-4 h-4 rounded" alt='Completed a Quest'/>
                    </div>
                    {activity && (
        <div className="text-xs text-neutral-400 mt-1">
            <div className="flex items-center gap-1">
                {/* For Spotify activity */}
                {activity.name === "Spotify" ? (
                    <>
                        <img
                            src={status.spotify?.album_art_url || `https://dcdn.dstn.to/app-icons/${activity.application_id}.png`}
                            alt="Spotify"
                            className="h-8 w-8 rounded"
                        />
                        <div className="flex flex-col ml-2">
                            <span className="font-semibold text-green-400">
                                Listening to {status.spotify?.song}
                            </span>
                            <div className="flex items-center gap-1 font-mono">
                            <span> by {status.spotify?.artist?.replace(/;/g, ', ')}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {activity.assets?.large_image && (
                            <img
                                src={`https://dcdn.dstn.to/app-icons/${activity.application_id}.png`}
                                alt="Activity"
                                className="h-8 w-8 rounded"
                            />
                        )}
                        <div className="flex">
                            <div className="flex flex-col ml-2">
                                <span className="font-semibold text-neutral-200">
                                    {activity.name}
                                </span>
                                <div className="flex items-center gap-1 font-mono">
                                    {activity.details && <span>{activity.details}</span>}
                                    {activity.state && <span>{activity.details ? " @ " : ""}{activity.state}</span>}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )}
                </div>
            </div>
        </div>
    );
}
