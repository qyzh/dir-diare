"use client";
import { motion } from "framer-motion";
import { ProfileImageLarge } from "./ui/uqimg";
import { SquareChevronRight, Activity, Gamepad2 } from "lucide-react";
import { Badge } from "./ui/ukbadge";

export default function Uq() {
    return (
        <motion.div
            initial={{
                y: 0,
                scale: 0,
            }}
            animate={{
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.5,
            }}
            className="flex flex-row my-12"
        >
            <div className="space-y-8 px-2">
                <div className="flex items-center space-x-6">
                    <a href="/about">
                        <div className="group border-4 transition ease-out border-zinc-700 rounded-full hover:border-indigo-500/70 hover:shadow-lg">
                            <div className="relative h-24 w-24 rounded-full">
                                <div className="relative h-24 w-24 rounded-full overflow-clip group-hover:scale-105">
                                    <ProfileImageLarge />
                                </div>
                                <div className="absolute z-10 -bottom-2 -right-0 bg-neutral-800 rounded-full border border-amber-500 overflow-hidden">
                                    <div className="relative flex h-8 w-8 align-middle justify-center items-center duration-200 group-hover:rotate-360">
                                        <div>👻</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <div className="flex flex-col pt-4">
                        <h2 className="text-xl font-semibold leading-none text-neutral-100/90">
                            Syauqi Ashadullah
                        </h2>
                        <div className="items-center leading-none mt-1 text-sm text-neutral-100/50">
                            <div className="text-sm">Kota Bandung, ID</div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-row space-x-2">
                                <Badge
                                    icon={<SquareChevronRight className="size-4 mr-1"/>}
                                    text="Developer"
                                    borderColor="border-fuchsia-800"
                                    bgColor="bg-fuchsia-900/50"
                                    textColor="text-fuchsia-400"
                                    hoverBorderColor="border-fuchsia-500/70"
                                    hoverBgColor="bg-fuchsia-800/50"
                                    hoverTextColor="text-fuchsia-300"
                                />
                                <Badge
                                    icon={<Activity className="size-4 mr-1"/>}
                                    text="Amature Runner"
                                    borderColor="border-emerald-800"
                                    bgColor="bg-emerald-900/50"
                                    textColor="text-emerald-400"
                                    hoverBorderColor="border-emerald-500/70"
                                    hoverBgColor="bg-emerald-800/50"
                                    hoverTextColor="text-emerald-300"
                                />
                                <Badge
                                    icon={<Gamepad2 className="size-4 mr-1"/>}
                                    text="Gamer"
                                    borderColor="border-rose-800"
                                    bgColor="bg-rose-900/50"
                                    textColor="text-rose-400"
                                    hoverBorderColor="border-rose-500/70"
                                    hoverBgColor="bg-rose-800/50"
                                    hoverTextColor="text-rose-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
