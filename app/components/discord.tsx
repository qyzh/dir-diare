"use client";

import { useLanyard } from "react-use-lanyard";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";

interface DiscordStatusProps {
    userId?: string;
    className?: string;
}
const Badge_discord_Data = [
    {
      "id": "premium",
      "description": "Subscriber since Apr 11, 2025",
      "icon": "2ba85e8026a8614b640c2837bcdfe21b",
      "link": "https://discord.com/settings/premium"
    },
    {
      "id": "hypesquad_house_2",
      "description": "HypeSquad Brilliance",
      "icon": "011940fd013da3f7fb926e4a1cd2e618",
      "link": "https://discord.com/settings/hypesquad-online"
    },
    {
      "id": "active_developer",
      "description": "Active Developer",
      "icon": "6bdc42827a38498929a4920da12695d9",
      "link": "https://support-dev.discord.com/hc/en-us/articles/10113997751447?ref=badge"
    },
    {
      "id": "early_supporter",
      "description": "Early Supporter",
      "icon": "7060786766c9c840eb3019e725d2b358",
      "link": "https://discord.com/settings/premium"
    },
    {
      "id": "guild_booster_lvl1",
      "description": "Server boosting since Apr 16, 2025",
      "icon": "51040c70d4f20a921ad6674ff86fc95c",
      "link": "https://discord.com/settings/premium"
    },
    {
      "id": "legacy_username",
      "description": "Originally known as UQ#9662",
      "icon": "6de6d34650760ba5551a79732e98ed60"
    },
    {
      "id": "quest_completed",
      "description": "Completed a Quest",
      "icon": "7d9ae358c8c5e118768335dbe68b4fb8",
      "link": "https://discord.com/discovery/quests"
    }
]
const BadgeDiscord = () => {

    return (
        <>

{Badge_discord_Data.map((dc) => (
            <img
                key={dc.id}
                src={`https://cdn.discordapp.com/badge-icons/${dc.icon}.png`}
                alt={dc.description}
                className="w-4 h-4 rounded"
            />
        ))}

        </>
    );
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
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <div className="w-[120px] h-[120px] rounded bg-neutral-800/50 animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-neutral-700 rounded-full border-2 border-zinc-900 animate-pulse" />
                </div> 
                <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 ">
                        <div className="h-4 w-20 bg-neutral-800/50 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-neutral-800/50 rounded-2xl animate-pulse" />
                    </div>
                    <div className="h-4 w-28 bg-neutral-800/50 rounded mt-1 animate-pulse" />
                    <div className="mt-3">
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-neutral-800/50 mr-2 rounded animate-pulse" />
                            <div className="flex flex-col gap-1">
                                <div className="h-4 w-28 bg-neutral-800/50 rounded animate-pulse" />
                                <div className="h-3 w-28 bg-neutral-800/50 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const avatarUrl = status.discord_user.avatar
        ? `https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(status.discord_user.discriminator) % 5}.png`;

    const statusColor = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-gray-500"
    }[status.discord_status] || "bg-gray-500";

const guild = (status.discord_user as any).primary_guild;
const { tag, identity_guild_id: Guild_Id, badge: Guild_Badge } = guild || {};
const Guild_IconUrl = Guild_Id && Guild_Badge ? `https://cdn.discordapp.com/clan-badges/${Guild_Id}/${Guild_Badge}.png?size=16` : null;

    return (
        <div className="group bg-[url('https://dcdn.dstn.to/banners/334529486773026817')] bg-cover bg-center bg-no-repeat rounded relative overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300" />
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
    {Guild_IconUrl && tag && (
        <span className="text-xs font-semibold inline-flex items-center px-1 py-0.5 text-zinc-200 bg-neutral-600 rounded-2xl border border-neutral-500 hover:bg-neutral-700 transition-all">
            <img
                src={Guild_IconUrl}
                alt="Guild Icon"
                width={12}
                height={12}
                className="inline-block"
            />
            {tag}
        </span>
    )}
                    </div>
                    <span className="text-sm font-mono italic text-neutral-400">
                        @{status.discord_user.username} • he/him
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                        {/* Discord badges */}
                        <BadgeDiscord/>
                    </div>
                    {activity && (
                        <div className="text-xs text-neutral-400 mt-1">
                            <div className="flex items-center gap-1">
                                {activity.name === "Spotify" ? (
                                    <>
                                    <a href='/m'>
                                        <img
                                            src={status.spotify?.album_art_url || `https://dcdn.dstn.to/app-icons/${activity.application_id}.png`}
                                            alt="Spotify"
                                            className="h-8 w-8 rounded"
                                        />
                                        <div className="flex flex-col ml-2">
                                            <span className="font-semibold text-green-400">
                                                Listening to {status.spotify?.song}
                                            </span>
                                            <span className="font-mono">
                                                by {status.spotify?.artist?.replace(/;/g, ', ')}
                                            </span>
                                        </div>
                                        </a>
                                    </>
                                ) : (
                                    activity.assets?.large_image && (
                                        <>
                                            <img
                                                src={`https://dcdn.dstn.to/app-icons/${activity.application_id}.png`}
                                                alt="Activity"
                                                className="h-8 w-8 rounded"
                                            />
                                            <div className="flex flex-col ml-2">
                                                <span className="font-semibold text-neutral-200">
                                                    {activity.name}
                                                </span>
                                                <div className="font-mono">
                                                    {activity.details && <span>{activity.details}</span>}
                                                    {activity.state && <span>{activity.details ? " @ " : ""}{activity.state}</span>}
                                                </div>
                                            </div>
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
